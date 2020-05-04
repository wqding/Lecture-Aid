import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomePage from './components/HomePage'
import RecordingsPage from './components/RecordingsPage'
import TestPage from './components/TestPage'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TestPage" component={TestPage} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="RecordingsPage" component={RecordingsPage} options={{title: 'Recordings'}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}