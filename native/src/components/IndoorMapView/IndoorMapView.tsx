import React from 'react';
import { WebView } from 'react-native-webview';

export const IndoorMapView = () => {
  return (
    <WebView
      style={{ flex: 1 }}
      originWhitelist={['*']}
      source={{ uri: 'http://localhost:3000' }}
    />
  );
};
