import { useState, useEffect, MutableRefObject, useRef } from 'react';
import { BasicTarget, TargetElement, getTargetElement } from './utils/dom';

/**
 * @description: 在hooks中使用事件监听器
 * @param {*} target  dom对象或其ref引用
 * @param {*} eventName 事件名称
 * @param {*} listener  事件监听器
 */
export const useEventListener = (
  target: BasicTarget<TargetElement>,
  eventName: string,
  listener: EventListenerOrEventListenerObject,
) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  const targetElement = getTargetElement(target, window);
  useEffect(() => {
    if(!targetElement?.addEventListener) {
      return;
    }
    targetElement.addEventListener(eventName, listenerRef.current);
    return targetElement.removeEventListener.bind(targetElement, listenerRef.current);
  }, [eventName]);
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
