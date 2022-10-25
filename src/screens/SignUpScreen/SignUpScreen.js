import { View,
         Text,
         StyleSheet,
         Pressable,
        } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'

const SignUpScreen = ({navigation}) => {

const [Name, setName] = useState('');
const [emailAdd, setemailAdd] = useState('');
const [matricNo, setmatricNo] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setconfPassword] = useState('');

  return (
    <View style={styles.signup_root}>
      <Text style={styles.signup_text}>SIGN UP</Text>
      <View style={styles.signupInput_container}>
        <Text style={styles.signup_inputname}>Your Name</Text>
          <CustomInput
            placeholder='Enter your name'
            value={Name}
            setValue={setName}
            />
        <Text style={styles.signup_inputname}>UMS Email</Text>
          <CustomInput
            placeholder='Enter your UMS email address'
            value={emailAdd}
            setValue={setemailAdd}
          />
       <Text style={styles.signup_inputname}>Matric No</Text>
          <CustomInput
            placeholder='Enter your Matric Number'
            value={matricNo}
            setValue={setmatricNo}
          />
       <Text style={styles.signup_inputname}>Password</Text>
          <CustomInput 
            placeholder='Enter your password'
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
       <Text style={styles.signup_inputname}>Confirmed Password</Text>
          <CustomInput
            placeholder='Enter your confirmed password'
            value={confirmPassword}
            setValue={setconfPassword}
            secureTextEntry={true}
          />
      </View>
      <Pressable
        onPress={() => navigation.navigate('Personalisation')}
      >
        <Text style={styles.signup_next}>
            Next
        </Text>
      </Pressable>

    </View>
  )
}

const styles=StyleSheet.create({

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
      
    
    }
})

export default SignUpScreen