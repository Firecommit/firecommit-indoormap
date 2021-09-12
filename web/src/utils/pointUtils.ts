import { Point } from '../types/Point';

export const pointDistance = (p1: Point, p2: Point) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

export const midPoint = (p1: Point, p2: Point): Point => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2,
});

export const pointSum = (p1: Point, p2: Point): Point => {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
  };
};

export const pointDiff = (p1: Point, p2: Point) => {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  };
};

export const pointDivision = (p: Point, scale: number): Point => ({
  x: p.x / scale,
  y: p.y / scale,
});
