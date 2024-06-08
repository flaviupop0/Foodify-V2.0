import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';

const CustomModal = ({visible, title, children, onClose, error}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {children}
          <CustomButton
            title="Close"
            onPress={onClose}
            style={styles.closeButton}
            textStyle={styles.closeButtonText}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4A4A4A',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#ccc',
  },
  closeButtonText: {
    color: '#4A4A4A',
  },
});

export default CustomModal;
