import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import PersonalisationScreen from './src/screens/PersonalisationScreen/PersonalisationScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import BookMedScreen from './src/screens/BookMedScreen/BookMedScreen';
import TrackScreen from './src/screens/TrackScreen/TrackScreen';
import DetectScreen from './src/screens/DetectScreen/DetectScreen';
import DiaryScreen from './src/screens/DiaryScreen/DiaryScreen';
import ForumScreen from './src/screens/ForumScreen/ForumScreen';
import BottomNavBar from './src/components/BottomNavBar/BottomNavBar';
import UserProfileScreen from './src/screens/UserProfileScreen/UserProfileScreen';
import HelpDeskScreen from './src/screens/HelpDeskScreen/HelpDeskScreen';
import FeedbackScreen from './src/screens/FeedbackScreen/FeedbackScreen';
import BookAppointmentScreen from './src/screens/BookMedScreen/BookAppointmentScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgba(1, 1, 24, 0.83)',
          },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Personalisation"
          component={PersonalisationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomNav"
          component={BottomNavBar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{
            title: 'Profile',
          }}
        />
        <Stack.Screen
          name="HelpDesk"
          component={HelpDeskScreen}
          options={{
            title: 'Helpdesk',
          }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{
            title: 'Feedback',
          }}
        />
        <Stack.Screen
          name="Appointment"
          component={BookAppointmentScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
