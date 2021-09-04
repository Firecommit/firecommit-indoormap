import React, { useRef } from 'react';
import Grid from '../resources/grid.svg';
import { useScale } from '../hooks/useScale';
import { usePan } from '../hooks/usePan';

export const UsePanScaleExample = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const scale = useScale(ref);
  const [offset, startMousePan, startTouchPan] = usePan();

  return (
    <div
      role="none"
      ref={ref}
      onMouseDown={startMousePan}
      onTouchStart={startTouchPan}
      style={{
        height: '100vh',
      }}
    >
      <div
        style={{
          height: '100vh',
          backgroundImage: `url(${Grid})`,
          transform: `scale(${scale})`,
          backgroundPosition: `${-offset.x}px ${-offset.y}px`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 50,
          top: 50,
        }}
      >
        {JSON.stringify(offset)}
      </div>
    </div>
  );
};
