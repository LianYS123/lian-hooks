---
title: 事件监听
nav:
  title: 事件相关
  order: 2
---

## useEventListener

dom 事件监听，组件销毁时自动移除事件

## useMouse

监听鼠标位置

```jsx
import React, { useRef } from 'react';
import { useMouse } from '../../src/hooks/dom/useMouse.ts';

export default () => {
  const result = useMouse();
  return <div>{JSON.stringify(result, null, 2)}</div>;
};
```

<!-- <API src='../../src/hooks/dom/useMouse.ts'></API> -->

## useSize

监听元素尺寸(width/height)

```jsx
import React, { useRef } from 'react';
import { useSize } from '../../src/hooks/dom/useSize.ts';

export default () => {
  const divRef = useRef(null);
  const bodyRef = useRef(document.documentElement);
  const { width, height } = useSize(bodyRef);
  return (
    <div ref={divRef}>
      width: {width} <br />
      height: {height} <br />
    </div>
  );
};
```

<!-- <API src='../../src/hooks/dom/useSize.ts'></API> -->
