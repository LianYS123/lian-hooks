import { useEffect, useRef } from 'react';
import { useMutation } from './useMutation';
import { useUpdateEffect } from './useUpdateEffect';
import debounce from 'lodash.debounce';

export interface UseRequestParamsType {
  [key: string]: any;
  method(params?: any, ...restArgs: any[]): Promise<any>;
  defaultParams?: any;
  necessaryParams?: any;
  autoLoad?: boolean;
}

/**
 * @description: 请求方法的简单封装，处理请求的loading状态
 * @param {*} defaultParams 默认参数
 * @param {*} necessaryParams 必要参数
 * @param {*} rest 请求方法额外参数, onError事件等options可以通过这个参数传递
 */
export const useRequest = ({
  method,
  defaultParams = {},
  necessaryParams,
  autoLoad = true,
  ...rest
}: UseRequestParamsType) => {
  const [_method, requestState] = useMutation(method);
  const paramRef = useRef(defaultParams);
  const necessaryParamsRef = useRef(necessaryParams);
  necessaryParamsRef.current = necessaryParams;

  const loadData = (_params = paramRef.current) => {
    paramRef.current = _params;
    if (!requestState.loading) {
      const realParams = { ...necessaryParamsRef.current, ..._params }; //每次请求都带上necessaryParams
      debounce(_method, 100)(realParams, rest);
    }
  };

  const reload = () => {
    loadData();
  };

  useUpdateEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [JSON.stringify(necessaryParams)]);

  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, []);

  return { search: loadData, reload, ...requestState };
};
