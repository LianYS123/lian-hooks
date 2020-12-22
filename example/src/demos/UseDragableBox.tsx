import React, { useRef } from 'react';
import { useDragableBox } from 'idcos-hooks';

export const UseDragableBox = () => {
  const boxRef = useRef<Element>();
  const siderRef = useRef();
  const { width } = useDragableBox({
    minWidth: 100,
    maxWidth: 400,
    defaultWidth: 200,
    boxRef,
    siderRef,
  });
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          ref={boxRef as any}
          style={{
            width,
            height: 200,
            backgroundColor: 'skyblue',
            transition: 'width 100ms',
          }}
        ></div>
        <div
          ref={siderRef as any}
          style={{
            width: 5,
            height: 200,
            backgroundColor: 'blue',
            cursor: 'col-resize',
          }}
        ></div>
      </div>
      {'text'.repeat(100)}
    </>
  );
};
