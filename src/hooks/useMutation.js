import { useState, useRef } from 'react';

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {Function} method 异步方法
 * @param {Object} [initialData] 初始数据
 * @return {Array} 异步方法和状态信息
 */
export const useMutation = (method, initialData, options = {}) => {
  const { onError } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const methodRef = useRef(method);
  methodRef.current = method;

  const loadData = async (...params) => {
    try {
      setLoading(true);
      const res = await methodRef.current(...params);
      setLoading(false);
      setData(res);
      return res;
    } catch (e) {
      setLoading(false);
      setError(e);
      onError && onError(e);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return [loadData, { loading, error, data }];
};
