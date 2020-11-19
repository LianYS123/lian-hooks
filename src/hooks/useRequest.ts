import { useEffect, useState } from 'react';

export interface UseRequestParamsType {
  method(params?: any, ...restArgs: any[]): Promise<any>;
  defaultParams?: any;
  necessaryParams?: any;
  restMethodArgs?: any[];
  manual?: Boolean;
  onError?(err: any): void;
}

/**
 * @description: 请求方法的简单封装，处理请求的loading状态
 * @param {*} defaultParams 默认参数
 * @param {*} necessaryParams 必要参数
 * @param {*} restMethodArgs 请求方法额外参数
 * @param {*} manual 手动请求
 * @param {*} onError 请求错误回调函数
 */
const useRequest = ({
  method,
  defaultParams = {},
  necessaryParams = {},
  restMethodArgs = [],
  manual = false,
  onError,
}: UseRequestParamsType) => {
  const [params, setParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [_manual, setManual] = useState(manual);

  const loadData = async (_params = params) => {
    const realParams = { ...necessaryParams, ..._params }; //每次请求都带上necessaryParams
    try {
      setLoading(true);
      const res = await method(realParams, ...restMethodArgs);
      setLoading(false);
      setData(res);
    } catch (e) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error(e);
      if (onError) {
        onError(e);
      }
    }
  };

  const search = (params: any) => {
    setParams(params);
  };

  const reload = () => {
    loadData();
  };

  useEffect(() => {
    if(_manual) {
      setManual(false);
    } else {
      loadData();
    }
  }, [params, JSON.stringify(necessaryParams)]); //使用序列化防止引用变化而数据没有变时无效的请求

  return { data, loading, search, reload };
};

export { useRequest };
