import { DependencyList } from 'react';
/**
 * @description: setInterval的hooks实现
 * @param {function} func 要执行的函数
 * @param {number} interval 执行间隔
 * @param {DependencyList} deps 依赖项
 * @return {*} clearInterval
 */
export declare const useInterval: (func: () => void, interval: number, deps?: DependencyList) => () => void;
/**
 * @description: setTimeout的hooks实现
 * @param {function} func 要执行的函数
 * @param {number} interval 执行间隔
 * @param {DependencyList} deps 依赖项
 * @return {*} clearTimeout
 */
export declare const useTimeout: (func: () => void, timeout: number, deps?: DependencyList) => () => void;
