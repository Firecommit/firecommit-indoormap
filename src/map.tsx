import React from 'react';
import { View, Text } from 'react-native';
import { IndoorMapView } from './components/IndoorMapView/IndoorMapView';

export const MapScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <IndoorMapView />
    </View>
  );
};
