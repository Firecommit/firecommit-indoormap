import { RefObject, useRef } from 'react';
import { Point } from '../types/Point';
import { useEventListener } from './useEventListener';

export const useMousePos = (ref: RefObject<HTMLElement | null>) => {
  const pos = useRef<Point>({ x: 0, y: 0 });

  useEventListener(ref, 'wheel', (e: MouseEvent) => {
    pos.current = {
      x: e.pageX,
      y: e.pageY,
    };
  });

  return pos;
};
