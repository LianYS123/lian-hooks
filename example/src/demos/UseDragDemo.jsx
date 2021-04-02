import React, { useState } from 'react';
import { useDrag, useDrop } from 'lian-hooks';

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
      box{index} {isHovering && 'release here!!!'}
    </div>
  );
};

export const UseDragDemo = () => {
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
