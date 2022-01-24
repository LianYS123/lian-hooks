import React, { useState } from 'react';
import { useDeepCompareEffect } from '../../src/hooks/common/useDeepCompareEffect';

export default () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState({});

  useDeepCompareEffect(() => {
    // 不会重复执行
    console.log('test');
  }, [state]);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
        setState({});
      }}
    >
      click me {count}
    </button>
  );
};
