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
/**
 * @description: 放缓获取value的速率（节流）
 * @param {*} value 要节流的值
 * @param {*} wait 节流时间间隔
 * @return {*} 放缓变化的值
 */
export declare const useThrottledValue: (value: any, wait?: number) => undefined;
/**
 * @description: 合并一定时间内多次获取value的值（防抖）
 * @param {*} value 要节流的值
 * @param {*} wait 节流时间间隔
 * @return {*} 处理后的值
 */
export declare const useDebouncedValue: (value: any, wait?: number) => undefined;
