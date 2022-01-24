import { useState, useEffect } from 'react';
import { useRequest, RequestOptions, RequestResult } from './useRequest';
import { usePagination, Pagination } from './usePagination';

const defaultFormatter = ({ data = [], total = 0 } = {}) => {
  return { total: total || data.length, dataSource: data };
};

type ResultFormatter<R = any> = (
  res: R,
) => {
  total: number;
  dataSource?: any[];
};

interface TalbeOptions<R> extends RequestOptions<R> {
  /**
   * 默认分页大小
   */
  defaultPageSize: number;

  /**
   * 格式化请求结果，返回total和dataSource
   */
  formatter?: ResultFormatter;
}

interface TableProps {
  /**
   * table的数据源
   */
  dataSource?: any[];
  /**
   * 加载状态
   */
  loading: boolean;
  /**
   * 分页
   */
  pagination: Pagination;
}

interface TableResult<R> extends RequestResult<R> {
  loading: boolean;
  data: R;
  pagination: Pagination;
  tableProps: TableProps;
}

/**
 * @description 封装方便antd table使用的hooks
 * @param {Object} options 配置信息
 * @param {Function} options.method 请求方法
 * @param {Number} [options.defaultPageSize = 10] 默认分页大小
 * @param {Object} [options.necessaryParams] 必要请求参数
 * @param {Function} [options.formatter] 请求结果数据转换函数, 返回{total, dataSource}
 */
export const useTable = <R = any>(options: TalbeOptions<R>): TableResult<R> => {
  const {
    method,
    defaultPageSize = 10,
    necessaryParams = {},
    formatter = defaultFormatter,
    ...rest
  } = options;

  const [total, setTotal] = useState(10);
  const [dataSource, setSource] = useState<any[] | undefined>([]);

  const pagination = usePagination({
    total,
    defaultPageSize,
  });

  const { data, loading, ...restState } = useRequest({
    method,
    necessaryParams: {
      ...necessaryParams,
      page: pagination.current.toString(),
      page_size: pagination.pageSize.toString(),
    },
    ...rest,
  });

  useEffect(() => {
    const { total, dataSource } = formatter(data);
    setTotal(total);
    setSource(dataSource);
  }, [data]);

  const tableProps = {
    dataSource,
    loading,
    pagination,
  };

  return {
    loading,
    data,
    pagination,
    tableProps,
    ...restState,
  };
};
