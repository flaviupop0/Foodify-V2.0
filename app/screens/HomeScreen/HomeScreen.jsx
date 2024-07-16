import React from 'react';
import {View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import {Routes} from '../../navigation/Routes';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/background.png')}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Foodify</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate(Routes.Login)}>
            <Text style={[styles.buttonText, {color: 'white'}]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={() => navigation.navigate(Routes.SignUp)}>
            <Text style={[styles.buttonText, styles.signUpButtonText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
