import React, { CSSProperties } from 'react';
import { Point } from '../../types/Point';
import Grid from '../../resources/grid.svg';

export type CanvasChild = {
  child: React.ReactElement;
  key: string;
  height: number;
  width: number;
  rotate: number;
  position: Point;
  translate?: {
    horizontal: 'center' | 'left' | 'right';
    vertical: 'center' | 'top' | 'bottom';
  };
};

export type OuterProps = {
  image: string;
  canvasChildren?: Array<CanvasChild>;
};

type Props = OuterProps & {
  scale: number;
  adjustedOffset: Point;
  buffer: Point;
  startMousePan: (e: React.MouseEvent) => void;
  startTouchPan: (e: React.TouchEvent) => void;
};

const CanvasInnerPresenter = (
  {
    image,
    scale,
    adjustedOffset,
    buffer,
    canvasChildren,
    startMousePan,
    startTouchPan,
  }: Props,
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

  const children: React.ReactNode = canvasChildren?.map(
    ({ child, key, height, width, rotate, position, translate }) => {
      let translateX = 0;
      let translateY = 0;
      if (!translate || translate.horizontal === 'center')
        translateX = width / 2;
      else if (translate.horizontal === 'left') translateX = 0;
      else if (translate.horizontal === 'right') translateX = width;
      if (!translate || translate.vertical === 'center')
        translateY = height / 2;
      else if (translate.vertical === 'top') translateY = 0;
      else if (translate.vertical === 'bottom') translateY = height;
      const additionalProps: { style: CSSProperties; key: string } = {
        style: {
          ...child.props.style,
          height,
          width,
          position: 'absolute',
          left: (position.x - adjustedOffset.x) * scale,
          top: (position.y - adjustedOffset.y) * scale,
          transform: `translate(-${translateX}px, -${translateY}px) rotate(${rotate}deg)`,
        },
        key,
      };
      return React.cloneElement(child, additionalProps);
    }
  ) || <></>;

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
      {children}
    </div>
  );
};

export const CanvasPresenter = React.forwardRef(CanvasInnerPresenter);
