import React, { useState } from 'react';
import { useDrag } from '../../src/hooks/drag/useDrag';
import { useDrop } from '../../src/hooks/drag/useDrop';

const Box = ({ index, swapItem, color }) => {
  const getDragProps = useDrag();

  const [dropProps, { isHovering }] = useDrop({
    onDrop: fromIndex => {
      swapItem(fromIndex, index);
    },
  });

  return (
    <div
      {...getDragProps(index)}
      {...dropProps}
      style={{
        width: 100,
        height: 100,
        margin: 16,
        backgroundColor: color,
        textAlign: 'center',
        lineHeight: '100px',
      }}
    >
      {isHovering ? 'release here' : 'box'}
    </div>
  );
};

export default () => {
  const [items, setItems] = useState([
    'red',
    'blue',
    'yellow',
    'green',
    'orange',
  ]);

  const swapItem = (from, to) => {
    const newItems = [...items]; // 能否取到最新的items取决于如何调用此函数
    [newItems[from], newItems[to]] = [items[to], items[from]];
    setItems(newItems);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {items.map((color, index) => (
          <Box color={color} swapItem={swapItem} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};
