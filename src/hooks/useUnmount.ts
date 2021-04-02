import { useEffect, useRef } from 'react';

/**
 * @description: 组件卸载时执行的操作
 * @param {function} fn 操作函数
 */
export const useUnmount = (fn: () => void | undefined) => {
  const fnRef = useRef<typeof fn>();
  fnRef.current = fn;
  useEffect(() => {
    return fnRef.current;
  }, []);
};

/**
 * @description: 获取组件卸载状态
 * @return {*}: 组件是否已卸载
 */
export const useIsUnmounted = () => {
  const isUnmountedRef = useRef(false);
  isUnmountedRef.current = false;
  useUnmount(() => {
    isUnmountedRef.current = true;
  });
  return isUnmountedRef.current;
};

/**
 * @description: 获取组件卸载状态
 * @return {*}: 组件是否已挂载
 */
export const useIsMounted = () => !useIsUnmounted();