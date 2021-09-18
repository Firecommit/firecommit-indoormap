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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { MapScreen } from './src/map';
import { Canvas } from './src/components/Canvas/index';
import { UsePanExample } from './src/examples/UsePanExample';

export const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="UsePanExample"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Canvas" component={Canvas} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="UsePanExample" component={UsePanExample} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
