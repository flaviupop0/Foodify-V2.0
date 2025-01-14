import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomModal from '../../components/CustomModal/CustomModal';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {Routes} from '../../navigation/Routes';
import styles from './style';

const Settings = ({navigation}) => {
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
      navigation.navigate(Routes.Home);
    } catch (error) {
      setError('Error logging out');
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
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>
              Current Username: {userData?.userName}
            </Text>
            <Text style={styles.userInfoText}>
              Current First Name: {userData?.firstName}
            </Text>
            <Text style={styles.userInfoText}>
              Current Last Name: {userData?.lastName}
            </Text>
            <Text style={styles.userInfoText}>
              Current Birthday: {formatDate(userData?.dateOfBirth)}
            </Text>
          </View>
        </>
      )}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <CustomButton
        title="Change Username"
        onPress={() => setShowUsernameModal(true)}
        style={styles.button}
      />
      <CustomModal
        visible={showUsernameModal}
        title="Change Username"
        onClose={() => setShowUsernameModal(false)}
        error={usernameError}>
        <CustomTextInput
          placeholder="New Username"
          value={newUsername}
          onChangeText={setNewUsername}
        />
        <CustomButton
          title="Save"
          onPress={handleChangeUsername}
          style={styles.modalButton}
        />
      </CustomModal>
      <CustomButton
        title="Change Name"
        onPress={() => setShowNameModal(true)}
        style={styles.button}
      />
      <CustomModal
        visible={showNameModal}
        title="Change Name"
        onClose={() => setShowNameModal(false)}
        error={nameError}>
        <CustomTextInput
          placeholder="New First Name"
          value={newFirstName}
          onChangeText={setNewFirstName}
        />
        <CustomTextInput
          placeholder="New Last Name"
          value={newLastName}
          onChangeText={setNewLastName}
        />
        <CustomButton
          title="Save"
          onPress={handleChangeName}
          style={styles.modalButton}
        />
      </CustomModal>
      <CustomButton
        title="Change Password"
        onPress={() => setShowPasswordModal(true)}
        style={styles.button}
      />
      <CustomModal
        visible={showPasswordModal}
        title="Change Password"
        onClose={() => setShowPasswordModal(false)}
        error={passwordError}>
        <CustomTextInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <CustomButton
          title="Save"
          onPress={handleChangePassword}
          style={styles.modalButton}
        />
      </CustomModal>
      <CustomButton
        title="Logout"
        onPress={handleLogout}
        style={[styles.button, styles.logoutButton]}
        textStyle={styles.logoutButtonText}
      />
    </View>
  );
};

export default Settings;
