import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { usePinchOrMousePos } from '../../hooks/usePinchOrMousePos';
import { usePan } from '../../hooks/usePan';
import { useScale } from '../../hooks/useScale';
import { useLast } from '../../hooks/useLast';
import { Point } from '../../types/Point';
import {
  getTwoPointDiff,
  getPointDivision,
  getTwoPointSum,
} from '../../utils/pointUtils';

import { CanvasPresenter } from './Presenter';

type Props = {
  image: string;
  position: Point;
  maxOffset: Point;
  minOffset: Point;
};

export const Canvas = ({ image, position, maxOffset, minOffset }: Props) => {
  const [buffer, setBuffer] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  const pinchOrMousePos = usePinchOrMousePos(ref);
  const [offset, startMousePan, startTouchPan] = usePan();
  const scale = useScale(ref);
  const [rerender, setRerender] = useState<boolean>(false);

  const lastOffset = useLast<Point>(offset);
  const lastScale = useLast<number>(scale);

  const offsetDelta = getTwoPointDiff(offset, lastOffset);

  const initialAdjustedOffset = useRef<Point>(
    getTwoPointSum(offset, offsetDelta)
  );
  const adjustedOffsetRef = useRef<Point>(initialAdjustedOffset.current);
  let adjustedOffset = adjustedOffsetRef.current;

  useEffect(() => {
    adjustedOffset = getTwoPointSum(initialAdjustedOffset.current, {
      x: position.x - (ref?.current?.clientWidth ?? 0) / 2,
      y: position.y - (ref?.current?.clientHeight ?? 0) / 2,
    });
    setRerender(!rerender);
  }, [position]);

  if (lastScale === scale) {
    adjustedOffset = getTwoPointSum(
      adjustedOffsetRef.current,
      getPointDivision(offsetDelta, scale)
    );
    if (adjustedOffset.x > maxOffset.x) adjustedOffset.x = maxOffset.x;
    if (adjustedOffset.y > maxOffset.y) adjustedOffset.y = maxOffset.y;
    if (adjustedOffset.x < minOffset.x) adjustedOffset.x = minOffset.x;
    if (adjustedOffset.y < minOffset.y) adjustedOffset.y = minOffset.y;
  } else {
    const lastPos = getPointDivision(pinchOrMousePos.current, lastScale);
    const newPos = getPointDivision(pinchOrMousePos.current, scale);
    const pinchOffset = getTwoPointDiff(lastPos, newPos);

    adjustedOffset = getTwoPointSum(adjustedOffsetRef.current, pinchOffset);
  }

  useEffect(() => {
    adjustedOffsetRef.current = adjustedOffset;
  });

  useLayoutEffect(() => {
    const height = ref?.current?.clientHeight ?? 0;
    const width = ref?.current?.clientWidth ?? 0;

    setBuffer({
      x: (width - width / scale) / 2,
      y: (height - height / scale) / 2,
    });
  }, [scale, setBuffer]);

  return (
    <CanvasPresenter
      image={image}
      scale={scale}
      adjustedOffset={adjustedOffset}
      buffer={buffer}
      startMousePan={startMousePan}
      startTouchPan={startTouchPan}
      ref={ref}
    />
  );
};
