import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  TouchableHighlight,
  Modal,
  Touchable,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DatePickerIOSComponent} from 'react-native';

const DOBPicker = ({textStyle, defaultDate, date, setDate, ...rest}) => {
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
  };

  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate));
      props.onDateChange(selectedDate);
    }
  };

  const onCancelPress = () => {
    setDate(moment(defaultDate));
    setShow(false);
  };

  const onDonePress = () => {
    props.onDateChange(date);
    setShow(false);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode="date"
        minimumDate={
          new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))
        }
        maximumDate={new Date(moment().format('YYYY-MM-DD'))}
        onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
      />
    );
  };

  return (
    <View style={styles.dob_styleroot}>
      <TouchableHighlight
        style={styles.dob_inputstyle}
        activeOpacity={0}
        onPress={() => setShow(true)}>
        <View>
          <Text style={styles.dob_dateText}>
            {date.format('MMMM Do, YYYY')}
          </Text>
          {Platform.OS !== 'ios' && show && renderDatePicker()}
          {Platform.OS === 'ios' && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={show}
              supportedOrientations={['potrait']}
              onRequestClose={() => setShow(false)}>
              <View style={{flex: 1}}>
                <TouchableHighlight
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                  }}
                  activeOpacity={1}
                  visible={show}
                  onPress={() => setShow(false)}>
                  <TouchableHighlight
                    underlayColor={'#FFFFFF'}
                    style={{
                      flex: 1,
                      borderTopColor: '#E9E9E9',
                      borderTopWidth: 1,
                    }}
                    onPress={() => console.log('datepicker clicked')}>
                    <View
                      style={{
                        backgroundColor: '#FFFFFF',
                        height: 256,
                        overflow: 'hidden',
                      }}>
                      <View style={{marginTop: 20}}>{renderDatePicker()}</View>
                      <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={onCancelPress}
                        style={styles.dob_btnCancel}>
                        <Text style={styles.dob_btnText}>Cancel</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={onDonePress}
                        style={styles.dob_btnDone}>
                        <Text style={styles.dob_btnText}>Done</Text>
                      </TouchableHighlight>
                    </View>
                  </TouchableHighlight>
                </TouchableHighlight>
              </View>
            </Modal>
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

DOBPicker.defaultProps = {
  textStyle: {},
  defaultDate: moment(),
  onDateChange: () => {},
};

const styles = StyleSheet.create({
  dob_styleroot: {
    paddingHorizontal: 8,
  },
  dob_dateText: {
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  dob_inputstyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
  },
  dob_btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dob_btnCancel: {
    left: 0,
  },
  dob_btnDone: {
    right: 0,
  },
});

export default DOBPicker;
