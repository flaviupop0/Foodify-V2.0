import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A4A4A',
  },
  userInfoContainer: {
    marginBottom: 30,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4A4A4A',
  },
  button: {
    backgroundColor: '#8a2be2',
  },
  modalButton: {
    backgroundColor: '#8a2be2',
  },
  logoutButton: {
    backgroundColor: 'red',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
  },
  success: {
    color: 'green',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});
export default styles;
