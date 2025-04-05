import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image, StatusBar} from 'react-native';
import styles from './style';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleFontSize} from '../../../assets/styles/scaling';
import {Routes} from '../../navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import CustomSuccessModal from '../../components/SuccessPopUp/SuccessPopUp';
import {updateUserProfile} from '../../redux/slices/userSlice';

const Settings = ({navigation}) => {
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const openSuccessModal = message => {
    setSuccessMessage(message);
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'white-content'} translucent={true} />
      <PurpleHeader press={navigation.goBack} title={'Settings'} />
      <View style={styles.infoContainer}>
        <Image
          source={{uri: user?.profilePicture}}
          resizeMode="cover"
          style={styles.profilePicture}
        />
        <Text style={styles.emailText}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.emailText}>{user?.email}</Text>
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
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.ChangePassword)}
          style={styles.options}>
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.EditField, {
              fieldName: 'Email',
              fieldUpdate: 'email',
              initialValue: user.email,
              onSave: newValue => {
                dispatch(updateUserProfile({email: newValue}));
                openSuccessModal('Email changed successfully!');
              },
            });
          }}
          style={styles.options}>
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
      <CustomSuccessModal
        visible={successModal}
        message={successMessage}
        onClose={() => setSuccessModal(false)}
      />
    </View>
  );
};

export default Settings;
