import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Routes} from '../../navigation/Routes';
import styles from './style';
import BackButton from '../../components/BackButton/BackButton';
import CustomError from '../../components/CustomError/CustomError';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthScreen = ({navigation, onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const buttonScale = new Animated.Value(1);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
      if (!user.emailVerified) {
        setError('Account not activated');
        setTimeout(() => {
          setError('');
        }, 4000);
        return;
      }
      await AsyncStorage.setItem('user', JSON.stringify(user));
      onLogin();
    } catch (err) {
      let errorMessage = err.message;
      if (errorMessage.includes(']')) {
        errorMessage = errorMessage.split(']')[1].trim();
      }
      setError('The e-mail or password is incorrect');
      setTimeout(() => {
        setError('');
      }, 4000);
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
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.backgroundImage}>
      <View style={styles.backButton}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconContainer}>
              <Ionicons
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {error ? <CustomError error={error} /> : null}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
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
          onPress={() => navigation.navigate(Routes.ForgetPassword)}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default AuthScreen;
