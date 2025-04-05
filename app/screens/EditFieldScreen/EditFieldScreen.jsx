import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import styles from './styles';
import CustomError from '../../components/CustomError/CustomError';
import firestore from '@react-native-firebase/firestore';
import auth, {
  sendEmailVerification,
  updateEmail,
} from '@react-native-firebase/auth';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scaleFontSize, verticalScale} from '../../../assets/styles/scaling';

const EditFieldScreen = ({route, navigation}) => {
  const {fieldName, initialValue, onSave, fieldUpdate} = route.params;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [currentUser, setUserDataAuth] = useState(null);
  const [password, setPassword] = useState('');
  const [isVisibleCurrentPassword, setIsVisibleCurrentPassword] =
    useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const parsedUser2 = JSON.parse(userData);
        setUserDataAuth(parsedUser2);
      } catch (error) {
        console.error('Error retrieving user data', error);
      }
    };
    getUserData();
  }, []);

  const checkIfUsernameExists = async () => {
    const snapshot = await firestore()
      .collection('users')
      .where('userName', '==', value)
      .get();

    if (!snapshot.empty) {
      setError('Username taken');
      setTimeout(() => {
        setError('');
      }, 4000);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!value.trim()) {
      setError(`${fieldName} cannot be empty`);
      setTimeout(() => {
        setError('');
      }, 4000);
      return;
    }
    try {
      const userId = auth().currentUser.uid;
      if (fieldUpdate === 'userName') {
        const usernameAvailable = await checkIfUsernameExists();
        if (!usernameAvailable) {
          return;
        }
      }
      if (fieldUpdate === 'email') {
        try {
          const user = auth().currentUser;
          const credential = auth.EmailAuthProvider.credential(
            user.email,
            password,
          );
          await user.reauthenticateWithCredential(credential);
          await updateEmail(user, value);
          await sendEmailVerification(user);
        } catch (error) {
          console.log(error.code);
          if (error.code === 'auth/wrong-password') {
            setError('Your current password is wrong');
          } else if (error.code === 'auth/email-already-in-use') {
            setError('The email address is already in use by another account');
          }
          return;
        }
      }
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          [fieldUpdate]: value,
        });
      navigation.goBack();
      onSave(value);
    } catch (error) {
      console.error(`Error updating ${fieldName}:`, error.message);
    }
  };

  return (
    <View style={styles.container}>
      <PurpleHeader press={navigation.goBack} title={`${fieldName}`} />
      <View style={styles.titleText}>
        <Header type={1} title={`Enter your new ${fieldName}`} />
        <Text style={styles.subtitle}>{fieldName}</Text>
        <TextInput
          testID="valueField"
          style={styles.input}
          value={value}
          autoCapitalize={
            fieldName === 'Username' || fieldName === 'Email' ? 'none' : 'words'
          }
          onChangeText={text => {
            setValue(text);
            setError('');
          }}
          placeholder={`Enter ${fieldName.toLowerCase()}`}
        />
        {fieldName === 'Email' && (
          <>
            <Text style={[styles.subtitle, {marginTop: verticalScale(20)}]}>
              Password
            </Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                testID="passwordInput"
                style={styles.passwordInput}
                value={password}
                autoCapitalize={'none'}
                onChangeText={text => {
                  setPassword(text);
                  setError('');
                }}
                placeholder={`Enter password`}
                secureTextEntry={isVisibleCurrentPassword}
              />
              <TouchableOpacity
                testID="setPasswordVisibleButton"
                onPress={() =>
                  setIsVisibleCurrentPassword(!isVisibleCurrentPassword)
                }>
                <Icon
                  name={!isVisibleCurrentPassword ? 'eye' : 'eye-slash'}
                  size={scaleFontSize(15)}
                  color={'gray'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
        {error.length > 0 && <CustomError testID="customError" error={error} />}
        <TouchableOpacity
          testID="saveButton"
          style={styles.button2}
          onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditFieldScreen;
