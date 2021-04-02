import { useState, useRef } from 'react';

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} method 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useMutation = (
  method: (...params: any[]) => Promise<any>,
  initialData?: any,
): [
  (...params: any) => void,
  {
    loading: boolean;
    error: Error | undefined;
    data: any;
  },
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [data, setData] = useState(initialData);
  const methodRef = useRef(method);
  methodRef.current = method;

  const loadData = async (...params: any[]) => {
    try {
      setLoading(true);
      const res = await methodRef.current(...params);
      setLoading(false);
      setData(res);
    } catch (e) {
      setLoading(false);
      setError(e);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return [loadData, { loading, error, data }];
};
