import React, { useRef } from 'react';
import { useDragableBox } from '../../src/hooks/drag/useDragableBox';

export default () => {
  const target = useRef();
  const siderTarget = useRef();
  const { width } = useDragableBox({
    minWidth: 100,
    maxWidth: 400,
    defaultWidth: 200,
    target,
    siderTarget,
  });
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          ref={target}
          style={{
            width,
            height: 200,
            backgroundColor: 'skyblue',
            // transition: 'width 100ms',
          }}
        ></div>
        <div
          ref={siderTarget}
          style={{
            width: 5,
            height: 200,
            backgroundColor: 'blue',
            cursor: 'col-resize',
          }}
        ></div>
      </div>
    </>
  );
};
