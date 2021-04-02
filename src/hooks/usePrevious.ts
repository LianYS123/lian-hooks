import { useRef } from 'react';

export type compareFunction<T> = (cur: T | undefined, pre: T) => boolean;

/**
 * @description: 获取上一个值
 * @param {*} state 当前值
 * @param {*} compare 比较函数, 返回true时更新上一个值，默认每次渲染都更新
 * @return {*} 前一个值
 */
export const usePrevious = <T = any>(state, compare?: compareFunction<T>) => {
  const prevRef = useRef();
  const curRef = useRef(state);
  const shouldUpdate =
    typeof compare === 'function' ? compare(curRef.current, state) : true;
  if (shouldUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }
  return prevRef.current;
};
