import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {Icon, BottomSheet} from '@rneui/base';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomSlider from '../../components/CustomSlider/CustomSlider';
import moment from 'moment';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BASE_URL} from '../../config';

const BookAppointmentScreen = ({navigation}) => {
  const [book_details, setBook_details] = useState('');
  const [date, setDate] = useState(new Date()); //datepicker
  const [open, setOpen] = useState(false); //datepicker
  const [time, setTime] = useState();
  const [openT, setOpenT] = useState(false); //timepicker
  const [touchAnswer, setTouchAnswer] = useState(
    'Please choose your preferred date.',
  );
  const [touchAnswerT, setTouchAnswerT] = useState(
    'Please choose your preferred time.',
  );

  const onRequestBooking = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const body = {
        b_date: date.toISOString().split('T')[0],
        b_time: time.toISOString().split('T')[1].split('.')[0],
        b_details: book_details,
      };
      const response = await fetch(`${BASE_URL}/bookmed/reqbooking`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: userToken,
        },
        body: JSON.stringify(body),
      });
      if (response === 200) {
        console.log('booking requested!');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const AppDatePicker = ({onConfirm, type}) => {
    return (
      <>
        <DatePicker
          modal
          open={open}
          date={date}
          mode={type}
          minimumDate={date}
          onConfirm={onConfirm}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </>
    );
  };

  const AppTimePicker = ({type, onConfirmT}) => {
    return (
      <>
        <DatePicker
          modal
          open={openT}
          mode={type}
          date={date}
          onConfirm={onConfirmT}
          onCancel={() => {
            setOpenT(false);
          }}
        />
      </>
    );
  };
  const CustomTouchable = ({
    touch_title,
    touch_answer,
    touchcontainer_style,
    onPress,
  }) => {
    return (
      <View style={touchcontainer_style}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.appointment_container}>
            <Text style={styles.touchable_title}>{touch_title}</Text>
            <Text style={styles.touchable_answer}>{touch_answer}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.appointment_root}>
      <View style={styles.appointment_header}>
        <Text style={styles.appointment_title}>Book an Appointment</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="x"
            type="octicon"
            size={30}
            color="#83B2E1"
            style={styles.cancel_icon}
          />
        </TouchableOpacity>
      </View>
      <CustomTouchable
        touch_title="Date"
        touch_answer={touchAnswer}
        touchcontainer_style={
          (style = {
            paddingBottom: 20,
          })
        }
        onPress={() => {
          setOpen(true);
        }}
      />
      <AppDatePicker
        type="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setTouchAnswer(moment(date).format('DD-MM-YYYY'));
          console.log(date.toISOString().split('T')[0]);
        }}
      />
      <CustomTouchable
        touch_title="Time"
        touch_answer={touchAnswerT}
        touchcontainer_style={(style = {paddingBottom: 20})}
        onPress={() => {
          setOpenT(true);
        }}
      />
      <AppTimePicker
        type="time"
        onConfirmT={time => {
          setOpenT(false);
          setTime(time);
          // console.log(time.toISOString().split('T')[1]);
          setTouchAnswerT(moment(time).format('hh:mm A'));
          console.log(moment(time).format('hh:mm A'));
        }}
      />

      <View style={styles.appointment_container}>
        <Text style={styles.touchable_title}>Details</Text>
        <Text style={styles.touchable_answer}>
          Please provide the details of the appointment
        </Text>
      </View>
      <CustomInput
        value={book_details}
        setValue={setBook_details}
        multiline={true}
        numberOfLines={8}
        customstyle_input={{
          backgroundColor: 'rgba(1, 1, 24, 1)',
          textAlignVertical: 'top',
          color: 'white',
          borderColor: 'rgba(255, 255, 255, 0.3)',
        }}
      />

      <CustomButton
        text="Request Booking"
        underlayColor="white"
        buttonView={{
          paddingVertical: 30,
        }}
        customStyle={{
          color: 'black',
        }}
        onPress={() => {
          onRequestBooking();
          alert('Please wait for you appointment booking to be confirmed.');
          navigation.goBack();
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appointment_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  appointment_title: {
    color: 'white',
    fontSize: 26,
  },
  appointment_header: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointment_container: {
    backgroundColor: 'rgba(1, 1, 24, 1)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  touchable_title: {
    color: 'white',
    paddingVertical: 6,
    fontSize: 16,
  },
  touchable_answer: {
    color: 'grey',
    fontSize: 12,
  },
});

export default BookAppointmentScreen;
