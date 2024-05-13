import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Auth');
  };

  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Foodify</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#8a2be2'}]}
            onPress={handleLoginPress}>
            <Text style={[styles.buttonText, {color: '#ffffff'}]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#ffffff'}]}
            onPress={handleSignUpPress}>
            <Text style={[styles.buttonText, {color: '#000000'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'PoetsenOne-Regular',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
