import React, { useState } from 'react';
import { Canvas } from './components/Canvas';

import { Point } from './types/Point';
import RoomLayout from './resources/roomLayout.jpg';

export const App = () => {
  const [position, setPosition] = useState<Point>({ x: 500, y: 500 });
  const [showMap, setShowMap] = useState<boolean>(true);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <input
        type="text"
        value={position.x}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPosition({
            x: parseInt(e.target.value, 10),
            y: position.y,
          })
        }
      />
      <button
        type="button"
        onClick={() => {
          setPosition({
            x: position.x + 10,
            y: position.y,
          });
        }}
      >
        increase x
      </button>
      <button
        type="button"
        onClick={() => {
          setPosition({
            x: position.x - 10,
            y: position.y,
          });
        }}
      >
        decrease x
      </button>
      <input
        type="text"
        value={position.y}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPosition({
            x: position.x,
            y: parseInt(e.target.value, 10),
          })
        }
      />
      <button
        type="button"
        onClick={() => {
          setPosition({
            x: position.x,
            y: position.y + 10,
          });
        }}
      >
        increase y
      </button>
      <button
        type="button"
        onClick={() => {
          setPosition({
            x: position.x,
            y: position.y - 10,
          });
        }}
      >
        decrease y
      </button>
      <button
        type="button"
        onClick={() => {
          setShowMap(false);
          setTimeout(() => setShowMap(true), 100);
        }}
      >
        Reload
      </button>
      {showMap && (
        <Canvas
          image={RoomLayout}
          position={position}
          maxOffset={{ x: 1000, y: 700 }}
          minOffset={{ x: -1500, y: -700 }}
        />
      )}
    </div>
  );
};
