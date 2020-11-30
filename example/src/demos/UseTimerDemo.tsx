import React, { useState } from 'react';
import { useTimeout, useInterval } from 'idcos-hooks';
export const useTimerDemo = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const clearT = useTimeout(() => {
    console.log('timeout: ', count1);
    setCount1(count => count + 1);
  }, 1000);

  const clearI = useInterval(() => {
    console.log('interval', count2);
    setCount2(count => count + 1);
  }, 1000);

  return (
    <div>
      timeout count1: {count1} <br />
      interval count2: {count2} <br />
      <button
        onClick={() => {
          clearI();
          clearT();
        }}
      >
        clear
      </button>
    </div>
  );
};
