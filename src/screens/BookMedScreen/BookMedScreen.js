import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/base';
import CustomScreenHeader from '../../components/CustomScreenHeader/CustomScreenHeader';
import CustomButton from '../../components/CustomButton/CustomButton';
import Dropdown_bookmed from '../../components/CustomDropdown/Dropdown_bookmed';
import BookAppointmentScreen from './BookAppointmentScreen';
import moment from 'moment';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useIsFocused} from '@react-navigation/native';

const BookMedScreen = ({navigation}) => {
  const [appointment, setAppointment] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAppointmentData();
    }
  }, [isFocused]);

  const getAppointmentData = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const response = await fetch(
        `http://10.115.91.134:5000/bookmed/getBookdata`,
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
        setAppointment(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <ScrollView style={styles.bookmed_root}>
      <CustomScreenHeader
        header_title="BookMed"
        onPress={
          (onPress = () => {
            navigation.goBack();
          })
        }
      />
      <View style={styles.bookmed_column1}>
        <Text style={styles.column_title}>Book Appointments with PRW</Text>
        <Text style={styles.title_desc}>
          Do keep in mind that bookings are not instantaneous as it requires
          confirmation and approval from PRW.
        </Text>
        <CustomButton
          text="Book Now"
          underlayColor="white"
          onPress={() => navigation.navigate('Appointment')}
          customStyle={{
            width: '95%',
            alignSelf: 'center',
          }}
          buttonView={{
            paddingVertical: 10,
          }}
        />
      </View>
      <View style={styles.bookmed_column2}>
        <Text style={styles.column_title}>Upcoming Appointments</Text>
        <Text style={styles.title_desc}>
          Your latest appointments will appear here sorted by month.
        </Text>
        {appointment.map((bm_appointment, index) => {
          return (
            <Dropdown_bookmed
              key={index}
              bookmed_date={moment(bm_appointment.appointment_date).format(
                'DD-MM-YYYY',
              )}
              bookmed_time={bm_appointment.appointment_time}
              bookmed_DOC="N/A"
              bookmed_status="CONFIRMED"
              bookmed_details={bm_appointment.appointment_details}
            />
          );
        })}
      </View>
      <View style={styles.bookmed_column3}>
        <Text style={styles.column_title}>Appointment History</Text>
        <Text style={styles.title_desc}>
          Your past appointments will be recorded here.
        </Text>
        <Dropdown_bookmed
          bookmed_date="N/A"
          bookmed_time="N/A"
          bookmed_status="N/A"
          bookmed_details="N/A"
          bookmed_DOC="N/A"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookmed_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  bookmed_column1: {
    backgroundColor: 'rgba(1, 1, 24, 0.5)',
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  column_title: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 16,
  },
  title_desc: {
    color: 'grey',
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  bookbutton_container: {
    paddingVertical: 10,
  },
  bookmed_column2: {
    backgroundColor: 'rgba(1, 1, 24, 0.5)',
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    marginVertical: 10,
  },
  bookmed_column3: {
    backgroundColor: 'rgba(1, 1, 24, 0.5)',
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default BookMedScreen;
