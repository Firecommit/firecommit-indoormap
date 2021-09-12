import {
  MouseEvent as SyntheticMouseEvent,
  TouchEvent as SyntheticTouchEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Point } from '../types/Point';

const ORIGIN = Object.freeze({ x: 0, y: 0 });

export const usePan = (): [
  Point,
  (e: SyntheticMouseEvent) => void,
  (e: SyntheticTouchEvent) => void
] => {
  const [panState, setPanState] = useState<Point>(ORIGIN);

  const lastPointRef = useRef(ORIGIN);

  const pan = useCallback((e: MouseEvent | TouchEvent) => {
    const event = e instanceof MouseEvent ? e : e.touches[0];
    const lastPoint = lastPointRef.current;
    const point = {
      x: event.pageX,
      y: event.pageY,
    };
    lastPointRef.current = point;

    setPanState((ps) => {
      const delta = {
        x: lastPoint.x - point.x,
        y: lastPoint.y - point.y,
      };
      const offset = {
        x: ps.x + delta.x,
        y: ps.y + delta.y,
      };
      return offset;
    });
  }, []);

  const endPan = useCallback(() => {
    document.removeEventListener('mousemove', pan);
    document.removeEventListener('mouseup', endPan);
  }, [pan]);

  const startMousePan = useCallback(
    (e: SyntheticMouseEvent) => {
      document.addEventListener('mousemove', pan);
      document.addEventListener('mouseup', endPan);
      lastPointRef.current = { x: e.pageX, y: e.pageY };
    },
    [pan, endPan]
  );

  const startTouchPan = useCallback(
    (e: SyntheticTouchEvent) => {
      document.addEventListener('touchmove', pan);
      document.addEventListener('touchend', endPan);
      lastPointRef.current = { x: e.touches[0].pageX, y: e.touches[0].pageY };
    },
    [pan, endPan]
  );

  return [panState, startMousePan, startTouchPan];
};
