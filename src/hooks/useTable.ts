import { useState } from 'react';
import { UseRequestParamsType, useRequest } from './useRequest';
import { TableRowSelection } from 'antd/lib/table/interface';

export interface UseTableParamsType extends UseRequestParamsType {
  defaultPageSize?: number;
  getAllKeys?(): Promise<any>;
  rowSelection?: boolean | TableRowSelection<any>;
  formatter?(
    data: any
  ): {
    total: number;
    dataSource: any[];
  };
}

interface PageParamsType {
  current: number;
  pageSize: number;
}

const defaultFormatter = (data: { content?: any } = {}) => {
  const { total_records = 0, records = [] } = data.content || {};
  return { total: total_records, dataSource: records };
};

/**
 * @description: 封装方便antd table使用的hooks
 * @param defaultPageSize 默认分页大小, 不传默认为10
 * @param defaultParams 默认请求参数
 * @param necessaryParams 必要请求参数
 * @param method 请求方法
 * @param formatter 请求结果数据转换函数
 * @param rowSelection 选项框属性，为true时展示默认选项框
 * @param getAllKeys 用于勾选所有数据操作时获取 selectedRowKeys
 */
const useTable = (options: UseTableParamsType) => {
  let {
    method,
    defaultPageSize = 10,
    necessaryParams = {},
    formatter = defaultFormatter,
    getAllKeys,
    rowSelection: customRowSelection,
    ...rest
  } = options;
  const [
    { current = 1, pageSize = defaultPageSize },
    onChangePaination,
  ] = useState<PageParamsType>({ current: 1, pageSize: defaultPageSize });
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const realParams = {
    ...necessaryParams,
    page: current,
    page_size: pageSize,
  };

  const { data, loading, search, reload } = useRequest({
    method,
    necessaryParams: realParams,
    ...rest,
  });

  const { total, dataSource } = formatter(data);

  const onChange = (current: number, pageSize: number) => {
    let toCurrent = current <= 0 ? 1 : current;
    const toPageSize = pageSize <= 0 ? 1 : pageSize;
    const tempTotalPage = Math.ceil(total / toPageSize);

    if (tempTotalPage && toCurrent > tempTotalPage) {
      toCurrent = tempTotalPage;
    }

    onChangePaination({
      current: toCurrent,
      pageSize: toPageSize,
    });
  };
  let selections: any = false;
  if (getAllKeys) {
    selections = [
      'SELECT_INVERT',
      {
        key: 'select-all-pages',
        text: '选择全部',
        onSelect: async () => {
          const keys = await getAllKeys?.();
          setSelectedRowKeys(keys);
        },
      },
      {
        key: 'cancel-all-pages',
        text: '取消全部',
        onSelect: () => {
          setSelectedRowKeys([]);
        },
      },
    ];
  }
  const rowSelection: TableRowSelection<any> | undefined = customRowSelection
    ? {
        onChange: (selectedRowKeys: any[]) => {
          setSelectedRowKeys(selectedRowKeys);
        },
        selectedRowKeys,
        preserveSelectedRowKeys: true,
        selections,
      }
    : undefined;

  if(customRowSelection && typeof customRowSelection === 'object') {
    Object.assign(rowSelection, customRowSelection);
  }

  const pagination = {
    current,
    pageSize,
    total,
    onChange: onChange,
    onShowSizeChange: onChange,
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
      rowSelection,
    },
  };
};

export { useTable };
