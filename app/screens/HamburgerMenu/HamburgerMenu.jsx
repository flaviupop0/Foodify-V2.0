import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomError from '../../components/CustomError/CustomError';
import BackButton from '../../components/BackButton/BackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleFontSize} from '../../../assets/styles/scaling';
import styles from './style';
import {Routes} from '../../navigation/Routes';
import {useSelector, useDispatch} from 'react-redux';
import {clearUser} from '../../redux/slices/userSlice';

const HamburgerMenu = ({navigation, onLogout}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  const [loading, setLoading] = useState(false);
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
      await AsyncStorage.removeItem('user');
      dispatch(clearUser());
      onLogout();
    } catch (error) {
      setError('Error logging out');
      console.log(error);
    }
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
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.titleRow}>
        <BackButton onPress={() => navigation.closeDrawer()} />
        <Text style={styles.titleText}>Hi, {user?.firstName}</Text>
      </View>
      <Image
        source={{uri: user?.profilePicture}}
        resizeMode="cover"
        style={styles.profilePicture}
      />
      <Text style={styles.email}>{user?.email}</Text>
      {error ? <CustomError error={error} /> : null}
      <TouchableOpacity style={styles.options}>
        <Ionicons
          name="paper-plane-outline"
          color="grey"
          size={scaleFontSize(25)}
        />
        <Text style={styles.subtitle}>Messages</Text>
        <Ionicons name="arrow-forward" color="grey" size={scaleFontSize(25)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.options}>
        <Ionicons name="person-outline" color="grey" size={scaleFontSize(25)} />
        <Text style={styles.subtitle}>My profile</Text>
        <Ionicons name="arrow-forward" color="grey" size={scaleFontSize(25)} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.Settings)}
        style={styles.options}>
        <Ionicons
          name="settings-outline"
          color="grey"
          size={scaleFontSize(25)}
        />
        <Text style={styles.subtitle}>Settings</Text>
        <Ionicons name="arrow-forward" color="grey" size={scaleFontSize(25)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.options}>
        <Ionicons
          name="bookmark-outline"
          color="grey"
          size={scaleFontSize(25)}
        />
        <Text style={styles.subtitle}>Bookmarks</Text>
        <Ionicons name="arrow-forward" color="grey" size={scaleFontSize(25)} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.optionsLogOut}>
        <Ionicons name="power" color="#d1172c" size={scaleFontSize(25)} />
        <Text style={[styles.subtitle, {color: '#d1172c'}]}>Log out</Text>
        <Ionicons
          name="arrow-forward"
          color="#d1172c"
          size={scaleFontSize(25)}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HamburgerMenu;
