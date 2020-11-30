import { useEffect, useState, DependencyList, useRef } from 'react';

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