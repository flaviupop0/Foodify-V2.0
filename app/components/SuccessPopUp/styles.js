import {StyleSheet} from 'react-native';
import {
  verticalScale,
  horizontalScale,
  scaleFontSize,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: verticalScale(50),
    left: verticalScale(20),
    right: verticalScale(20),
    backgroundColor: '#fff',
    padding: horizontalScale(16),
    marginHorizontal: horizontalScale(16),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    borderLeftWidth: verticalScale(5),
    borderLeftColor: '#8a2be2',
  },
  messageText: {
    color: '#000',
    fontSize: scaleFontSize(16),
    textAlign: 'center',
  },
  dismissButton: {
    marginTop: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    backgroundColor: '#8a2be2',
    borderRadius: 5,
  },
});

export default styles;
