import {StyleSheet} from 'react-native';
import {verticalScale} from './scaling';

const globalStyles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: 'white',
  },
  flex: {
    flex: 1,
  },
  marginBottom24: {
    marginBottom: verticalScale(24),
  },
});

export default globalStyles;
