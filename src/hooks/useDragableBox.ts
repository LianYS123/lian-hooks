import { useState, useEffect, useCallback } from 'react';
import { useMouse, useEventListener } from './useDomHooks';
import { getTargetElement } from './utils/dom';

//节流
const throttle = (fn, t) => {
  let shouldRun = true;
  return (...args) => {
    if (shouldRun) {
      fn(...args);
      shouldRun = false;
      setTimeout(() => {
        shouldRun = true;
      }, t);
    }
  };
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
  boxRef,
  siderRef,
}) => {
  const { clientX } = useMouse();
  const [width, _setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const setWidth = useCallback(throttle(_setWidth, 100), []);
  useEffect(() => {
    const box = getTargetElement(boxRef) as HTMLElement;
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
  }, [boxRef, clientX, isDragging, maxWidth, minWidth, setWidth, siderRef]);
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.cursor = '';
    }
    return () => {
      document.body.style.cursor = '';
    };
  }, [isDragging]);
  useEventListener(window, 'mouseup', () => {
    setIsDragging(false);
  });
  useEventListener(siderRef, 'mousedown', () => {
    setIsDragging(true);
  });
  return { width, isDragging };
};
