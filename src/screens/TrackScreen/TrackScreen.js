import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';

import CustomScreenHeader from '../../components/CustomScreenHeader/CustomScreenHeader';
import CustomSwitch from '../../components/TrackComponents/CustomSwitch';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomAlarm from '../../components/CustomAlarm/CustomAlarm';
import BottomSheet_day from '../../components/CustomBottomSheet/BottomSheet_day';
import Dropdown_hours from '../../components/CustomBottomSheet/Dropdown_hours';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

const TrackScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [day, setDay] = useState(
    'Please choose the day that you wish to entry.',
  );
  const [hours, setHours] = useState(
    'Please indicate how many hours did you sleep on that day.',
  );
  const [trackdata, setTrackdata] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getTrackData();
    }
  }, [isFocused]);

  // to get data from database
  const getTrackData = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const response = await fetch(
        `http://10.115.91.134:5000/track/getEntryTrack`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: userToken,
          },
        },
      );
      if (response.status === 200) {
        console.log('read successful');
        const json = await response.json();
        setTrackdata(json);
        console.log(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // to handle it when the add entry button is clicked
  const handleModalSubmit = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const body = {
        day_entry: day,
        hours_entry: hours,
      };
      const response = await fetch(
        `http://10.115.91.134:5000/track/onEntryTrack`,
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
        console.log('success entry');
        navigation.navigate('BottomNav', {screen: 'Track'});
      }
    } catch (err) {
      console.log('success!');
    }
    setIsModalVisible(false);
  };
  const handleCreateALarm = () => {
    setIsModalVisible(true);
  };

  // to handle when 'x' is clicked
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const CreateAlarmContainer = ({
    container_title,
    onPress,
    icon_name,
    icon_type,
    icon_size,
    icon_style,
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.createalarm_container}>
          <Text style={{color: 'black'}}>{container_title}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              name={icon_name}
              type={icon_type}
              size={icon_size}
              style={icon_style}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const SetAlarmContainer = ({container_title, container_sub}) => {
    return (
      <View style={styles.setcontainer_style}>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginHorizontal: 10,
              paddingVertical: 6,
            }}>
            {container_title}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              marginHorizontal: 10,
              paddingVertical: 6,
            }}>
            {container_sub}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.track_root}>
      <CustomScreenHeader
        header_title="Track"
        onPress={
          (onPress = () => {
            navigation.goBack();
          })
        }
      />
      <View style={styles.container}>
        <Text style={styles.sleepblock_headfont}>Sleep Entry</Text>
        <CreateAlarmContainer
          onPress={() => {
            handleCreateALarm();
          }}
          container_title="Add Sleep Entry"
          icon_name="plus-a"
          icon_type="fontisto"
          icon_size={20}
          icon_style={{
            color: 'black',
          }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={handleModalClose}>
          <ScrollView style={styles.track_root}>
            <View style={styles.setalarm_header}>
              <Text style={styles.setalarm_title}>Sleep Entry</Text>
              <TouchableOpacity
                onPress={() => {
                  handleModalClose();
                }}>
                <Icon
                  name="x"
                  type="octicon"
                  size={30}
                  color="#83B2E1"
                  style={{
                    flexDirection: 'row',
                  }}
                />
              </TouchableOpacity>
            </View>
            <BottomSheet_day day={day} setDay={setDay} />
            <Dropdown_hours hours={hours} setHours={setHours} />

            <CustomButton
              text="ADD ENTRY"
              onPress={() => {
                handleModalSubmit();
              }}
              buttonView={{paddingTop: 20}}
            />
          </ScrollView>
        </Modal>
      </View>
      {console.log('rendered')}
      {trackdata.length > 0 ? <CustomAlarm adata={trackdata} /> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  track_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  track_title: {
    color: 'white',
    fontSize: 35,
  },
  container: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 6,
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sleepblock_headfont: {
    color: 'white',
    fontSize: 23,
    paddingVertical: 10,
  },

  createalarm_container: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 6,
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setalarm_header: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  setalarm_title: {
    color: 'white',
    fontSize: 26,
  },
  setcontainer_style: {
    backgroundColor: 'rgba(1, 1, 24, 1)',
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    marginVertical: 15,
  },
});

export default TrackScreen;
