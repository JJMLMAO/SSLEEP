import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

import React, {useState} from 'react';

import Logo from 'ssleep/assets/images/ssleep_logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';

const LoginScreen = ({navigation}) => {
  const [matricNo, setmatricNo] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.login_root}>
      <Image source={Logo} style={styles.logo_login} resizeMode="contain" />
      <Text style={styles.matric_title}>Matric No</Text>
      <CustomInput
        placeholder="Enter your matric number"
        value={matricNo}
        setValue={setmatricNo}
      />
      <Text style={styles.pass_title}>Password</Text>
      <CustomInput
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <Pressable
        onPress={() => navigation.navigate('BottomNav')}
        underlayColor="white">
        <Text style={styles.login_text}>Log In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  login_root: {
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  logo_login: {
    width: '55%',
    height: '30%',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 70,
  },
  matric_title: {
    color: 'white',
    textAlign: 'left',
    marginHorizontal: 5,
  },
  pass_title: {
    color: 'white',
    textAlign: 'left',
    marginHorizontal: 5,
  },
  start_text: {
    textAlign: 'center',
    paddingVertical: 50,
    fontSize: 30,
    fontWeight: '500',
    color: 'rgba(131, 178, 225, 1)',
  },
  login_text: {
    marginVertical: 50,
    textAlign: 'center',
    color: 'rgba(131, 178, 225, 1)',
    fontSize: 30,
  },
});

export default LoginScreen;
