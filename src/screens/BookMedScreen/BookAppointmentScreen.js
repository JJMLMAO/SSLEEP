import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Icon, BottomSheet} from '@rneui/base';
import Slider from '@react-native-community/slider';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';

const BookAppointmentScreen = () => {
  const [book_details, setBook_details] = useState('');
  const [isVisible, setIsVisible] = useState(false); //bottomsheet
  // const [value, setValue] = useState(0); // value for slider

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

  const CustomSlider = ({}) => {
    return (
      <Slider
        style={{width: '90%', height: 50, alignSelf: 'center'}}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="blue"></Slider>
    );
  };

  return (
    <ScrollView style={styles.appointment_root}>
      <View style={styles.appointment_header}>
        <Text style={styles.appointment_title}>Book an Appointment</Text>
        <Icon
          name="x"
          type="octicon"
          size={30}
          color="#83B2E1"
          style={styles.cancel_icon}
        />
      </View>
      <CustomTouchable
        touch_title="Date"
        touch_answer="Please choose your preferred date."
        touchcontainer_style={
          (style = {
            paddingBottom: 20,
          })
        }
      />
      <CustomTouchable
        touch_title="Time"
        touch_answer="Please choose your preferred time."
        touchcontainer_style={(style = {paddingBottom: 20})}
        onPress={() => {
          setIsVisible(true);
        }}
      />
      <BottomSheet
        isVisible={isVisible}
        backdropStyle={{backgroundColor: 'rgba(1, 1, 24, 0.3)'}}
        onBackdropPress={() => setIsVisible(false)}>
        <View style={{backgroundColor: 'rgba(17, 17, 38, 0.95)'}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              textAlignVertical: 'top',
              marginVertical: 20,
            }}>
            Move the slider to choose your preferred time.
          </Text>
          <CustomSlider />
          <Text style={{color: 'white', textAlign: 'center'}}>Time: </Text>

          <CustomButton
            text="Confirm"
            customStyle={{
              marginHorizontal: 25,
              marginVertical: 40,
            }}
          />
        </View>
      </BottomSheet>

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
          alert('hello');
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
