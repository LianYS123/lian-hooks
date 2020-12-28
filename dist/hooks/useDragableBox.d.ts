import { BasicTarget } from './utils/dom';
declare type DragableBoxParams = {
    defaultWidth: number;
    minWidth: number;
    maxWidth: number;
    target: BasicTarget<HTMLElement>;
    siderTarget: BasicTarget<HTMLElement>;
};
/**
 * @description: 拉伸容器
 * @param {number} defaultWidth 默认宽度
 * @param {number} minWidth 最小宽度
 * @param {number} maxWidth 最大宽度
 * @param {*} boxRef 被拉伸的容器
 * @param {*} siderRef 用于拉伸的边缘
 * @return {object} 包含宽度和拖拽状态的对象
 */
export declare const useDragableBox: ({ defaultWidth, minWidth, maxWidth, target, siderTarget, }: DragableBoxParams) => {
    width: number;
    isDragging: boolean;
};
export {};
