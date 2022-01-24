import { useEffect, useRef } from 'react';
import { getTargetElement, BasicTarget, TargetElement } from '../../utils/dom';

/**
 * @description: 在hooks中使用事件监听器
 * @param {*} target  dom对象或其ref引用
 * @param {*} eventName 事件名称
 * @param {*} listener  事件监听器
 */
export const useEventListener = (
  target: BasicTarget<TargetElement>,
  eventName: string,
  listener: Function,
) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  useEffect(() => {
    const targetElement = getTargetElement(target, window); // 放里面，不然targetElement会被缓存
    if (!targetElement?.addEventListener) {
      return;
    }
    const eventListener = (ev: Event) => {
      listenerRef.current && listenerRef.current(ev);
    };
    targetElement.addEventListener(eventName, eventListener);
    return targetElement.removeEventListener.bind(
      targetElement,
      eventName,
      eventListener,
    );
  }, [eventName, target]);
};
