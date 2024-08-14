import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import moment from 'moment';
import Dropdown_gender from '../../components/CustomDropdown/Dropdown_gender';
import Dropdown_bedtime from '../../components/CustomDropdown/Dropdown_bedtime';
import Dropdown_hoursSlept from '../../components/CustomDropdown/Dropdown_hoursSlept';
import DOBPicker from '../../components/CustomDatePicker/DOBPicker';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BASE_URL} from '../../config';

const PersonalisationScreen = ({navigation}) => {
  const [gender, setGender] = useState('Choose your Gender'); //gender
  const [date, setDate] = useState(moment('1985-01-01')); //dob
  const [hoursSlept, sethoursSlept] = useState(
    'Choose the amount of hours slept',
  ); //hours slept
  const [bedTime, setBedtime] = useState('Choose your usual bedtime'); //bedtime

  const onPersonalise = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const body = {
        list: gender,
        date: date,
        list_hourslept: hoursSlept,
        list_bedtime: bedTime,
      };
      //console.log(typeof date);
      const response = await fetch(
        `${BASE_URL}/personalisation/personalisations`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: userToken,
          },
          body: JSON.stringify(body),
        },
      );
      if (response.status === 200) {
        // const json = await response.json();
        console.log('success!');
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <ScrollView style={styles.personalisation_root}>
      <Text style={styles.personalisation_text}>PERSONALISATION</Text>
      <View style={styles.personalisation_inputcontainer}>
        <Text style={styles.personalisation_inputname}>Your Gender</Text>
        <Dropdown_gender gender={gender} setGender={setGender} />
        <Text style={styles.personalisation_inputname}>Your DOB</Text>
        <DOBPicker
          textStyle={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          defaultDate="1985-01-01"
          date={date}
          setDate={setDate}
          // onDateChange={() => console.log('Date change: ' + value)}
        />
        <Text style={styles.personalisation_inputname}>
          Amount of hours slept (daily)
        </Text>
        <Dropdown_hoursSlept
          hoursSlept={hoursSlept}
          sethoursSlept={sethoursSlept}
        />
        <Text style={styles.personalisation_inputname}>Bedtime</Text>
        <Dropdown_bedtime bedTime={bedTime} setBedtime={setBedtime} />
      </View>

      <Pressable
        onPress={() => {
          onPersonalise();
          navigation.navigate('BottomNav');
        }}>
        <Text style={styles.personalisation_confirm}>Confirm</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  personalisation_root: {
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  personalisation_text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 35,
  },
  personalisation_inputname: {
    color: 'white',
    paddingHorizontal: 8,
  },
  personalisation_inputcontainer: {
    paddingVertical: 40,
  },
  personalisation_confirm: {
    color: 'rgba(131, 178, 225, 1)',
    paddingVertical: 25,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '400',
  },
});

export default PersonalisationScreen;
