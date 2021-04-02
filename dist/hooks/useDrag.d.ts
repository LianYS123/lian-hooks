/// <reference types="react" />
interface IConfig {
    onDragStart?: (data: any, e: React.DragEvent) => void;
    onDragEnd?: (data: any, e: React.DragEvent) => void;
}
/**
 * @description: 获取可以被拖拽的元素属性
 * @param {function} onDragStart 拖拽开始执行的函数
 * @param {function} onDragEnd 拖拽结束执行的函数
 * @return {*} 一个获取拖拽属性的函数，入参为拖拽传输的数据
 */
export declare const useDrag: (config?: IConfig) => (data: any) => {
    draggable: "true";
    key: string;
    onDragStart: (ev: React.DragEvent) => void;
    onDragEnd: (ev: React.DragEvent) => void;
};
export interface DropProps {
    onDragOver: React.DragEventHandler;
    onDragEnter: React.DragEventHandler;
    onDragLeave: React.DragEventHandler;
    onDrop: React.DragEventHandler;
}
/**
 * @description: 获取接收被拖拽内容的元素的属性
 * @param {*} onDrop 当有元素被拖入时执行的函数
 * @return {*} 释放元素属性
 */
export declare const useDrop: (options: {
    onDrop(data: any, ev: React.DragEvent): void;
}) => [DropProps, {
    isHovering: boolean;
}];
export {};
