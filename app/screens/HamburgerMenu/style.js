import {StyleSheet} from 'react-native';
import {
  verticalScale,
  scaleFontSize,
  horizontalScale,
} from '../../../assets/styles/scaling';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A4A4A',
  },
  userInfoContainer: {
    marginBottom: 30,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4A4A4A',
  },
  button: {
    backgroundColor: '#8a2be2',
  },
  modalButton: {
    backgroundColor: '#8a2be2',
  },
  logoutButton: {
    backgroundColor: 'red',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
  },
  success: {
    color: 'green',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    marginRight: Dimensions.get('window').width * 0.13,
    fontFamily: 'PoetsenOne-Regular',
    color: '#FFFFF',
    fontSize: scaleFontSize(22),
    lineHeight: scaleFontSize(30),
  },
  email: {
    marginBottom: verticalScale(30),
    fontSize: scaleFontSize(16),
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: horizontalScale(20),
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: horizontalScale(25),
  },
  subtitle: {
    marginLeft: verticalScale(10),
    fontSize: scaleFontSize(16),
    flex: 1,
  },
  optionsLogOut: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: horizontalScale(20),
    position: 'absolute',
    bottom: verticalScale(30),
    width: '90%',
  },
});
export default styles;
