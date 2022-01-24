import { useState, useEffect } from 'react';
import { getTargetElement, BasicTarget } from '../../utils/dom';
import { useEventListener } from './useEventListener';

/**
 * @description: 监听元素大小变化
 * @param ref 元素ref引用
 * @return {{width: Number, height: Number}} {width, height}
 */
export const useSize = (target: BasicTarget) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const updateSize = () => {
    const targetElement = getTargetElement(target);
    setSize({
      width: (targetElement as HTMLElement)?.clientWidth || 0,
      height: (targetElement as HTMLElement)?.clientHeight || 0,
    });
  };
  useEventListener(window, 'resize', updateSize);
  useEffect(() => {
    updateSize();
  }, []);
  return size;
};
