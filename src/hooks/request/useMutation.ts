import { useState, useRef } from 'react';

export interface MutationState<R> {
  loading: boolean;
  error?: Error;
  data?: R;
}
/**
 * @description 异步方法的简单封装，处理请求的loading状态
 * @param {Function} method 异步方法
 * @param {Object} [initialData] 初始数据
 * @return {Array} 异步方法和状态信息
 */
export const useMutation = <R = any>(
  method: (...args: any) => Promise<R>,
  initialData?: R,
): [Function, MutationState<R>] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState(initialData);
  const methodRef = useRef(method);
  methodRef.current = method;

  const loadData = async (...params: any[]) => {
    try {
      setLoading(true);
      const res = await methodRef.current(...params);
      setLoading(false);
      setData(res);
    } catch (error) {
      setLoading(false);
      setError(error as Error);
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return [loadData, { loading, error, data }];
};
