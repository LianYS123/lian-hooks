import { useRef, useEffect, EffectCallback, DependencyList } from 'react';

/**
 * @description: 自定义useEffect的更新逻辑
 * @param {*} effect 作用
 * @param {*} deps 依赖
 * @param {*} shouldUpdate 是否执行作用，返回true执行effect
 */
export const useShouldUpdateEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  shouldUpdate: (pre, cur) => boolean
) => {
  const depsRef = useRef<DependencyList>(deps);
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
export const useCustomCompareEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  compare: (pre, cur) => boolean
) => useShouldUpdateEffect(effect, deps, (...args) => !compare(...args));
