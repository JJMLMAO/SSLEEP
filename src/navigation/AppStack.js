import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PersonalisationScreen from '../screens/PersonalisationScreen/PersonalisationScreen';
import BookMedScreen from '../screens/BookMedScreen/BookMedScreen';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import UserProfileScreen from '../screens/UserProfileScreen/UserProfileScreen';
import DispPersonalisationScreen from '../screens/PersonalisationScreen/DispPersonalisationScreen';
import HelpDeskScreen from '../screens/HelpDeskScreen/HelpDeskScreen';
import FeedbackScreen from '../screens/FeedbackScreen/FeedbackScreen';
import BookAppointmentScreen from '../screens/BookMedScreen/BookAppointmentScreen';
import SleepAlarmScreen from '../screens/TrackScreen/SleepAlarmScreen';
import CreateLogsScreen from '../screens/DiaryScreen/CreateLogsScreen';
// import HomeScreen from './src/screens/HomeScreen/HomeScreen';
// import TrackScreen from './src/screens/TrackScreen/TrackScreen';
// import DetectScreen from './src/screens/DetectScreen/DetectScreen';
// import DiaryScreen from './src/screens/DiaryScreen/DiaryScreen';
// import ForumScreen from './src/screens/ForumScreen/ForumScreen';

import {AuthContext} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="BottomNav"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(1, 1, 24, 0.83)',
        },
        headerShadowVisible: false,
        headerTintColor: 'white',
      }}>
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
        name="DispPersonalisation"
        component={DispPersonalisationScreen}
        options={{
          title: 'Personalise',
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
      <Stack.Screen
        name="BookMed"
        component={BookMedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SleepAlarm"
        component={SleepAlarmScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateLogs"
        component={CreateLogsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
