import { EffectCallback, DependencyList } from 'react';
/**
 * @description: 自定义useEffect的更新逻辑
 * @param {*} effect 作用
 * @param {*} deps 依赖
 * @param {*} shouldUpdate 是否执行作用，返回true执行effect
 */
export declare const useShouldUpdateEffect: (effect: EffectCallback, deps: DependencyList, shouldUpdate: (pre: any, cur: any) => boolean) => void;
/**
 * @description: 自定义useEffect的依赖比较逻辑
 * @param {*} effect 作用
 * @param {*} deps 依赖
 * @param {*} compare 自定义比较函数
 */
export declare const useCustomCompareEffect: (effect: EffectCallback, deps: DependencyList, compare: (pre: any, cur: any) => boolean) => void;
