import { useState, useEffect } from 'react';
import { useMouse, useEventListener } from './useDomHooks';
import { getTargetElement, BasicTarget } from './utils/dom';

type DragableBoxParams = {
  defaultWidth: number,
  minWidth: number,
  maxWidth: number,
  target: BasicTarget<HTMLElement>,
  siderTarget: BasicTarget<HTMLElement>,
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
export const useDragableBox = ({
  defaultWidth,
  minWidth,
  maxWidth,
  target,
  siderTarget,
}: DragableBoxParams) => {
  const { clientX } = useMouse();
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const box = getTargetElement(target) as HTMLElement;
    if (!box.getBoundingClientRect) {
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
