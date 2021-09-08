import React, { useRef } from 'react';
import Grid from '../resources/grid.svg';
import { usePinchPos } from '../hooks/usePinchPos';

export const UsePinchPosExample = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pinchPos = usePinchPos(ref);

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
