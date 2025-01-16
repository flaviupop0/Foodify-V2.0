import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Platform, Alert} from 'react-native';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {scaleFontSize} from '../../../assets/styles/scaling';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PhotoPicker from '../../components/PhotoPicker/PhotoPicker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
const ProfileSettings = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userProfile');
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error retrieving user data', error);
      }
    };
    getUserData();
  }, []);

  const checkPermission = async permissionType => {
    const status = await check(permissionType);
    if (status === RESULTS.GRANTED) {
      return true;
    } else if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
      const requestResult = await request(permissionType);
      return requestResult === RESULTS.GRANTED;
    } else {
      Alert.alert(
        'Permission Required',
        'This action requires photos access and camery access. Please enable it in your device settings.',
      );
      return false;
    }
  };

  const handleOptionSelect = async option => {
    let hasPermission = false;
    switch (option) {
      case 'gallery':
        hasPermission = await checkPermission(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (hasPermission) {
          console.log('Select from gallery pressed');
        }
        break;
      case 'photo':
        hasPermission = await checkPermission(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        );
        if (hasPermission) {
          console.log('Take a photo pressed');
        }
        break;
      case 'remove':
        console.log('Remove photo pressed');
        break;
      default:
        console.log('Unknown option');
    }
    if (hasPermission || option === 'remove') {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <PurpleHeader press={navigation.goBack} title={'Profile settings'} />
      <View style={styles.infoContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: user.profilePicture}}
            resizeMode="cover"
            style={styles.profilePicture}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.editIcon}>
            <MaterialCommunityIcons
              name="pencil"
              size={scaleFontSize(20)}
              color="#8a2be2"
            />
          </TouchableOpacity>
        </View>
      </View>
      <PhotoPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onOptionSelect={handleOptionSelect}
      />
    </View>
  );
};

export default ProfileSettings;
