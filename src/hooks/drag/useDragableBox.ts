import { useState, useEffect } from 'react';
import { getTargetElement, BasicTarget } from '../../utils/dom';
import { useMouse } from '../dom/useMouse';
import { useEventListener } from '../dom/useEventListener';

interface DragableBoxOption {
  /**
   * 默认宽度
   */
  defaultWidth: number;
  /**
   * 最小宽度
   */
  minWidth: number;
  /**
   * 最大宽度
   */
  maxWidth: number;
  /**
   * 被拉伸的容器
   */
  target: BasicTarget;
  /**
   * 用于拉伸的边缘
   */
  siderTarget: BasicTarget;
}

interface DragableBoxResult {
  /**
   * 容器当前宽度
   */
  width: number;
  /**
   * 是否正在被拉伸
   */
  isDragging: boolean;
}

/**
 * @description 拉伸容器
 * @param {Object} options
 * @param {Number} options.defaultWidth 默认宽度
 * @param {Number} options.minWidth 最小宽度
 * @param {Number} options.maxWidth 最大宽度
 * @param {*} options.target 被拉伸的容器
 * @param {*} options.siderTarget 用于拉伸的边缘
 * @return {Object} 包含宽度和拖拽状态的对象
 */
export const useDragableBox = (
  options: DragableBoxOption,
): DragableBoxResult => {
  const { defaultWidth, minWidth, maxWidth, target, siderTarget } = options;
  const { clientX } = useMouse();
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const box = getTargetElement(target);
    if (!box?.getBoundingClientRect) {
      return;
    }
    const { left } = box.getBoundingClientRect() || {};
    let newWidth = clientX - left;
    newWidth = Math.max(minWidth, newWidth);
    newWidth = Math.min(maxWidth, newWidth);
    if (isDragging && width !== newWidth) {
      setWidth(newWidth);
    }
  }, [target, clientX, isDragging, maxWidth, minWidth, setWidth, siderTarget]);
  useEffect(() => {
    document.body.style.cursor = isDragging ? 'col-resize' : '';
    document.onselectstart = () => !isDragging;
    return () => {
      document.body.style.cursor = '';
      document.onselectstart = null;
    };
  }, [isDragging]);
  useEventListener(window, 'mouseup', () => {
    setIsDragging(false);
  });
  useEventListener(siderTarget, 'mousedown', () => {
    setIsDragging(true);
  });
  return { width, isDragging };
};
