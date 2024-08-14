import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Icon, Overlay} from '@rneui/themed';

import CustomInput from '../../components/CustomInput/CustomInput';
import {AuthContext} from '../../context/AuthContext';
import CustomOverlay from '../../components/CustomOverlay/CustomOverlay';
import EncryptedStorage from 'react-native-encrypted-storage';
import PersonalisationScreen from '../PersonalisationScreen/PersonalisationScreen';
import Moon from 'ssleep/assets/images/moon.png';
import {text} from 'express';
import {TouchableOpacity} from 'react-native';
import {BASE_URL} from '../../config';

const HomeScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  //const {login} = useContext(AuthContext);
  const {logout} = useContext(AuthContext);
  const [name, setName] = useState([]);

  //load homescreen with useEffect
  useEffect(() => {
    getSName();
  }, []);

  // api call to get name
  const getSName = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/AppStack/getName`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: userToken,
        },
      });
      if (response.status === 200) {
        console.log('read successfully!');
        const json = await response.json();
        setName(json);
        console.log(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ScrollView style={styles.home_root}>
      <View style={styles.icon_container}></View>

      <View style={styles.menu_icon_container}>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          underlayColor="white">
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
                    navigation.navigate('DispPersonalisation');
                    setVisible(!visible);
                  }}>
                  <Text style={styles.overlay_text}>Personalise</Text>
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
                <Pressable
                  onPress={() => {
                    logout();
                  }}>
                  <Text style={styles.overlay_cancel}>Logout</Text>
                </Pressable>
              </View>
            }
          />
        </TouchableOpacity>
      </View>
      {name.map((sname, index) => {
        return (
          <View key={index}>
            <Text style={styles.hello_text}>Hello {sname.student_name}</Text>
            {/* <PersonalisationScreen /> */}
          </View>
        );
      })}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={Moon} style={styles.moon_icon} resizeMode="contain" />
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
          Feel Free to Understand Your Sleeping Health. {`\n`} & {`\n`}Explore
          the features below!
        </Text>
      </View>
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
    fontSize: 25,
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
  moon_icon: {
    height: 300,
    marginVertical: 60,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 2,
  },
});

export default HomeScreen;
