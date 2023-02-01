import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';

const CustomScreenHeader = ({header_title, onPress}) => {
  return (
    <View style={styles.screen_header}>
      <Icon
        name="arrow-back-ios"
        type="material"
        size={30}
        color="#83B2E1"
        style={styles.back_icon}
        onPress={onPress}
      />
      <Text style={styles.headerText_style}>{header_title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText_style: {
    color: 'white',
    fontSize: 35,
  },
});

export default CustomScreenHeader;
