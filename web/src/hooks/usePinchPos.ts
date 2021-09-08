import { RefObject, useState } from 'react';
import { Point } from '../types/Point';
import { useEventListener } from './useEventListener';

export const usePinchPos = (ref: RefObject<HTMLElement | null>) => {
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });

  const getMidPoint = (p1: Point, p2: Point): Point => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  };

  useEventListener(ref, 'touchstart', (e) => {
    e.preventDefault();

    if (e.touches.length < 2) return { x: 0, y: 0 };

    const p1 = { x: e.touches[0].pageX, y: e.touches[0].pageY };
    const p2 = { x: e.touches[1].pageX, y: e.touches[1].pageY };
    setPos(getMidPoint(p1, p2));
  });

  return pos;
};
