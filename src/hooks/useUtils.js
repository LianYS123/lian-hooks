import { useEffect, useState, useRef, useCallback } from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import isEqual from 'fast-deep-equal';

/**
 * @description: setInterval的hooks实现
 * @param {function} func 要执行的函数
 * @param {number} interval 执行间隔
 * @param {Array} deps 依赖项
 * @return {*} clearInterval
 */
export const useInterval = (func, interval, deps = []) => {
  const [timer, setTimer] = useState();
  const funcRef = useRef(func);
  funcRef.current = func; // 每次进入hooks保存最新的执行函数
  const clear = () => clearInterval(timer);
  useEffect(() => {
    const I = setInterval(() => {
      funcRef.current();
    }, interval);
    setTimer(I);
    return () => clearInterval(I);
  }, deps);
  return clear;
};

/**
 * @description: setTimeout的hooks实现
 * @param {function} func 要执行的函数
 * @param {number} timeout 执行间隔
 * @param {Array} deps 依赖项
 * @return {*} clearTimeout
 */
export const useTimeout = (func, timeout, deps = []) => {
  const [timer, setTimer] = useState();
  const funcRef = useRef(func);
  funcRef.current = func; // 每次进入hooks保存最新的执行函数
  const clear = () => clearTimeout(timer);
  useEffect(() => {
    const T = setTimeout(funcRef.current, timeout);
    setTimer(T);
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
  }, [value]);
  return throttledValue;
};

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
  }, [value]);
  return debouncedValue;
};

/**
 * @description: 自定义useEffect的更新逻辑
 * @param {*} effect 作用
 * @param {*} deps 依赖
 * @param {*} shouldUpdate 是否执行作用，返回true执行effect
 */
export const useShouldUpdateEffect = (effect, deps, shouldUpdate) => {
  const depsRef = useRef(deps);
  if (shouldUpdate(depsRef.current, deps)) {
    depsRef.current = deps;
  }
  useEffect(effect, depsRef.current);
};

/**
 * @description: 自定义useEffect的依赖比较逻辑
 * @param {*} effect 作用
 * @param {*} deps 依赖
 * @param {*} compare 自定义比较函数
 */
export const useCustomCompareEffect = (effect, deps, compare) =>
  useShouldUpdateEffect(effect, deps, (...args) => !compare(...args));

/**
 * @description: 使用深比较的useEffect
 * @param {*} effect 作用
 * @param {*} deps 依赖
 * @return {*}
 */
export const useDeepCompareEffect = (effect, deps = []) => {
  return useCustomCompareEffect(effect, deps, isEqual);
};

/**
 * @description: 获取上一个值
 * @param {*} state 当前值
 * @param {*} compare 比较函数, 返回true时更新上一个值，默认每次渲染都更新
 * @return {*} 前一个值
 */
export const usePrevious = (state, compare) => {
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
/**
 * @description: 组件更新时执行的事件
 * @param {*} fn  要执行的函数
 * @param {*} deps  依赖项
 */
export const useUpdateEffect = (fn, deps) => {
  const isMouted = useRef(false);
  useEffect(() => {
    if (isMouted.current) {
      return fn();
    } else {
      isMouted.current = true;
    }
  }, deps);
};

/**
 * @description: 组件卸载时执行的操作
 * @param {function} fn 操作函数
 */
export const useUnmount = (fn) => {
  const fnRef = useRef(fn);
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

// hooks中打印信息
export const useLog = (...args) => {
  useEffect(() => {
    console.log(...args);
  }, args);
};

// useFlag
export const useFlag = () => {
  const [flag, setFlag] = useState(false);
  const setTrue = () => setFlag(true);
  const setFalse = () => setFlag(false);
  const toggle = () => setFlag((f) => !f);
  return {
    flag,
    setTrue,
    setFalse,
    toggle
  };
};
