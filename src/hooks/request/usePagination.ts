import { useState } from 'react';

export interface Pagination {
  /**
   * 当前分页
   */
  current: number;
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 总页数
   */
  total: number;
  /**
   * 分页变化事件
   */
  onChange: (current: number, pageSize: number) => void;
  /**
   * 每页大小变化事件
   */
  onShowSizeChange: (current: number, pageSize: number) => void;
}

/**
 * @description 处理分页状态的hooks
 * @param {Object} config
 * @param {*} config.defaultPageSize 默认分页大小
 * @param {*} config.total 总数据条数
 * @return {*} pagination
 */
export const usePagination = (params: {
  /**
   * 默认分页大小
   */
  defaultPageSize: number;
  /**
   * 总页数
   */
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
