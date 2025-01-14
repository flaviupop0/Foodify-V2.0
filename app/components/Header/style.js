import {Dimensions, StyleSheet} from 'react-native';
import {scaleFontSize} from '../../../assets/styles/scaling';

const style = StyleSheet.create({
  title1: {
    fontFamily: 'PoetsenOne-Regular',
    color: '#022150',
    fontSize: scaleFontSize(24),
    lineHeight: scaleFontSize(29),
    maxWidth: Dimensions.get('window').width * 0.9,
    textAlign: 'center',
  },
  title2: {
    fontFamily: 'PoetsenOne-Regular',
    color: '#022150',
    fontSize: scaleFontSize(18),
    lineHeight: scaleFontSize(22),
  },
  title3: {
    fontFamily: 'PoetsenOne-Regular',
    color: '#022150',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
  },
});

export default style;
