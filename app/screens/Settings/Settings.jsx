import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Routes} from '../../navigation/Routes';
import styles from './style';
import CustomError from '../../components/CustomError/CustomError';
import BackButton from '../../components/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleFontSize} from '../../../assets/styles/scaling';

const Settings = ({navigation}) => {
  const correctNavigation = navigation || useNavigation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth().currentUser.uid;
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
          console.log('User data:', userData);
        } else {
          setError('User data not found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChangeUsername = async () => {
    if (!newUsername.trim()) {
      setUsernameError('Username cannot be empty');
      return;
    }
    try {
      const userId = auth().currentUser.uid;
      await firestore().collection('users').doc(userId).update({
        userName: newUsername,
      });
      setUserData({...userData, userName: newUsername});
      setSuccess('Username updated successfully');
      setShowUsernameModal(false);
      setUsernameError('');
    } catch (error) {
      setUsernameError('Error changing username');
    }
  };

  const handleChangeName = async () => {
    if (!newFirstName.trim() || !newLastName.trim()) {
      setNameError('First name and last name cannot be empty');
      return;
    }
    try {
      const userId = auth().currentUser.uid;
      await firestore().collection('users').doc(userId).update({
        firstName: newFirstName,
        lastName: newLastName,
      });
      setUserData({
        ...userData,
        firstName: newFirstName,
        lastName: newLastName,
      });
      setSuccess('Name updated successfully');
      setShowNameModal(false);
      setNameError('');
    } catch (error) {
      setNameError('Error changing name');
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword.trim()) {
      setPasswordError('Password cannot be empty');
      return;
    }
    try {
      const user = auth().currentUser;
      await user.updatePassword(newPassword);
      setSuccess('Password changed successfully');
      setShowPasswordModal(false);
      setPasswordError('');
    } catch (error) {
      setPasswordError('Error changing password');
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('user');
      correctNavigation.replace(Routes.Login);
    } catch (error) {
      setError('Error logging out');
      console.log(error);
    }
  };

  const formatDate = date => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8a2be2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <BackButton />
        <Text style={styles.titleText}>Hi, {userData?.firstName}</Text>
      </View>
      <Image
        source={{uri: userData?.profilePicture}}
        resizeMode="cover"
        style={styles.profilePicture}
      />
      <Text style={styles.email}>{userData?.email}</Text>
      {error ? <CustomError error={error} /> : null}
      <TouchableOpacity onPress={handleLogout} style={styles.options}>
        <Ionicons name="power" color="#d1172c" size={scaleFontSize(30)} />
        <Text style={[styles.subtitle, {color: '#d1172c'}]}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;
