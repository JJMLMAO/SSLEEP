import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import {BASE_URL} from '../../config';

const SignUpScreen = ({navigation}) => {
  const [Name, setName] = useState('');
  const [emailAdd, setemailAdd] = useState('');
  const [matricNo, setmatricNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfPassword] = useState('');

  const onSignUp = async () => {
    try {
      const body = {
        student_email: emailAdd,
        student_password: password,
        student_matric: matricNo,
        student_name: Name,
      };
      const response = await fetch(`http://10.115.91.134:5000/auth/signups`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        await response.json();
        console.log('User has been successfully registered !');
        Alert.alert('Your account is registered, please proceed to login.');
        navigation.navigate('Login');
      } else {
        const errmessage = await response.text();
        console.log('Wrong credentials!');
        alert(errmessage);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ScrollView style={styles.signup_root}>
      <Text style={styles.signup_text}>SIGN UP</Text>
      <View style={styles.signupInput_container}>
        <Text style={styles.signup_inputname}>UMS Email</Text>
        <CustomInput
          placeholder="Enter your UMS email address"
          value={emailAdd}
          setValue={setemailAdd}
        />
        <Text style={styles.signup_inputname}>Password</Text>
        <CustomInput
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <Text style={styles.signup_inputname}>Matric No</Text>
        <CustomInput
          placeholder="Enter your Matric Number"
          value={matricNo}
          setValue={setmatricNo}
        />
        <Text style={styles.signup_inputname}>Your Name</Text>
        <CustomInput
          placeholder="Enter your name"
          value={Name}
          setValue={setName}
        />

        <Text style={styles.signup_inputname}>Confirmed Password</Text>
        <CustomInput
          placeholder="Enter your confirmed password"
          value={confirmPassword}
          setValue={setconfPassword}
          secureTextEntry={true}
        />
        <Pressable
          onPress={() => {
            onSignUp();
          }}>
          <Text style={styles.signup_next}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signup_root: {
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  signup_text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 35,
  },
  signupInput_container: {
    paddingVertical: 40,
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },
  signup_next: {
    color: 'rgba(131, 178, 225, 1)',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '400',
  },
  signup_inputname: {
    color: 'white',
    paddingHorizontal: 8,
  },
});

export default SignUpScreen;
