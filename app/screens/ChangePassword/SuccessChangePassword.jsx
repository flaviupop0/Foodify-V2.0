import React from 'react';
import {SafeAreaView, Text, Image, TouchableOpacity} from 'react-native';
import {successChangedPassword} from './assets';
import styles from './styles';
import {Routes} from '../../navigation/Routes';

const SuccessChangePassword = ({navigation}) => {
  return (
    <SafeAreaView testID={'successContainer'} style={styles.successContainer}>
      <Text testID="titleText" style={styles.successText}>
        Your password has been changed successfully
      </Text>
      <Image
        style={styles.imageSuccess}
        source={successChangedPassword}
        resizeMode="contain"
        testID="successImage"
      />
      <TouchableOpacity
        testID="navigationButton"
        onPress={() => {
          navigation.reset({
            index: 1,
            routes: [{name: Routes.LoggedInScreen}, {name: Routes.Settings}],
          });
        }}
        style={[styles.buttonContainer, {position: 'relative'}]}>
        <Text testID="buttonText" style={styles.buttonText}>
          Go to settings
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SuccessChangePassword;
