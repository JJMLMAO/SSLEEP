import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';
import CustomScreenHeader from '../../components/CustomScreenHeader/CustomScreenHeader';
import CustomButton from '../../components/CustomButton/CustomButton';
import Dropdown_bookmed from '../../components/CustomDropdown/Dropdown_bookmed';
import BookAppointmentScreen from './BookAppointmentScreen';

const BookMedScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.bookmed_root}>
      <CustomScreenHeader header_title="BookMed" />
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
        <Dropdown_bookmed
          bookmed_month="October"
          bookmed_date="09-10-2022"
          bookmed_day="Sunday"
          bookmed_time="3:40pm"
          bookmed_DOC="Strange"
          bookmed_status="CONFIRMED"
          bookmed_details="chest pain"
        />
      </View>
      <View style={styles.bookmed_column3}>
        <Text style={styles.column_title}>Appointment History</Text>
        <Text style={styles.title_desc}>
          Your past appointments will be recorded here.
        </Text>
        <Dropdown_bookmed
          bookmed_month="October"
          bookmed_date="09-10-2022"
          bookmed_day="Sunday"
          bookmed_time="3:40pm"
          bookmed_DOC="Strange"
          bookmed_status="CONFIRMED"
          bookmed_details="chest pain"
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
