import React, { useRef } from 'react';
import Grid from '../resources/grid.svg';
import { useScale } from '../hooks/useScale';

export const UseScaleExample = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const scale = useScale(ref);

  return (
    <div
      ref={ref}
      style={{
        height: '100vh',
        backgroundImage: `url(${Grid})`,
        backgroundSize: '50%',
      }}
    >
      <span
        style={{
          fontSize: '2rem',
        }}
      >
        {scale}
      </span>
    </div>
  );
};
