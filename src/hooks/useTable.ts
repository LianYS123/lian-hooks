import { useState } from 'react';
import { UseRequestParamsType, useRequest } from './useRequest';

export interface UseTableParamsType extends UseRequestParamsType {
  defaultPageSize?: number;
  formatter?(
    data: any,
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
 */
const useTable = (options: UseTableParamsType) => {
  const {
    method,
    defaultPageSize = 10,
    defaultParams = {},
    necessaryParams = {},
    formatter = defaultFormatter,
  } = options;
  const [
    { current = 1, pageSize = defaultPageSize },
    onChangePaination,
  ] = useState<PageParamsType>({ current: 1, pageSize: defaultPageSize });

  const realParams = {
    ...necessaryParams,
    page: current,
    page_size: pageSize,
  };

  const { data, loading, search, reload } = useRequest({
    method,
    defaultParams,
    necessaryParams: realParams,
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
    },
  };
};

export { useTable };
