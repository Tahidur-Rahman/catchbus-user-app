import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

function Loading({show,text}) {
  return (
    <Modal
      visible={show}
      transparent
      statusBarTranslucent
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.8)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ActivityIndicator size={50} color={'#000'} />
      </View>
    </Modal>
  );
}

export default Loading;
