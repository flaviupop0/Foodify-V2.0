import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigate = useNavigation();
  const [userData, setUserData] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth().currentUser.uid;
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          setUserData(userDoc.data);
          console.log(userData);
        } else {
          setError('User data not found');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, []);

  const handleChangeUsername = async () => {
    try {
      await AsyncStorage.setItem('username', newUsername);
      setShowUsernameModal(false);
    } catch (error) {
      setError('Error changing username');
    }
  };

  const handleChangeName = async () => {
    try {
      await AsyncStorage.setItem('firstName', newFirstName);
      await AsyncStorage.setItem('lastName', newLastName);
      setShowNameModal(false);
    } catch (error) {
      setError('Error changing name');
    }
  };

  const handleChangePassword = async () => {
    try {
      const user = auth().currentUser;
      await user.updatePassword(newPassword);
      setShowPasswordModal(false);
    } catch (error) {
      setError('Error changing password');
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('user');
      navigate.navigate('Home');
    } catch (error) {
      setError('Error logging out');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>
              Current Username: {userData?.username}
            </Text>
            <Text style={styles.userInfoText}>
              Current First Name: {userData?.firstName}
            </Text>
            <Text style={styles.userInfoText}>
              Current Last Name: {userData?.lastName}
            </Text>
            <Text style={styles.userInfoText}>
              Current Birthday: {userData?.birthday}
            </Text>
          </View>
        </>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowUsernameModal(true)}>
        <Text style={styles.buttonText}>Change Username</Text>
      </TouchableOpacity>
      <Modal
        visible={showUsernameModal}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Username</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="New Username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleChangeUsername}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowUsernameModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowNameModal(true)}>
        <Text style={styles.buttonText}>Change Name</Text>
      </TouchableOpacity>
      <Modal visible={showNameModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="New First Name"
              value={newFirstName}
              onChangeText={setNewFirstName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="New Last Name"
              value={newLastName}
              onChangeText={setNewLastName}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleChangeName}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowNameModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowPasswordModal(true)}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleChangePassword}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPasswordModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoutButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#8a2be2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Settings;
