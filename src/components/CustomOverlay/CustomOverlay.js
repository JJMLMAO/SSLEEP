import {StyleSheet} from 'react-native';
import React from 'react';
import {Overlay} from '@rneui/base';

const CustomOverlay = ({visible, togglebackdrop, overlayContent}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={togglebackdrop}
      overlayStyle={styles.overlay_container}>
      {overlayContent}
    </Overlay>
  );
};

export default CustomOverlay;

const styles = StyleSheet.create({
  overlay_container: {
    backgroundColor: '#83B2E1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#83B2E1',
  },
});
