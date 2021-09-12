import { RefObject, useState } from 'react';
import { useEventListener } from './useEventListener';

import { Point } from '../types/Point';

type ScaleOpts = {
  direction: 'up' | 'down';
  interval: number;
};

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

export const useScale = (ref: RefObject<HTMLElement | null>) => {
  const [scale, setScale] = useState(1);
  const [baseDistance, setBaseDistance] = useState(0);

  const getTwoPointDistance = (p1: Point, p2: Point) =>
    Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

  const updateScale = ({ direction, interval }: ScaleOpts) => {
    setScale((currentScale) => {
      let sc: number = currentScale;

      if (direction === 'up') {
        sc = currentScale + interval;
      } else if (direction === 'down') {
        sc = currentScale - interval;
      }

      sc = sc > MAX_SCALE ? MAX_SCALE : sc;
      sc = sc < MIN_SCALE ? MIN_SCALE : sc;

      return sc;
    });
  };

  useEventListener(ref, 'wheel', (e) => {
    e.preventDefault();

    updateScale({
      direction: e.deltaY > 0 ? 'up' : 'down',
      interval: 0.1,
    });
  });

  useEventListener(ref, 'touchstart', (e) => {
    e.preventDefault();

    if (e.touches.length < 2) return;
    const p1: Point = { x: e.touches[0].pageX, y: e.touches[0].pageY };
    const p2: Point = { x: e.touches[1].pageX, y: e.touches[1].pageY };

    setBaseDistance(getTwoPointDistance(p1, p2));
  });

  useEventListener(ref, 'touchmove', (e) => {
    e.preventDefault();

    if (e.touches.length < 2) return;

    setScale((currentScale) => {
      let sc: number;

      const p1: Point = { x: e.touches[0].pageX, y: e.touches[0].pageY };
      const p2: Point = { x: e.touches[1].pageX, y: e.touches[1].pageY };
      const distance = getTwoPointDistance(p1, p2);

      const deltaDistance = baseDistance - distance;
      setBaseDistance(distance);
      sc = currentScale - deltaDistance * 0.005;

      sc = sc > MAX_SCALE ? MAX_SCALE : sc;
      sc = sc < MIN_SCALE ? MIN_SCALE : sc;

      return sc;
    });

    return scale;
  });

  useEventListener(ref, 'touchend', (e) => {
    e.preventDefault();

    setBaseDistance(0);
  });

  return scale;
};
