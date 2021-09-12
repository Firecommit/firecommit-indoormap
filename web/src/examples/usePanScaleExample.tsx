import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Grid from '../resources/grid.svg';
import { useScale } from '../hooks/useScale';
import { usePan } from '../hooks/usePan';
import { useZoomPos } from '../hooks/useZoomPos';
import { useLast } from '../hooks/useLast';
import { pointDivision, pointDiff, pointSum } from '../utils/pointUtils';
import { Point } from '../types/Point';

export const UsePanScaleExample = () => {
  const [buffer, setBuffer] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  const pinchOrMousePos = useZoomPos(ref);
  const [offset, startMousePan, startTouchPan] = usePan();
  const scale = useScale(ref);

  const lastOffset = useLast<Point>(offset);
  const lastScale = useLast<number>(scale);

  const offsetDelta = pointDiff(offset, lastOffset);

  const initialAdjustedOffset = pointSum(offset, offsetDelta);
  const adjustedOffsetRef = useRef<Point>(initialAdjustedOffset);
  let adjustedOffset = adjustedOffsetRef.current;
  useEffect(() => {
    adjustedOffsetRef.current = adjustedOffset;
  });

  if (lastScale === scale) {
    adjustedOffset = pointSum(
      adjustedOffsetRef.current,
      pointDivision(offsetDelta, scale)
    );
  } else {
    const lastPos = pointDivision(pinchOrMousePos.current, lastScale);
    const newPos = pointDivision(pinchOrMousePos.current, scale);
    const pinchOffset = pointDiff(lastPos, newPos);

    adjustedOffset = pointSum(adjustedOffsetRef.current, pinchOffset);
  }

  useLayoutEffect(() => {
    const height = ref?.current?.clientHeight ?? 0;
    const width = ref?.current?.clientWidth ?? 0;

    setBuffer({
      x: (width - width / scale) / 2,
      y: (height - height / scale) / 2,
    });
  }, [scale, setBuffer]);

  return (
    <div
      role="none"
      ref={ref}
      onMouseDown={startMousePan}
      onTouchStart={startTouchPan}
      style={{
        position: 'relative',
        height: '200vh',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${Grid})`,
          backgroundSize: 200,
          transform: `scale(${scale})`,
          backgroundPosition: `${-adjustedOffset.x}px ${-adjustedOffset.y}px`,
          position: 'absolute',
          bottom: buffer.y,
          left: buffer.x,
          right: buffer.x,
          top: buffer.y,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: 30,
          backgroundColor: 'white',
        }}
      >
        {JSON.stringify(offset)}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: 50,
          backgroundColor: 'white',
        }}
      >
        {JSON.stringify(adjustedOffset)}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: 70,
          backgroundColor: 'white',
        }}
      >
        {scale}
      </div>
    </div>
  );
};
