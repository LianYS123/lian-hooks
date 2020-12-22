/**
 * @description: 拉伸容器
 * @param {number} defaultWidth 默认宽度
 * @param {number} minWidth 最小宽度
 * @param {number} maxWidth 最大宽度
 * @param {*} boxRef 被拉伸的容器
 * @param {*} siderRef 用于拉伸的边缘
 * @return {object} 包含宽度和拖拽状态的对象
 */
export declare const useDragableBox: ({ defaultWidth, minWidth, maxWidth, boxRef, siderRef, }: {
    defaultWidth: any;
    minWidth: any;
    maxWidth: any;
    boxRef: any;
    siderRef: any;
}) => {
    width: any;
    isDragging: boolean;
};
