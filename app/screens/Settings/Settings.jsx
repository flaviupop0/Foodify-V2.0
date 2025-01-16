import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './style';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleFontSize} from '../../../assets/styles/scaling';
import {Routes} from '../../navigation/Routes';

const Settings = ({navigation}) => {
  const [userPhoto, setUserPhoto] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setUserFirstName] = useState('');
  const [lastName, setUserLastName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userProfile');
        const parsedUser = JSON.parse(storedUser);
        setUserPhoto(parsedUser.profilePicture);
        setUserEmail(parsedUser.email);
        setUserFirstName(parsedUser.firstName);
        setUserLastName(parsedUser.lastName);
      } catch (error) {
        console.error('Error retrieving user data', error);
      }
    };
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <PurpleHeader press={navigation.goBack} title={'Settings'} />
      <View style={styles.infoContainer}>
        <Image
          source={{uri: userPhoto}}
          resizeMode="cover"
          style={styles.profilePicture}
        />
        <Text style={styles.emailText}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.emailText}>{userEmail}</Text>
      </View>
      <View>
        <View style={styles.border} />
        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate(Routes.ProfileSettings)}>
          <Ionicons
            name="person-outline"
            color="grey"
            size={scaleFontSize(25)}
          />
          <Text style={styles.subtitle}>Profile settings</Text>
          <Ionicons
            name="arrow-forward"
            color="grey"
            size={scaleFontSize(25)}
          />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.options}>
          <Ionicons
            name="lock-closed-outline"
            color="grey"
            size={scaleFontSize(25)}
          />
          <Text style={styles.subtitle}>Change password</Text>
          <Ionicons
            name="arrow-forward"
            color="grey"
            size={scaleFontSize(25)}
          />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.options}>
          <Ionicons name="mail-outline" color="grey" size={scaleFontSize(25)} />
          <Text style={styles.subtitle}>Change email address</Text>
          <Ionicons
            name="arrow-forward"
            color="grey"
            size={scaleFontSize(25)}
          />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.options}>
          <Ionicons
            name="trash-outline"
            color="grey"
            size={scaleFontSize(25)}
          />
          <Text style={styles.subtitle}>Delete account</Text>
          <Ionicons
            name="arrow-forward"
            color="grey"
            size={scaleFontSize(25)}
          />
        </TouchableOpacity>
        <View style={styles.border} />
      </View>
    </View>
  );
};

export default Settings;
