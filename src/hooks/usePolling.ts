import { useState } from 'react';
import { useTimeout } from './useTimer';
import { useMutation } from './useMutation';
import { useIsMounted, useUnmount } from './useUnMount';
import { useUpdateEffect } from './useUpdateEffect';
import { useDocumentVisible } from './useDomHooks';

export interface UsePollingParamType {
  method(...params: any[]): Promise<any>;
  onReceive?(data?: any): boolean;
  interval?: number;
  errorRetryCount?: number;
  autoStart?: boolean;
  pollingWhenHidden?: boolean;
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
  pollingWhenHidden = false, //窗口隐藏时，暂停请求
}: UsePollingParamType) => {
  const [_request, { loading, error, data }] = useMutation(method);
  const isMounted = useIsMounted();
  const [polling, setPolling] = useState(autoStart);
  const [retryCount, setRetryCount] = useState(errorRetryCount);
  const visible = useDocumentVisible();

  const request = () => {
    if (pollingWhenHidden || visible) {
      setPolling(true);
      _request();
    }
  };

  const start = () => {
    if (polling === false && isMounted) {
      request();
    }
  };

  const cancel = () => {
    clear();
    setRetryCount(errorRetryCount);
    setPolling(false);
  };

  const onError = () => {
    if (retryCount) {
      setRetryCount(count => count - 1);
      request();
    } else {
      cancel();
    }
  };

  const onSuccess = () => {
    if (onReceive && onReceive(data) === true) {
      cancel();
    } else {
      request();
    }
  };

  const clear = useTimeout(
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
    [data, error, polling]
  );

  useUpdateEffect(() => {
    //窗口切回来时，尝试重新请求
    if (!pollingWhenHidden && visible && polling) {
      request();
    }
  }, [visible]);

  useUnmount(() => {
    cancel();
  });

  return {
    start,
    cancel,
    loading,
    data,
    polling,
  };
};
