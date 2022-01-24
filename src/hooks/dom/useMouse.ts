import { useState } from 'react';
import { useEventListener } from './useEventListener';

const defaultMouseAttribute = {
  pageX: NaN,
  pageY: NaN,
  screenX: NaN,
  screenY: NaN,
  x: NaN,
  y: NaN,
  clientX: NaN,
  clientY: NaN,
};
/**
 * @description: 获取鼠标位置信息
 * @return {*} 鼠标位置信息
 */
export const useMouse = () => {
  const [attr, setAttr] = useState(defaultMouseAttribute);
  useEventListener(window, 'mousemove', (ev: MouseEvent) => {
    const { pageX, pageY, screenX, screenY, x, y, clientX, clientY } = ev;
    setAttr({ pageX, pageY, screenX, screenY, x, y, clientX, clientY });
  });
  return attr;
};
