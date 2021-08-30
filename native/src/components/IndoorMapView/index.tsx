import React from 'react';
import { WebView } from 'react-native-webview';
import { YOUR_IP_ADDRESS } from '@env';

export const IndoorMapView = () => {
  return (
    <WebView
      style={{ flex: 1 }}
      originWhitelist={['*']}
      source={{ uri: `http://${YOUR_IP_ADDRESS}:3000` }}
    />
  );
};
