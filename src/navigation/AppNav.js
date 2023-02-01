import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {AuthContext} from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    // IF user token is present, will display appstack and not, -> authstack
    <NavigationContainer>
      {userToken != null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
