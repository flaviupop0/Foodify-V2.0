import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  Text,
} from 'react-native';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {scaleFontSize} from '../../../assets/styles/scaling';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PhotoPicker from '../../components/PhotoPicker/PhotoPicker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateUserProfilePicture,
  updateUserProfile,
} from '../../redux/slices/userSlice';
import CustomSuccessModal from '../../components/SuccessPopUp/SuccessPopUp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Routes} from '../../navigation/Routes';
import DatePicker from 'react-native-date-picker';
import CustomError from '../../components/CustomError/CustomError';

const ProfileSettings = ({navigation}) => {
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [userDataAuth, setUserDataAuth] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDay, setDateOfBirth] = useState(new Date());
  const [error, setError] = useState('');

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

  const openSuccessModal = message => {
    setSuccessMessage(message);
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 4000);
  };

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

  const fetchBase64 = async filePath => {
    const response = await fetch(filePath);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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
          try {
            const croppedImage = await ImageCropPicker.openPicker({
              mediaType: 'photo',
              cropping: true,
              width: 800,
              height: 800,
              includeBase64: false,
              cropperCircleOverlay: true,
            });
            const selectedImage = croppedImage.path;

            const storageRef = storage().ref(
              `profilePictures/${userDataAuth.uid}.jpg`,
            );
            await storageRef.putFile(selectedImage);

            const profilePictureURL = await storageRef.getDownloadURL();

            await firestore()
              .collection('users')
              .doc(userDataAuth.uid)
              .set({profilePicture: profilePictureURL}, {merge: true});

            dispatch(updateUserProfilePicture(profilePictureURL));
            openSuccessModal('Profile picture updated!');
          } catch (error) {
            if (error.message === 'User cancelled image selection') {
              console.log('User cancelled the image selection');
            } else {
              console.error(
                'Error selecting and uploading image:',
                error.message,
              );
            }
          }
        }
        break;

      case 'photo':
        hasPermission = await checkPermission(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        );
        if (hasPermission) {
          try {
            const capturedImage = await ImageCropPicker.openCamera({
              mediaType: 'photo',
              cropping: true,
              width: 800,
              height: 800,
              includeBase64: false,
              cropperCircleOverlay: true,
            });

            const selectedImage = capturedImage.path;

            const storageRef = storage().ref(
              `profilePictures/${userDataAuth.uid}.jpg`,
            );
            await storageRef.putFile(selectedImage);

            const profilePictureURL = await storageRef.getDownloadURL();

            await firestore()
              .collection('users')
              .doc(userDataAuth.uid)
              .set({profilePicture: profilePictureURL}, {merge: true});

            dispatch(updateUserProfilePicture(profilePictureURL));

            openSuccessModal('Profile picture updated!');
          } catch (error) {
            if (error.message === 'User cancelled image selection') {
              console.log('User cancelled the image selection');
            } else {
              console.error(
                'Error capturing and uploading image:',
                error.message,
              );
            }
          }
        }
        break;

      case 'remove':
        const defaultPictureAsset = Image.resolveAssetSource(
          require('../../../assets/Default_pfp.jpg'),
        ).uri;
        const defaultPictureBase64 = await fetchBase64(defaultPictureAsset);
        const storageRef = storage().ref(
          `profilePictures/${userDataAuth.uid}.jpg`,
        );
        await storageRef.putString(defaultPictureBase64, 'base64');
        const profilePictureURL = await storageRef.getDownloadURL();

        await firestore()
          .collection('users')
          .doc(userDataAuth.uid)
          .set({profilePicture: profilePictureURL}, {merge: true});

        dispatch(updateUserProfilePicture(profilePictureURL));
        openSuccessModal('Profile picture deleted successfully!');
        break;

      default:
        console.log('Unknown option');
    }

    if (hasPermission || option === 'remove') {
      setModalVisible(false);
    }
  };

  changeDateOfBirth = async () => {
    try {
      const minimumAgeDate = new Date();
      minimumAgeDate.setFullYear(minimumAgeDate.getFullYear() - 16);
      if (birthDay > minimumAgeDate) {
        setError('You must be at least 16 years old to use this application.');
        setTimeout(() => {
          setError('');
        }, 4000);
        return;
      }
      await firestore().collection('users').doc(userDataAuth.uid).update({
        dateOfBirth: birthDay.toISOString(),
      });
      dispatch(updateUserProfile({dateOfBirth: birthDay.toISOString()}));
      openSuccessModal('Your birthday was updated successfully!');
    } catch (error) {
      console.error(`Error updating birthday`, error.message);
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
      <View>
        <View style={styles.border} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.EditField, {
              fieldName: 'Username',
              fieldUpdate: 'userName',
              initialValue: user.userName,
              onSave: newValue => {
                dispatch(updateUserProfile({userName: newValue}));
                openSuccessModal('Username updated successfully!');
              },
            });
          }}
          style={styles.options}>
          <Text style={styles.subtitle}>Username</Text>
          <Text style={styles.optionText}>{user.userName}</Text>
          <Icon name="chevron-right" color="grey" size={scaleFontSize(25)} />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.EditField, {
              fieldName: 'First name',
              fieldUpdate: 'firstName',
              initialValue: user.firstName,
              onSave: newValue => {
                dispatch(updateUserProfile({firstName: newValue}));
                openSuccessModal('First name updated successfully!');
              },
            });
          }}
          style={styles.options}>
          <Text style={styles.subtitle}>First Name</Text>
          <Text style={styles.optionText}>{user.firstName}</Text>
          <Icon name="chevron-right" color="grey" size={scaleFontSize(25)} />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.EditField, {
              fieldName: 'Last name',
              fieldUpdate: 'lastName',
              initialValue: user.lastName,
              onSave: newValue => {
                dispatch(updateUserProfile({lastName: newValue}));
                openSuccessModal('Last name updated successfully!');
              },
            });
          }}
          style={styles.options}>
          <Text style={styles.subtitle}>Last Name</Text>
          <Text style={styles.optionText}>{user.lastName}</Text>
          <Icon name="chevron-right" color="grey" size={scaleFontSize(25)} />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.options}>
          <Text style={styles.subtitle}>Birthday</Text>
          <Text style={styles.optionText}>
            {new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).format(new Date(user.dateOfBirth))}
          </Text>
          <Icon name="chevron-right" color="grey" size={scaleFontSize(25)} />
        </TouchableOpacity>
        <View style={styles.border} />
        <DatePicker
          modal
          open={showDatePicker}
          date={birthDay}
          mode="date"
          onConfirm={date => {
            setShowDatePicker(false);
            setDateOfBirth(date);
            changeDateOfBirth();
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        />
      </View>
      {error ? <CustomError error={error} /> : null}
      <CustomSuccessModal
        visible={successModal}
        message={successMessage}
        onClose={() => setModalVisible(false)}
      />
      <PhotoPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onOptionSelect={handleOptionSelect}
      />
    </View>
  );
};

export default ProfileSettings;
