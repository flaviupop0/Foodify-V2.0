import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../assets/styles/scaling';

const style = StyleSheet.create({
  mainAlertView: {
    backgroundColor: 'rgba(209, 9, 37, 0.1)',
    borderTopLeftRadius: verticalScale(20),
    borderBottomLeftRadius: verticalScale(20),
    flexDirection: 'row',
    marginBottom: horizontalScale(3),
    borderTopRightRadius: verticalScale(1),
    borderBottomRightRadius: verticalScale(1),
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  verticalRedLine: {
    backgroundColor: '#D10925',
    width: horizontalScale(10),
    height: verticalScale(30),
    borderTopLeftRadius: verticalScale(100),
    borderBottomLeftRadius: verticalScale(100),
  },
  alertText: {
    color: '#D10925',
    textAlign: 'center',
  },
});

export default style;
