import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TrackScreen = () => {
  return (
    <View style={styles.track_root}>
      <Text style={styles.track_title}>Track</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  track_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  track_title: {
    color: 'white',
    fontSize: 35,
  },
});

export default TrackScreen;
