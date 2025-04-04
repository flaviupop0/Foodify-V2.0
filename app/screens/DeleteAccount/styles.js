import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: verticalScale(15),
    fontWeight: '400',
    fontSize: scaleFontSize(18),
    lineHeight: verticalScale(15),
    marginVertical: verticalScale(25),
    maxWidth: '93%',
    alignSelf: 'center',
  },
  placeHolder: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(10),
  },
  icon: {
    marginLeft: horizontalScale(5),
  },
  textInput: {
    flex: 1,
    fontSize: scaleFontSize(16),
    color: '#000',
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
    maxWidth: '92%',
    alignSelf: 'center',
    marginTop: verticalScale(4),
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
});

export default styles;
