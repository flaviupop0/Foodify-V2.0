import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const buttonScale = new Animated.Value(1);

  const handleForgotPasswordPress = () => {
    navigation.navigate('Forgot');
  };

  const handleLogin = async () => {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully!');
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('LoggedIn');
    } catch (err) {
      let errorMessage = err.message;
      if (errorMessage.includes(']')) {
        errorMessage = errorMessage.split(']')[1].trim();
      }
      setError('The e-mail or password is incorrect');
    }
  };

  const startButtonAnimation = () => {
    Animated.timing(buttonScale, {
      toValue: 0.95,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const resetButtonAnimation = () => {
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Foodify!</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#666"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#666"
      />
      <TouchableOpacity
        style={styles.button}
        onPressIn={startButtonAnimation}
        onPressOut={resetButtonAnimation}
        onPress={handleLogin}>
        <Animated.Text
          style={[styles.buttonText, {transform: [{scale: buttonScale}]}]}>
          Login
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
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
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotPassword: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default AuthScreen;
