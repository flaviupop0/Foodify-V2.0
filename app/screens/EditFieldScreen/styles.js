import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  titleText: {
    flex: 1,
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  input: {
    width: '90%',
    height: horizontalScale(40),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: horizontalScale(20),
    color: '#000000',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subtitle: {
    marginTop: verticalScale(40),
    alignSelf: 'flex-start',
    marginLeft: horizontalScale(20),
    marginBottom: verticalScale(5),
    fontSize: scaleFontSize(15),
    fontWeight: '500',
  },
  button2: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#8a2be2',
    alignSelf: 'center',
    position: 'absolute',
    bottom: verticalScale(60),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(18),
  },
  passwordInputContainer: {
    width: '90%',
    height: horizontalScale(40),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: horizontalScale(20),
    marginBottom: 20,
    color: '#000000',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontSize: scaleFontSize(16),
    color: '#000',
  },
  icon: {
    marginLeft: horizontalScale(5),
  },
});

export default styles;
