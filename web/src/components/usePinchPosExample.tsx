import React, { useRef } from 'react';
import Grid from '../resources/grid.svg';
import { usePinchOrMousePos } from '../hooks/usePinchOrMousePos';

export const UsePinchPosExample = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pinchPos = usePinchOrMousePos(ref);

  return (
    <div
      ref={ref}
      style={{
        height: '100vh',
        backgroundImage: `url(${Grid})`,
        backgroundSize: '50%',
      }}
    >
      <span>{JSON.stringify(pinchPos)}</span>
    </div>
  );
};
