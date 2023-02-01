import {View, Text, TextInput, StyleSheet} from 'react-native';

import React from 'react';

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  multiline,
  numberOfLines,
  customstyle_input,
  containerstyle,
  placeholderTextColor,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={[styles.input, customstyle_input]}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
  },
});

export default CustomInput;
