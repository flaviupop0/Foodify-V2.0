import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../../assets/styles/scaling';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  profilePictureContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    borderRadius: 100,
    borderColor: '#8a2be2',
    borderWidth: 1,
  },
  editIcon: {
    position: 'absolute',
    bottom: verticalScale(10),
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    padding: verticalScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
});

export default styles;
