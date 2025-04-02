import {StyleSheet} from 'react-native';
import {
  verticalScale,
  horizontalScale,
  scaleFontSize,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(20),
    backgroundColor: '#F9F9F9',
  },
  title: {
    textAlign: 'center',
    marginTop: verticalScale(15),
    fontWeight: '400',
    fontSize: scaleFontSize(18),
    lineHeight: verticalScale(15),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    fontSize: scaleFontSize(16),
    color: '#000',
  },
  icon: {
    marginLeft: horizontalScale(5),
  },
  placeholder: {
    marginTop: verticalScale(20),
    fontWeight: '600',
    fontSize: scaleFontSize(16),
    marginLeft: horizontalScale(3),
    marginBottom: verticalScale(4),
  },
  buttonContainer: {
    width: '85%',
    height: verticalScale(40),
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
    bottom: verticalScale(50),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(18),
  },
  successContainer: {
    backgroundColor: '#F9F9F9',
    flex: 1,
    justifyContent: 'space-between',
  },
  successText: {
    textAlign: 'center',
    fontFamily: 'PoetsenOne-Regular',
    fontSize: scaleFontSize(20),
    marginTop: verticalScale(40),
  },
  imageSuccess: {
    height: verticalScale(300),
    width: horizontalScale(300),
    alignSelf: 'center',
  },
});

export default styles;
