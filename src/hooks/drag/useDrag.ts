type DragOptions<E> = {
  /**
   * 拖拽开始事件
   */
  onDragStart?: (data: any, ev: DragEvent) => void;
  /**
   * 拖拽结束事件
   */
  onDragEnd?: (data: any, ev: DragEvent) => void;
};

/**
 * @description: 获取可以被拖拽的元素属性
 * @param {Object} config 拖拽开始执行的函数, 拖拽结束执行的函数
 * @return {Function} 一个获取拖拽属性的函数，入参为拖拽传输的数据
 */
export const useDrag = <E = HTMLElement>(config: DragOptions<E> = {}) => {
  const { onDragStart, onDragEnd } = config;
  return (data: any) => ({
    draggable: 'true',
    key: JSON.stringify(data),
    onDragStart: (ev: DragEvent) => {
      ev.dataTransfer?.setData('custom', JSON.stringify(data));
      onDragStart && onDragStart(data, ev);
    },
    onDragEnd: (ev: DragEvent) => {
      onDragEnd && onDragEnd(data, ev);
    },
  });
};
