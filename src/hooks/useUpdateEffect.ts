import { useEffect, useRef } from 'react';

/**
 * @description: 组件更新时执行的事件
 * @param {*} fn  要执行的函数
 * @param {*} deps  依赖项
 */
export const useUpdateEffect: typeof useEffect = (fn, deps) => {
  const isMouted = useRef(false); 
  useEffect(() => {
    if (isMouted.current) {
      return fn();
    } else {
        isMouted.current = true;
    }
  }, deps);
};
