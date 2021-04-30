import { useState } from 'react';

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  onChange: (current: number, pageSize: number) => void;
  onShowSizeChange: (current: number, pageSize: number) => void;
}

/**
 * @description: 处理分页状态的hooks
 * @param {Object} config
 * @param {*} config.defaultPageSize 默认分页大小
 * @param {*} config.total 总数据条数
 * @return {*} pagination
 */
export const usePagination = (params: {
  defaultPageSize: number;
  total: number;
}): Pagination => {
  const { defaultPageSize, total } = params;
  const [{ current, pageSize }, onChangePaination] = useState({
    current: 1,
    pageSize: defaultPageSize,
  });
  const onChange = (current: number, pageSize: number) => {
    onChangePaination({
      current,
      pageSize,
    });
  };
  const pagination = {
    current,
    pageSize,
    total,
    onChange,
    onShowSizeChange: onChange,
  };
  return pagination;
};
