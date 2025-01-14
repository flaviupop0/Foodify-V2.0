import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFF',
    height: horizontalScale(44),
    width: horizontalScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(26),
  },
  title: {
    fontFamily: 'PoetsenOne-Regular',
    color: '#022150',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
  },
  bigContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default style;
