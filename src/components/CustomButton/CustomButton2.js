import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';

const CustomButton = ({
  text,
  underlayColor,
  onPress,
  button_styles,
  text_style,
  icon_name,
  icon_size,
  icon_style,
  icon_type,
}) => {
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      style={button_styles}
      onPress={onPress}>
      <>
        <Text style={text_style}>{text}</Text>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 10,
          }}>
          <Icon
            name={icon_name}
            type={icon_type}
            size={icon_size}
            style={icon_style}
          />
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  //   button_styles: {
  //     //backgroundColor: 'rgba(131, 178, 225, 1)',
  //     borderRadius: 8,
  //     padding: 10,
  //   },
});

export default CustomButton;
