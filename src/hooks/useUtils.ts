import { useEffect, useState, DependencyList, useRef, useCallback } from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

/**
 * @description: setInterval的hooks实现
 * @param {function} func 要执行的函数
 * @param {number} interval 执行间隔
 * @param {DependencyList} deps 依赖项
 * @return {*} clearInterval
 */
export const useInterval = (func: () => void, interval: number, deps: DependencyList = []) => {
  const [ timer, setTimer ] = useState();
  const funcRef = useRef<() => void>(func);
  funcRef.current = func; //每次进入hooks保存最新的执行函数
  const clear = () => clearInterval(timer);
  useEffect(() => {
    const I = setInterval(() => {
      funcRef.current();
    }, interval);
    setTimer(I as any);
    return () => clearInterval(I);
  }, deps);
  return clear;
};

/**
 * @description: setTimeout的hooks实现
 * @param {function} func 要执行的函数
 * @param {number} interval 执行间隔
 * @param {DependencyList} deps 依赖项
 * @return {*} clearTimeout
 */
export const useTimeout = (func: () => void, timeout: number, deps: DependencyList = []) => {
  const [ timer, setTimer ] = useState();
  const funcRef = useRef<() => void>(func);
  funcRef.current = func; //每次进入hooks保存最新的执行函数
  const clear = () => clearTimeout(timer);
  useEffect(() => {
    const T = setTimeout(funcRef.current, timeout);
    setTimer(T as any);
    return () => clearTimeout(T);
  }, deps);
  return clear;
};

/**
 * @description: 放缓获取value的速率（节流）
 * @param {*} value 要节流的值
 * @param {*} wait 节流时间间隔
 * @return {*} 放缓变化的值
 */
export const useThrottledValue = (value, wait = 100) => {
  const [throttledValue, setValue] = useState();
  const setThrottledValue = useCallback(throttle(setValue, wait), []);
  useEffect(() => {
    setThrottledValue(value);
  }, [value])
  return throttledValue;
}

/**
 * @description: 合并一定时间内多次获取value的值（防抖）
 * @param {*} value 要节流的值
 * @param {*} wait 节流时间间隔
 * @return {*} 处理后的值
 */
export const useDebouncedValue = (value, wait = 100) => {
  const [debouncedValue, setValue] = useState();
  const setThrottledValue = useCallback(debounce(setValue, wait), []);
  useEffect(() => {
    setThrottledValue(value);
  }, [value])
  return debouncedValue;
}