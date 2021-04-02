import { useState, useEffect, MutableRefObject, useRef } from 'react';
import { BasicTarget, TargetElement, getTargetElement } from './utils/dom';
import { isDocumentVisible } from './utils';

/**
 * @description: 在hooks中使用事件监听器
 * @param {*} target  dom对象或其ref引用
 * @param {*} eventName 事件名称
 * @param {*} listener  事件监听器
 */
export const useEventListener = (
  target: BasicTarget<TargetElement>,
  eventName: string,
  listener: EventListenerOrEventListenerObject
) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  useEffect(() => {
    const targetElement = getTargetElement(target, window); //放里面，不然targetElement会被缓存
    if (!targetElement?.addEventListener) {
      return;
    }
    targetElement.addEventListener(eventName, listenerRef.current);
    return targetElement.removeEventListener.bind(
      targetElement,
      eventName,
      listenerRef.current
    );
  }, [eventName, target]);
};

/**
 * @description: 监听元素大小变化
 * @param {MutableRefObject} ref 元素ref引用
 * @return {*} {width, height}
 */
export const useSize = (ref: MutableRefObject<TargetElement>) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const _setSize = () => {
    setSize({
      width: ref.current ? (ref.current as HTMLElement).clientWidth : 0,
      height: ref.current ? (ref.current as HTMLElement).clientHeight : 0,
    });
  };
  useEventListener(window, 'resize', _setSize);
  useEffect(() => {
    _setSize();
  }, []);
  return size;
};

/**
 * @description: 获取页面是否可见
 * @return {*} 页面可视状态
 */
export const useDocumentVisible = () => {
  const [visible, setVisible] = useState(isDocumentVisible());
  useEventListener(document, 'visibilitychange', () => {
    setVisible(isDocumentVisible());
  });
  return visible;
};

type MouseAttribute = {
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  x: number;
  y: number;
  clientX: number;
  clientY: number;
};

const defaultMouseAttribute = {
  pageX: NaN,
  pageY: NaN,
  screenX: NaN,
  screenY: NaN,
  x: NaN,
  y: NaN,
  clientX: NaN,
  clientY: NaN
};

/**
 * @description: 获取鼠标位置信息
 * @return {*} 鼠标位置信息
 */
export const useMouse = (): MouseAttribute => {
  const [attr, setAttr] = useState<MouseAttribute>(defaultMouseAttribute);
  useEventListener(window, 'mousemove', (ev: MouseEvent) => {
    const { pageX, pageY, screenX, screenY, x, y, clientX, clientY } = ev;
    setAttr({ pageX, pageY, screenX, screenY, x, y, clientX, clientY });
  });
  return attr;
};
