import {Platform, StyleSheet} from 'react-native';
import {verticalScale} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8a2be2',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
