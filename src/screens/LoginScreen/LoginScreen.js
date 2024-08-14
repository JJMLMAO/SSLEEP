import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import React, {useState, useContext} from 'react';

import Logo from 'ssleep/assets/images/ssleep_logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import {AuthContext} from '../../context/AuthContext';
import EncryptedStorage from 'react-native-encrypted-storage';

import {BASE_URL} from '../../config';

const LoginScreen = ({navigation}) => {
  const [emailAdd, setemailAdd] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  // const [check, setCheck] = useState([]);

  const onLogin = async () => {
    try {
      const body = {
        student_email: emailAdd,
        student_password: password,
      };

      const response = await fetch(`${BASE_URL}/auth/logins`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        const json = await response.json();
        login(json.token);
        console.log(json);
      } else {
        const errmessage = await response.text();
        console.log('Wrong credentials!');
        alert(errmessage);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // api call to check user personalisation
  // const checkPersonalistion = async () => {
  //   try {
  //     let userToken = await EncryptedStorage.getItem('userToken');
  //     const response = await fetch(
  //       `http://192.168.1.10:5000/personalisation/verifyPersonalisation`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           token: userToken,
  //         },
  //       },
  //     );
  //     if (response.status === 200) {
  //       console.log('read successfully!');
  //       const json = await response.json();
  //       console.log(json);
  //       setCheck(json);
  //       if (check.isPersonalised !== t) {
  //         console.log('haha');
  //       } else {
  //         console.log('hehe');
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  return (
    <View style={styles.login_root}>
      <Image source={Logo} style={styles.logo_login} resizeMode="contain" />
      <Text style={styles.matric_title}>Student Email</Text>
      <CustomInput
        placeholder="Enter your student email"
        value={emailAdd}
        setValue={setemailAdd}
      />
      <Text style={styles.pass_title}>Password</Text>
      <CustomInput
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => {
          onLogin();
          // checkPersonalistion();
        }}
        underlayColor="white">
        <Text style={styles.login_text}>Log In</Text>
      </TouchableOpacity>
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
    //marginVertical: 50,
    textAlign: 'center',
    color: 'rgba(131, 178, 225, 1)',
    fontSize: 30,
  },
});

export default LoginScreen;
