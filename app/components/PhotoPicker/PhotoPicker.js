import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const PhotoPicker = ({visible, onClose, onOptionSelect}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => onOptionSelect('gallery')}>
              <MaterialCommunityIcons name="image" size={24} color="#666" />
              <Text style={styles.modalOptionText}>Select from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => onOptionSelect('photo')}>
              <MaterialCommunityIcons name="camera" size={24} color="#666" />
              <Text style={styles.modalOptionText}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => onOptionSelect('remove')}>
              <MaterialCommunityIcons name="trash-can" size={24} color="#666" />
              <Text style={styles.modalOptionText}>Remove photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PhotoPicker;
