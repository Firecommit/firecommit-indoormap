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

export const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="Map"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
