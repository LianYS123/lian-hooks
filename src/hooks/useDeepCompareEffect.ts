import { useEffect } from 'react';
import { useCustomCompareEffect } from './useShouldUpdateEffect';
import isEqual from 'fast-deep-equal';
/**
 * @description: 使用深比较的useEffect
 * @param {*} effect 作用
 * @param {*} deps 依赖
 * @return {*}
 */
export const useDeepCompareEffect: typeof useEffect = (effect, deps = []) => {
  return useCustomCompareEffect(effect, deps, isEqual);
};
