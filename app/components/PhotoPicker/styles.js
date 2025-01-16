import {Dimensions, StyleSheet} from 'react-native';
import {
  verticalScale,
  horizontalScale,
  scaleFontSize,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: horizontalScale(20),
    paddingBottom: verticalScale(40),
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: horizontalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: scaleFontSize(16),
    marginLeft: horizontalScale(10),
    color: '#333',
  },
  cancelOption: {
    borderTopWidth: verticalScale(1),
    borderTopColor: '#f0f0f0',
    marginTop: verticalScale(10),
    paddingTop: verticalScale(15),
    alignItems: 'center',
  },
});

export default styles;
