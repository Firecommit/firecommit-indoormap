/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { View, StatusBar } from 'react-native';
import { MapScreen } from './src/map';

export const App = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <StatusBar barStyle="light-content" />
      <MapScreen />
    </View>
  );
};
