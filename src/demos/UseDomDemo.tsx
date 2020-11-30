import React, { useRef } from 'react';
import { useSize, useEventListener } from '../hooks';

export const UseDomDemo = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef(document.documentElement);
  const { width, height } = useSize(bodyRef);
  useEventListener(divRef, 'click', () => {
    console.log('test');
  });
  return (
    <div ref={divRef}>
      width: {width} <br />
      height: {height} <br />
    </div>
  );
};
