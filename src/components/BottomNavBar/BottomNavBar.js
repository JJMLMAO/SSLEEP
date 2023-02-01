import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/base/dist/Icon';
import {NavigationContainer} from '@react-navigation/native';
import BookMedScreen from '../../screens/BookMedScreen/BookMedScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import TrackScreen from '../../screens/TrackScreen/TrackScreen';
import DiaryScreen from '../../screens/DiaryScreen/DiaryScreen';
import DetectScreen from '../../screens/DetectScreen/DetectScreen';

const BottomNavBar = ({navigation}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          height: '7%',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Icon
              name="home"
              type="material"
              size={30}
              color="#83B2E1"
              style={styles.home_icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookMed"
        component={BookMedScreen}
        options={{
          title: 'BookMed',
          tabBarIcon: () => (
            <Icon
              name="local-hospital"
              type="material"
              size={30}
              color="#83B2E1"
              style={styles.bookmed_icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Detect"
        component={DetectScreen}
        options={{
          title: 'Detect',
          tabBarIcon: () => (
            <Icon
              name="face"
              type="material"
              size={30}
              color="#83B2E1"
              style={styles.diary_icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          title: 'Diary',
          tabBarIcon: () => (
            <Icon
              name="menu-book"
              type="material"
              size={30}
              color="#83B2E1"
              style={styles.diary_icon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{
          title: 'Track',
          tabBarIcon: () => (
            <Icon
              name="track-changes"
              type="material"
              size={30}
              color="#83B2E1"
              style={styles.track_icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomNavBar;
