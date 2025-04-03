import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scaleFontSize} from '../../../assets/styles/scaling';
import {Routes} from '../../navigation/Routes';
import handleChangePassword from './utilities';
import CustomError from '../../components/CustomError/CustomError';

const ChangePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisibleCurrentPassword, setIsVisibleCurrentPassword] =
    useState(true);
  const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(true);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(true);
  const [error, setError] = useState('');

  const clearError = () => {
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  return (
    <View style={{flex: 1}}>
      <PurpleHeader press={navigation.goBack} title={'Change Password'} />
      <View style={styles.container}>
        <Text style={styles.title}>
          Your new password must be different from previously used password
        </Text>

        {/* Current Password*/}
        <Text style={styles.placeholder}>Current Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
            secureTextEntry={isVisibleCurrentPassword}
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() =>
              setIsVisibleCurrentPassword(!isVisibleCurrentPassword)
            }>
            <Icon
              name={!isVisibleCurrentPassword ? 'eye' : 'eye-slash'}
              size={scaleFontSize(18)}
              color={'gray'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* New password */}
        <Text style={styles.placeholder}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry={isVisibleNewPassword}
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setIsVisibleNewPassword(!isVisibleNewPassword)}>
            <Icon
              name={!isVisibleNewPassword ? 'eye' : 'eye-slash'}
              size={scaleFontSize(18)}
              color={'gray'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm new password */}
        <Text style={styles.placeholder}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={isVisibleConfirm}
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setIsVisibleConfirm(!isVisibleConfirm)}>
            <Icon
              name={!isVisibleConfirm ? 'eye' : 'eye-slash'}
              size={scaleFontSize(18)}
              color={'gray'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {error.length > 0 && <CustomError error={error} />}
      <TouchableOpacity
        onPress={async () => {
          const result = await handleChangePassword(
            newPassword,
            confirmPassword,
            currentPassword,
          );
          if (!result) {
            setError('All fields must be completed');
          } else if (result === 'Password must match') {
            setError('Password must match');
          } else if (result === 'Current password is incorrect') {
            setError('Current password is incorrect.');
          } else if (result === 'Password weak') {
            setError(
              'The password must contain at least 8 characters, one uppercase character, one lowercase character and a special character/number',
            );
          } else if (result === 'password different') {
            setError('Your new password must be different to the current one');
          } else if (result === true /* it might return the error.code */) {
            navigation.navigate(Routes.SuccessChangePassword);
          }
          clearError();
        }}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
