/**
 * @description: 组件卸载时执行的操作
 * @param {function} fn 操作函数
 */
export declare const useUnmount: (fn: () => void | undefined) => void;
/**
 * @description: 获取组件卸载状态
 * @return {*}: 组件是否已卸载
 */
export declare const useIsUnmounted: () => boolean;
/**
 * @description: 获取组件卸载状态
 * @return {*}: 组件是否已挂载
 */
export declare const useIsMounted: () => boolean;
