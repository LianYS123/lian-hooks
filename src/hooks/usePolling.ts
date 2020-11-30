import { useState } from 'react';
import { useInterval } from './useTimer';
import { useMutation } from './useMutation';

export interface UsePollingParamType {
  method(...params: any[]): Promise<any>;
  onReceive?(data?: any): boolean;
  interval?: number;
  errorRetryCount?: number;
  autoStart?: boolean;
}

/**
 * @description: 处理轮询状态的hooks
 * @param method 请求方法
 * @param onReceive 当接收到数据时调用的函数, 返回true不再继续请求
 * @param interval 请求间隔
 * @param errorRetryCount 发生错误后继续请求次数
 * @param autoStart 是否自动触发
 * @return 轮询状态和操作函数
 */
export const usePolling = ({
  method,
  onReceive,
  interval = 1000,
  errorRetryCount = 0,
  autoStart = false,
}: UsePollingParamType) => {
  const [request, { loading, error, data }] = useMutation(method);
  const [polling, setPolling] = useState(autoStart);
  const [retryCount, setRetryCount] = useState(errorRetryCount);

  const start = () => {
    if (polling === false) {
      setPolling(true);
      request();
    }
  };

  const onError = () => {
    if (retryCount) {
      setRetryCount((count) => count - 1);
      request()
    } else {
      cancel();
    }
  };

  const onSuccess = () => {
    if (onReceive && onReceive(data) === true) {
      cancel();
    } else {
      request()
      start();
    }
  };

  const clear = useInterval(
    () => {
      if (polling) {
        if (error) {
          onError();
        } else {
          onSuccess();
        }
      }
    },
    interval,
    [data, error, polling],
  );

  const cancel = () => {
    clear();
    setPolling(false);
  };
  return {
    start,
    cancel,
    loading,
    data,
    polling,
  };
};
