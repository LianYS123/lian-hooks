import { useState } from 'react';
import { useRequest } from './useRequest';

const defaultFormatter = ({ data = [] } = {}) => {
  return { total: data.length, dataSource: data };
};

/**
 * @description: 封装方便antd table使用的hooks
 * @param options 配置信息
 */
const useTable = (options) => {
  const {
    method, // 请求方法
    defaultPageSize = 10, // 默认分页大小, 不传默认为10
    necessaryParams = {}, // 必要请求参数
    formatter = defaultFormatter, // 请求结果数据转换函数, 返回{total, dataSource}
    rowSelection: customRowSelection, // 选项框属性，为true时展示默认选项框
    ...rest // 默认请求参数等
  } = options;
  const [
    { current = 1, pageSize = defaultPageSize },
    onChangePaination
  ] = useState({ current: 1, pageSize: defaultPageSize });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const realParams = {
    ...necessaryParams,
    page: current,
    page_size: pageSize
  };

  const { data, loading, search, reload } = useRequest({
    method,
    necessaryParams: realParams,
    ...rest
  });

  const { total, dataSource } = formatter(data);

  const onChange = (current, pageSize) => {
    let toCurrent = current <= 0 ? 1 : current;
    const toPageSize = pageSize <= 0 ? 1 : pageSize;
    const tempTotalPage = Math.ceil(total / toPageSize);

    if (tempTotalPage && toCurrent > tempTotalPage) {
      toCurrent = tempTotalPage;
    }

    onChangePaination({
      current: toCurrent,
      pageSize: toPageSize
    });
  };
  const rowSelection = customRowSelection || {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    selections: false
  };

  if (customRowSelection && typeof customRowSelection === 'object') {
    Object.assign(rowSelection, customRowSelection);
  }

  const pagination = {
    current,
    pageSize,
    total,
    onChange: onChange,
    onShowSizeChange: onChange
  };

  return {
    loading,
    data,
    reload,
    search,
    pagination,
    tableProps: {
      dataSource,
      loading,
      pagination,
      rowSelection
    }
  };
};

export { useTable };
