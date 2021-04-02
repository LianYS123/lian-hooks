import { MutableRefObject } from 'react';
import { BasicTarget, TargetElement } from './utils/dom';
/**
 * @description: 在hooks中使用事件监听器
 * @param {*} target  dom对象或其ref引用
 * @param {*} eventName 事件名称
 * @param {*} listener  事件监听器
 */
export declare const useEventListener: (target: BasicTarget<TargetElement>, eventName: string, listener: EventListenerOrEventListenerObject) => void;
/**
 * @description: 监听元素大小变化
 * @param {MutableRefObject} ref 元素ref引用
 * @return {*} {width, height}
 */
export declare const useSize: (ref: MutableRefObject<TargetElement>) => {
    width: number;
    height: number;
};
/**
 * @description: 获取页面是否可见
 * @return {*} 页面可视状态
 */
export declare const useDocumentVisible: () => boolean;
declare type MouseAttribute = {
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
    x: number;
    y: number;
    clientX: number;
    clientY: number;
};
/**
 * @description: 获取鼠标位置信息
 * @return {*} 鼠标位置信息
 */
export declare const useMouse: () => MouseAttribute;
export {};
