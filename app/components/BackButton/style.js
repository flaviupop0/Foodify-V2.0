import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    height: horizontalScale(44),
    width: horizontalScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(26),
  },
});

export default style;
