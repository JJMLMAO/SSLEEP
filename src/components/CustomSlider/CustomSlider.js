import {StyleSheet, Text, View} from 'react-native';
import {React, useState} from 'react';
import Slider from '@react-native-community/slider';

const CustomSlider = ({onValueChange, value, minVal, maxVal, step}) => {
  return (
    <Slider
      style={{width: '90%', height: 50, alignSelf: 'center'}}
      minimumValue={minVal}
      maximumValue={maxVal}
      step={step}
      minimumTrackTintColor="red"
      maximumTrackTintColor="blue"
      thumbTintColor="white"
      onValueChange={onValueChange}
      value={value}></Slider>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({});
