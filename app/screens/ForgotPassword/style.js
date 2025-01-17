import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scaleFontSize(32),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    marginTop: verticalScale(20),
    fontFamily: 'PoetsenOne-Regular',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#8a2be2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
    position: 'absolute',
    bottom: verticalScale(20),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  successMessage: {
    color: 'green',
    marginBottom: 20,
  },
  popup: {
    position: 'absolute',
    bottom: verticalScale(120),
    left: verticalScale(20),
    right: verticalScale(20),
    backgroundColor: '#fff',
    padding: horizontalScale(16),
    marginHorizontal: horizontalScale(16),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    borderLeftWidth: verticalScale(5),
    borderLeftColor: '#8a2be2',
  },
});

export default styles;
