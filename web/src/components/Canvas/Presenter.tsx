import React, { CSSProperties } from 'react';
import { Point } from '../../types/Point';
import Grid from '../../resources/grid.svg';

type Props = {
  image: string;
  scale: number;
  adjustedOffset: Point;
  buffer: Point;
  startMousePan: (e: React.MouseEvent) => void;
  startTouchPan: (e: React.TouchEvent) => void;
};

const CanvasInnerPresenter = (
  { image, scale, adjustedOffset, buffer, startMousePan, startTouchPan }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const rootStyle: CSSProperties = {
    position: 'relative',
    height: '100%',
    width: '100%',
  };
  const canvasStyle: CSSProperties = {
    transform: `scale(${scale})`,
    backgroundImage: `url(${image})`,
    backgroundPosition: `${-adjustedOffset.x}px ${-adjustedOffset.y}px`,
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    bottom: buffer.y,
    left: buffer.x,
    right: buffer.x,
    top: buffer.y,
  };
  const gridStyle: CSSProperties = {
    ...canvasStyle,
    backgroundImage: `url(${Grid})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 100,
    opacity: 0.2,
  };
  return (
    <div
      role="none"
      ref={ref}
      onMouseDown={startMousePan}
      onTouchStart={startTouchPan}
      style={rootStyle}
    >
      <div style={canvasStyle} />
      <div style={gridStyle} />
    </div>
  );
};

export const CanvasPresenter = React.forwardRef(CanvasInnerPresenter);
