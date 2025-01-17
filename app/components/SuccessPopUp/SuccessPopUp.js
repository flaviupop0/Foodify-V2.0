import React, {useEffect} from 'react';
import {Modal, Text, View} from 'react-native';
import styles from './styles';

const CustomSuccessModal = ({visible, message, onClose, style}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={style ? style : styles.modalContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </Modal>
  );
};

export default CustomSuccessModal;
