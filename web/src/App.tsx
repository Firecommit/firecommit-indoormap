import React, { CSSProperties, useState } from 'react';
import { Canvas, Props as CanvasProps } from './components/Canvas';

import { Point } from './types/Point';
import RoomLayout from './resources/private/roomLayout.jpg';
import User from './resources/user.svg';
import CurrentUser from './resources/currentUser.svg';

export const App = () => {
  const [position, setPosition] = useState<Point>({ x: 300, y: 300 });
  const [mapPosition, setMapPosition] = useState<Point>({ x: 300, y: 300 });
  const userWrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const canvasChildren: CanvasProps['canvasChildren'] = [
    {
      child: (
        <div style={userWrapperStyle}>
          <img src={CurrentUser} alt="CurrentUser" style={{ height: 48 }} />
        </div>
      ),
      key: 'currentUser',
      height: 48,
      width: 48,
      rotate: 0,
      position: { x: position.x, y: position.y },
    },
    {
      child: (
        <div style={userWrapperStyle}>
          <img src={User} alt="User1" style={{ height: 40 }} />
        </div>
      ),
      key: 'user1',
      height: 40,
      width: 40,
      rotate: 90,
      position: { x: 700, y: 200 },
    },
    {
      child: (
        <div style={userWrapperStyle}>
          <img src={User} alt="User2" style={{ height: 40 }} />
        </div>
      ),
      key: 'user2',
      height: 40,
      width: 40,
      rotate: 270,
      position: { x: 300, y: 400 },
    },
    {
      child: (
        <div style={userWrapperStyle}>
          <img src={User} alt="User2" style={{ height: 40 }} />
        </div>
      ),
      key: 'user3',
      height: 40,
      width: 40,
      rotate: 0,
      position: { x: 0, y: 0 },
    },
    {
      child: (
        <div style={{ backgroundColor: 'gray', color: 'white' }}>User1</div>
      ),
      key: 'User1Text',
      height: 50,
      width: 100,
      rotate: 0,
      position: { x: 680, y: 200 },
      anchor: {
        horizontal: 'right',
        vertical: 'bottom',
      },
    },
  ];

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <div>
        <span>currentUser</span>
        <span>{JSON.stringify(position)}</span>
        <button
          type="button"
          onClick={() => setPosition({ x: position.x + 10, y: position.y })}
        >
          +10 x
        </button>
        <button
          type="button"
          onClick={() => setPosition({ x: position.x - 10, y: position.y })}
        >
          -10 x
        </button>
        <button
          type="button"
          onClick={() => setPosition({ x: position.x, y: position.y + 10 })}
        >
          +10 y
        </button>
        <button
          type="button"
          onClick={() => setPosition({ x: position.x, y: position.y - 10 })}
        >
          -10 y
        </button>
      </div>
      <div>
        <span>mapOffset</span>
        <span>{JSON.stringify(mapPosition)}</span>
        <button
          type="button"
          onClick={() =>
            setMapPosition({ x: mapPosition.x + 10, y: mapPosition.y })
          }
        >
          +10 x
        </button>
        <button
          type="button"
          onClick={() =>
            setMapPosition({ x: mapPosition.x - 10, y: mapPosition.y })
          }
        >
          -10 x
        </button>
        <button
          type="button"
          onClick={() =>
            setMapPosition({ x: mapPosition.x, y: mapPosition.y + 10 })
          }
        >
          +10 y
        </button>
        <button
          type="button"
          onClick={() =>
            setMapPosition({ x: mapPosition.x, y: mapPosition.y - 10 })
          }
        >
          -10 y
        </button>
      </div>
      <Canvas
        image={RoomLayout}
        position={mapPosition}
        maxOffset={{ x: 1000, y: 700 }}
        minOffset={{ x: -1500, y: -700 }}
        canvasChildren={canvasChildren}
      />
    </div>
  );
};
