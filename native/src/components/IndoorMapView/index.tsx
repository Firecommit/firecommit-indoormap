import React from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { YOUR_IP_ADDRESS } from '@env';

export const IndoorMapView = () => {
  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    >
      <WebView
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{ uri: `http://${YOUR_IP_ADDRESS}:3000` }}
      />
    </View>
  );
};
