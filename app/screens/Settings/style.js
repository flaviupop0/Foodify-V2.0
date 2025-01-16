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
  profilePicture: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    borderRadius: Dimensions.get('window').height * 1,
    borderColor: '#8a2be2',
    borderWidth: 1,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  emailText: {
    marginTop: verticalScale(5),
    fontSize: scaleFontSize(16),
    color: '#333',
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: horizontalScale(20),
    justifyContent: 'space-between',
    width: '90%',
    marginTop: verticalScale(10),
    backgroundColor: 'white',
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    borderRadius: verticalScale(6),
  },
  subtitle: {
    marginLeft: verticalScale(10),
    fontSize: scaleFontSize(16),
    flex: 1,
  },
  border: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flex: 1,
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },
});

export default styles;
