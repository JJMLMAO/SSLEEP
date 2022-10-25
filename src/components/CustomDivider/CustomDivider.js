import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomDivider = () => {
  return (
    <View styles={styles.divider}>
      <Text>____________</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: 'white',
    height: 2,
    width: '100%',
    position: 'absolute',
  },
});

export default CustomDivider;
