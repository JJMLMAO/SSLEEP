import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Pressable,
} from 'react-native';

import Logo from 'ssleep/assets/images/ssleep_logo.png';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.catchphrase1}>
        Get to know your sleep health and patterns with just a few clicks.
      </Text>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 8,
        }}
      />

      <Text style={styles.screen_title}>Sleep Deprived?</Text>

      <Text style={styles.catchphrase2}>Say no more.</Text>

      <TouchableHighlight
        onPress={() => navigation.navigate('SignUp')}
        underlayColor="white"
        style={styles.buttonHighlight}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>SIGN-UP HERE!</Text>
        </View>
      </TouchableHighlight>

      <Text style={styles.bottomphrase}>Already have an account?</Text>

      <Pressable
        onPress={() => navigation.navigate('Login')}
        underlayColor="white"
        style={styles.loginPhraseHighlight}>
        <Text style={styles.loginPhrase}>Log In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  logo: {
    width: '80%',
    height: '50%',
  },
  catchphrase1: {
    color: 'white',
    fontSize: 18,
    fontWeight: '550',
    textAlign: 'center',
    padding: 5,
  },
  screen_title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    paddingTop: 35,
  },
  catchphrase2: {
    color: 'rgba(131, 178, 225, 1)',
    fontSize: 25,
    fontWeight: '500',
    padding: 10,
    paddingBottom: 40,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(131, 178, 225, 1)',
    marginBottom: 30,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    padding: 10,
    fontSize: 20,
    fontWeight: '400',
  },
  buttonHighlight: {
    width: 300,
    height: 50,
  },
  bottomphrase: {
    paddingTop: 30,
    color: 'white',
    fontWeight: '400',
  },
  loginPhrase: {
    color: 'rgba(131, 178, 225, 1)',
    fontWeight: '500',
  },
  loginPhraseHighlight: {
    //width: 300,
    //height: 50,
  },
});

export default WelcomeScreen;
