import { Point } from '../types/Point';

export const getTwoPointDistance = (p1: Point, p2: Point) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

export const getMidPoint = (p1: Point, p2: Point): Point => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2,
});

export const getScale = (p: Point, scale: number): Point => ({
  x: p.x / scale,
  y: p.y / scale,
});
