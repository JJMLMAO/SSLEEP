import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Switch} from '@rneui/themed';

const CustomSwitch = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      value={checked}
      onValueChange={value => setChecked(value)}
      trackColor="rgba(13, 201, 111, 1.0)"
      thumbColor="white"
    />
  );
};

const styles = StyleSheet.create({});

export default CustomSwitch;
