import { useRef } from 'react';
import { useMutation } from './useMutation';
import { useDeepCompareEffect } from './useUtils';

/**
 * @description: 请求方法的简单封装，处理请求的loading状态
 * @param {Object} options 配置
 * @param {Function} options.method 请求方法
 * @param {Object} [options.defaultParams] 默认参数
 * @param {Object} [options.necessaryParams] 必要参数
 * @param {Boolean} [options.ready] === true时发起请求，默认值为true
 * @param {*} [options.initialData] 初始数据
 * @param {Array} [options.rest] 请求方法额外参数, onError事件等options可以通过这个参数传递
 */
export const useRequest = (options) => {
  const {
    method,
    defaultParams = {},
    necessaryParams,
    ready = true,
    initialData,
    ...rest
  } = options;
  const [_method, requestState] = useMutation(method, initialData, rest);
  const paramRef = useRef(defaultParams);
  const necessaryParamsRef = useRef(necessaryParams);
  necessaryParamsRef.current = necessaryParams;

  const loadData = (_params = paramRef.current) => {
    paramRef.current = _params;
    if (!requestState.loading) {
      const realParams = { ...necessaryParamsRef.current, ..._params }; // 每次请求都带上necessaryParams
      _method(realParams, rest);
    }
  };

  // 使用上次的参数重新请求
  const reload = () => {
    loadData();
  };

  useDeepCompareEffect(() => {
    if (ready === true) {
      loadData();
    }
  }, [necessaryParams, ready]);

  return {
    search: loadData,
    reload,
    params: { ...necessaryParamsRef.current, ...paramRef.current },
    ...requestState
  };
};
