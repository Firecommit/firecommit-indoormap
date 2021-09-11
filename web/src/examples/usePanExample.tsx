import React from 'react';
import Grid from '../resources/grid.svg';
import { usePan } from '../hooks/usePan';

export const UsePanExample = () => {
  const [offset, startMousePan, startTouchPan] = usePan();
  return (
    <div
      onMouseDown={startMousePan}
      onTouchStart={startTouchPan}
      role="none"
      style={{
        height: '100vh',
        backgroundImage: `url(${Grid})`,
        backgroundSize: '50%',
      }}
    >
      <span>{JSON.stringify(offset)}</span>
    </div>
  );
};
