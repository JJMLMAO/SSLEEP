import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import React from 'react';

const CustomButton = ({
  text,
  underlayColor,
  onPress,
  customStyle,
  buttonView,
}) => {
  return (
    <View style={buttonView}>
      <TouchableHighlight
        underlayColor={underlayColor}
        style={[styles.button_styles, customStyle]}
        onPress={onPress}>
        <Text style={styles.button_text}>{text}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button_styles: {
    backgroundColor: 'rgba(131, 178, 225, 1)',
    borderRadius: 8,
    padding: 10,
  },
  button_text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomButton;
