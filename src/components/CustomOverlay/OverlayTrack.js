import {StyleSheet} from 'react-native';
import React from 'react';
import {Overlay} from '@rneui/base';

const OverlayTrack = ({visible, overlay_backdrop, overlayContent}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={overlay_backdrop}
      overlayStyle={styles.overlaytrack_style}>
      {overlayContent}
    </Overlay>
  );
};

export default OverlayTrack;

const styles = StyleSheet.create({
  overlaytrack_style: {
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
});
