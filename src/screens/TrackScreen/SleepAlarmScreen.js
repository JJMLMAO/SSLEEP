import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/base';
import CustomButton from '../../components/CustomButton/CustomButton';

const SleepAlarmScreen = ({navigation}) => {
  const Sleepalarm_containers = ({container_title, container_sub}) => {
    return (
      <View style={styles.container_style}>
        <TouchableOpacity>
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
    <View style={styles.sleepalarm_root}>
      <View style={styles.sleepalarm_header}>
        <Text style={styles.sleepalarm_title}>Sleep Alarm</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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
      <Sleepalarm_containers
        container_title="Mode"
        container_sub="Please choose your preferred mode."
      />
      <Sleepalarm_containers
        container_title="Time"
        container_sub="Please choose your preferred time."
      />
      <Sleepalarm_containers
        container_title="Label"
        container_sub="Please give your alarm a name."
      />

      <View
        style={{
          marginVertical: 50,
        }}>
        <CustomButton
          text="CREATE"
          underlayColor="white"
          onPress={
            (onPress = () => {
              handleCreateAlarm(alarms);
            })
          }
        />
      </View>
    </View>
  );
};

export default SleepAlarmScreen;

const styles = StyleSheet.create({
  sleepalarm_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  sleepalarm_title: {
    color: 'white',
    fontSize: 26,
  },
  sleepalarm_header: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container_style: {
    backgroundColor: 'rgba(1, 1, 24, 1)',
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    marginVertical: 15,
  },
});
