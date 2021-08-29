import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import html from '../../../assets/webview/index.html';

export const IndoorMapView = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1, marginTop: 20 }}
        originWhitelist={['*']}
        source={html}
      />
    </View>
  );
};
