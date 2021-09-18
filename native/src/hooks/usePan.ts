import { useRef } from 'react';
import { Animated, PanResponder, PanResponderInstance } from 'react-native';

export const usePan = (): [Animated.ValueXY, PanResponderInstance] => {
  const pan = useRef(new Animated.ValueXY()).current;
  const lastPanPos = useRef({ x: 0, y: 0 });

  const panResponder = useRef<ReturnType<typeof PanResponder.create>>(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: lastPanPos.current.x,
          y: lastPanPos.current.y,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        const x = lastPanPos.current.x + gestureState.dx;
        const y = lastPanPos.current.y + gestureState.dy;
        lastPanPos.current = { x, y };
      },
    })
  ).current;

  return [pan, panResponder];
};
