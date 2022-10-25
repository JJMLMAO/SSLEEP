import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';
import CustomDivider from '../../components/CustomDivider/CustomDivider';

const UserProfileScreen = ({navigation}) => {
  const CustomDisplay = ({display_title, display_data}) => {
    return (
      <View
        style={{marginVertical: 6, paddingVertical: 10, borderBottomWidth: 2}}>
        <Text style={styles.profile_title}>{display_title}</Text>
        <Text style={styles.profile_data}>{display_data}</Text>
        <Pressable style={styles.next_icon}>
          <Icon
            name="arrow-forward-ios"
            type="material"
            size={20}
            color="rgba(255, 255, 255, 0.7)"
          />
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.userProfile_root}>
      <View style={styles.userProfile_innercontainer}>
        <CustomDisplay display_title="Name" display_data="bob the builder" />
        <CustomDisplay
          display_title="UMS Email"
          display_data="bi1911XXXX@student.ums.edu.my"
        />
        <CustomDisplay
          display_title="Matric Number"
          display_data="bi1911XXXX"
        />
        <CustomDisplay
          display_title="Gender"
          display_data="Prefer not to say"
        />
        <CustomDisplay display_title="DOB" display_data="21st October 1999" />
        <CustomDisplay display_title="Bedtime" display_data="11:30pm" />
        <Pressable
          onPress={() => {
            alert('logout liao hahaha');
          }}>
          <Text style={styles.profile_logout}>Logout from this account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userProfile_root: {
    flex: 1,
    paddingHorizontal: 35,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  userProfile_innercontainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 8,
    marginVertical: 60,
    height: '85%',
    paddingHorizontal: 15,
  },
  profile_title: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  profile_data: {
    paddingHorizontal: 5,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  next_icon: {
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    top: 20,
  },
  profile_logout: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 45,
  },
});

export default UserProfileScreen;
