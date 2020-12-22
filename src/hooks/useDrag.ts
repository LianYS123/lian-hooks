import { useRef, useState, useMemo } from 'react';

interface IConfig {
  onDragStart?: (data: any, e: React.DragEvent) => void;
  onDragEnd?: (data: any, e: React.DragEvent) => void;
}
export const useDrag = (config: IConfig = {}) => {
  return (data: any) => ({
    draggable: 'true' as const,
    key: JSON.stringify(data),
    onDragStart: (ev: React.DragEvent) => {
      ev.dataTransfer.setData('custom', JSON.stringify(data));
      config.onDragStart?.(data, ev);
    },
    onDragEnd: (ev: React.DragEvent) => {
      config.onDragEnd?.(data, ev);
    },
  });
};

export interface DropProps {
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDrop: React.DragEventHandler;
}

export const useDrop = (options: {
  onDrop(data: any, ev: React.DragEvent): void;
}): [DropProps, { isHovering: boolean }] => {
  const [isHovering, setIsHovering] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options; //保证每次执行的函数都是最新的
  const props = useMemo(
    () => ({
      onDragOver: (ev: React.DragEvent) => {
        ev.preventDefault(); //必须禁用默认事件
      },
      onDrop: (ev: React.DragEvent) => {
        ev.preventDefault();
        ev.persist();
        setIsHovering(false);
        let data = ev.dataTransfer.getData('custom');
        try {
          data = JSON.parse(data);
        } catch (ev) {}
        optionsRef.current.onDrop?.(data, ev);
      },
      onDragEnter: (ev: React.DragEvent) => {
        ev.preventDefault();
        setIsHovering(true);
      },
      onDragLeave: (ev: React.DragEvent) => {
        ev.preventDefault();
        setIsHovering(false);
      },
    }),
    [setIsHovering]
  );
  return [props, { isHovering }];
};
