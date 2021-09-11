import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Grid from '../resources/grid.svg';
import { useScale } from '../hooks/useScale';
import { usePan } from '../hooks/usePan';
// import { usePinchPos } from '../hooks/usePinchPos';
import { useMousePos } from '../hooks/useMousePos';
import { useLast } from '../hooks/useLast';
import {
  getPointDivision,
  getTwoPointDiff,
  getTwoPointSum,
} from '../utils/pointUtils';
import { Point } from '../types/Point';

export const UsePanScaleExample = () => {
  const [buffer, setBuffer] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  // const pinchPos = usePinchPos(ref);
  const mousePos = useMousePos(ref);
  const [offset, startMousePan, startTouchPan] = usePan();
  const scale = useScale(ref);

  const lastOffset = useLast<Point>(offset);
  const lastScale = useLast<number>(scale);

  const offsetDelta = getTwoPointDiff(offset, lastOffset);

  const initialAdjustedOffset = getTwoPointSum(offset, offsetDelta);
  const adjustedOffsetRef = useRef<Point>(initialAdjustedOffset);
  let adjustedOffset = adjustedOffsetRef.current;
  useEffect(() => {
    adjustedOffsetRef.current = adjustedOffset;
  });

  if (lastScale === scale) {
    adjustedOffset = getTwoPointSum(
      adjustedOffsetRef.current,
      getPointDivision(offsetDelta, scale)
    );
  } else {
    // const lastPinchPos = getPointDivision(pinchPos.current, lastScale);
    // const newPinchPos = getPointDivision(pinchPos.current, scale);
    const lastPinchPos = getPointDivision(mousePos.current, lastScale);
    const newPinchPos = getPointDivision(mousePos.current, scale);
    const pinchOffset = getTwoPointDiff(lastPinchPos, newPinchPos);

    adjustedOffset = getTwoPointSum(adjustedOffsetRef.current, pinchOffset);
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
