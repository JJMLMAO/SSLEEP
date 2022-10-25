import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DiaryScreen = () => {
  return (
    <View style={styles.diary_root}>
      <Text style={styles.diary_title}>Diary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  diary_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  diary_title: {
    color: 'white',
    fontSize: 35,
  },
});

export default DiaryScreen;
