import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import styles from './styles';
import CustomError from '../../components/CustomError/CustomError';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditFieldScreen = ({route, navigation}) => {
  const {fieldName, initialValue, onSave, fieldUpdate} = route.params;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [currentUser, setUserDataAuth] = useState(null);

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
          style={styles.input}
          value={value}
          autoCapitalize={fieldName === 'Username' ? 'none' : 'words'}
          onChangeText={text => {
            setValue(text);
            setError('');
          }}
          placeholder={`Enter ${fieldName.toLowerCase()}`}
        />
        {error ? <CustomError error={error} /> : null}
        <TouchableOpacity style={styles.button2} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditFieldScreen;
