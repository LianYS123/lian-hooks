import { useEffect, useRef, EffectCallback, DependencyList } from 'react';
import isEqual from 'fast-deep-equal';

/**
 * @description: 使用深比较的useEffect
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 */
export const useDeepCompareEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
) => {
  const depsRef = useRef(deps);
  if (!isEqual(depsRef.current, deps)) {
    depsRef.current = deps;
  }
  useEffect(effect, depsRef.current);
};
