import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {Icon, Overlay} from '@rneui/themed';

import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomOverlay from '../../components/CustomOverlay/CustomOverlay';

const HomeScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  return (
    <ScrollView style={styles.home_root}>
      <View style={styles.icon_container}>
        <Pressable
          onPress={() => alert('this one pegi setting')}
          underlayColor="white">
          <Icon
            name="settings"
            type="material"
            size={40}
            color="#83B2E1"
            style={styles.setting_icon}
          />
        </Pressable>
        <Pressable
          onPress={() => alert('this one pegi notification')}
          underlayColor="white">
          <Icon
            name="notifications-outline"
            type="ionicon"
            size={40}
            color="#83B2E1"
            style={styles.notification_icon}
          />
        </Pressable>
        <Pressable
          onPress={() => alert('this one pegi forum')}
          underlayColor="white">
          <Icon
            name="forum"
            type="material"
            size={40}
            color="#83B2E1"
            style={styles.forum_icon}
          />
        </Pressable>
      </View>

      <View style={styles.menu_icon_container}>
        <Pressable onPress={() => setVisible(!visible)} underlayColor="white">
          <Icon
            name="menu"
            type="material"
            size={45}
            color="#83B2E1"
            style={styles.menu_icon}
          />
          <CustomOverlay
            visible={visible}
            togglebackdrop={() => setVisible(!visible)}
            overlayContent={
              <View style={styles.menuoverlay_root}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('UserProfile');
                    setVisible(!visible);
                  }}>
                  <Text style={styles.overlay_text}>Profile</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate('HelpDesk');
                    setVisible(!visible);
                  }}>
                  <Text style={styles.overlay_text}>HelpDesk</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Feedback');
                    setVisible(!visible);
                  }}>
                  <Text style={styles.overlay_text}>Feedback</Text>
                </Pressable>
                <Pressable onPress={() => setVisible(!visible)}>
                  <Text style={styles.overlay_cancel}>Cancel</Text>
                </Pressable>
              </View>
            }
          />
        </Pressable>
      </View>

      <Text style={styles.hello_text}>Hello User</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  hello_text: {
    color: 'white',
    fontSize: 35,
    padding: 10,
  },
  icon_container: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  setting_icon: {
    paddingHorizontal: 5,
  },
  notification_icon: {
    paddingHorizontal: 5,
  },
  forum_icon: {
    paddingHorizontal: 5,
  },
  menu_icon_container: {
    position: 'absolute',
    right: 10,
    paddingVertical: 20,
  },
  menuoverlay_root: {
    marginVertical: 10,
    marginHorizontal: 100,
  },
  overlay_text: {
    textAlign: 'center',
    fontSize: 22,
    paddingVertical: 40,
    color: 'black',
  },
  overlay_cancel: {
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 20,
    color: 'black',
  },
});

export default HomeScreen;
