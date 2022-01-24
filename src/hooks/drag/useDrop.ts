import { useMemo, useRef, useState } from 'react';

type DropOptions = {
  /**
   * 元素被释放事件
   */
  onDrop?: (data: any, ev: DragEvent) => void;
};

/**
 * @description: 获取接收被拖拽内容的元素的属性
 * @return {Object} 释放元素属性
 */
export const useDrop = (options: DropOptions) => {
  const [isHovering, setIsHovering] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options; // 保证每次执行的函数都是最新的
  const props = useMemo(
    () => ({
      onDragOver: (ev: Event) => {
        ev.preventDefault(); // 必须禁用默认事件
      },
      onDrop: (ev: any) => {
        ev.preventDefault();
        ev.persist();
        setIsHovering(false);
        let data = ev.dataTransfer.getData('custom');
        try {
          data = JSON.parse(data);
        } catch (err) {}
        optionsRef.current.onDrop?.(data, ev);
      },
      onDragEnter: (ev: Event) => {
        ev.preventDefault();
        setIsHovering(true);
      },
      onDragLeave: (ev: Event) => {
        ev.preventDefault();
        setIsHovering(false);
      },
    }),
    [setIsHovering],
  );
  return [props, { isHovering }];
};
