import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/base';
import CustomDivider from '../../components/CustomDivider/CustomDivider';
import EncryptedStorage from 'react-native-encrypted-storage';
import {json} from 'express';
import {BASE_URL} from '../../config';

const UserProfileScreen = ({navigation}) => {
  const [profile_info, setProfile_info] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/student/getStudentData`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: userToken,
        },
      });
      if (response.status === 200) {
        console.log('read successfull');
        const json = await response.json();
        setProfile_info(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const ProfileContainer = ({profile_title, profile_data}) => {
    return (
      <View style={styles.content_container}>
        <Text style={styles.content_title}>{profile_title}</Text>
        <Text style={styles.content_data}>{profile_data}</Text>
      </View>
    );
  };

  return (
    <View style={styles.userProfile_root}>
      {profile_info.map((profile, index) => {
        return (
          <View key={index}>
            <ProfileContainer
              profile_title="Name"
              profile_data={profile.student_name}
            />
            <ProfileContainer
              profile_title="UMS Email"
              profile_data={profile.student_email}
            />
            <ProfileContainer
              profile_title="Matric Number"
              profile_data={profile.student_matric}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  userProfile_root: {
    flex: 1,
    paddingHorizontal: 35,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  content_container: {
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
    marginVertical: 15,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  content_title: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
  },
  content_data: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default UserProfileScreen;
