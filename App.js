import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

//const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
