import {Platform, StyleSheet} from 'react-native';
import {verticalScale} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8a2be2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8a2be2',
    paddingLeft: verticalScale(10),
    paddingTop: Platform.OS === 'android' ? verticalScale(25) : 0,
  },
});

export default styles;
