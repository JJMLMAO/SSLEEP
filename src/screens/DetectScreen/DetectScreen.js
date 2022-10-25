import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DetectScreen = () => {
  return (
    <View style={styles.detect_root}>
      <Text style={styles.detect_title}>Detect</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detect_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  detect_title: {
    color: 'white',
    fontSize: 35,
  },
});

export default DetectScreen;
