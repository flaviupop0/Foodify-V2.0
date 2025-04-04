import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scaleFontSize} from '../../../assets/styles/scaling';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomError from '../../components/CustomError/CustomError';
import {Routes} from '../../navigation/Routes';
import {checkPassword} from './utilities';

const DeleteAccount = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const resetError = () => {
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <PurpleHeader
        press={() => navigation.goBack()}
        title={'Delete Account'}
      />
      <Text style={styles.subtitle}>
        To delete your account please enter your current password
      </Text>

      {/*Text input for password */}
      <Text style={styles.placeHolder}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          testID="passwordInput"
          secureTextEntry={isPasswordVisible}
          placeholder="Enter password"
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          testID="changePasswordVisibilityButton"
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={!isPasswordVisible ? 'eye' : 'eye-slash'}
            size={scaleFontSize(18)}
            color={'gray'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {error.length > 0 && <CustomError testID="customError" error={error} />}
      <CustomButton
        testID="nextButton"
        onPress={async () => {
          const correctPassword = await checkPassword(password);
          if (correctPassword === true) {
            navigation.navigate(Routes.DeleteAccountSecondStep);
          } else if (correctPassword === 'User not found') {
            setError('Invalid session, please re-authenticate');
          } else if (!correctPassword) {
            setError('You must introduce your password');
          } else {
            setError('Current password is incorrect');
          }
          resetError();
        }}
        style={styles.buttonContainer}
        title={'Next'}
      />
    </View>
  );
};

export default DeleteAccount;
