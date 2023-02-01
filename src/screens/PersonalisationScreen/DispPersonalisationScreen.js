import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {React, useState} from 'react';
import {Pressable} from 'react-native';
import {useEffect} from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';

const DispPersonalisationScreen = ({navigation}) => {
  const [gender, setGender] = useState('User gender'); // gender
  const [date, setDate] = useState('User dob'); // dob
  const [sleephours, setSleephours] = useState('USer sleeping hours'); // sleeping hours
  const [bedtime, setBedtime] = useState('User bedtime'); // bedtime

  useEffect(() => {
    getPersonalisation();
  }, []);

  const getPersonalisation = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');

      const response = await fetch(
        `http://10.115.91.134:5000/personalisation/getpersonalisationdata`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: userToken,
          },
        },
      );
      if (response.status === 200) {
        const json = await response.json();
        //console.log(json);
        setGender(json.p_gender);
        setDate(json.p_dob);
        setSleephours(json.p_sleephours);
        setBedtime(json.p_bedtime);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const PersonaliseContainer = ({title, data}) => {
    return (
      <>
        <View style={styles.content_container}>
          <Text style={styles.content_title}>{title}</Text>
          <Text style={styles.content_data}>{data}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={styles.DisPersonalise_root}>
      <Text style={styles.personalise_description}>
        The personalisation data will be displayed here.
      </Text>
      <PersonaliseContainer title="Gender" data={gender} />
      <PersonaliseContainer title="DOB" data={date.slice(0, 10)} />
      <PersonaliseContainer title="Sleeping Hours" data={sleephours} />
      <PersonaliseContainer title="Bedtime" data={bedtime} />

      <View>
        <CustomButton
          text="Personalise"
          underlayColor="white"
          onPress={() => {
            navigation.navigate('Personalisation');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DisPersonalise_root: {
    flex: 1,
    paddingHorizontal: 35,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  personalise_description: {
    color: 'white',
    marginVertical: 8,
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
  personalisation_confirm: {
    color: 'rgba(131, 178, 225, 1)',
    paddingVertical: 25,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '400',
  },
});

export default DispPersonalisationScreen;
