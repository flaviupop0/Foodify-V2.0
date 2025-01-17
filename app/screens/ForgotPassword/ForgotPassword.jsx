import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './style';
import BackButton from '../../components/BackButton/BackButton';
import globalStyles from '../../../assets/styles/globalStyles';
import Header from '../../components/Header/Header';
import CustomError from '../../components/CustomError/CustomError';
import CustomSuccessModal from '../../components/SuccessPopUp/SuccessPopUp';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successModal, setSuccessModal] = useState(false);

  const openSuccessModal = () => {
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 5000);
  };

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      setSuccessMessage(
        "If there is an account related to this e-mail, you'll receive a reset password link on your e-mail",
      );
      openSuccessModal();
      setError('');
    } catch (error) {
      let errorMessage = error.message;
      if (errorMessage.includes(']')) {
        errorMessage = errorMessage.split(']')[1].trim();
      }
      setError(errorMessage);
      setTimeout(() => {
        setError('');
      }, 4000);
      setSuccessMessage('');
    }
  };

  return (
    <SafeAreaView style={[globalStyles.backgroundColor, globalStyles.flex]}>
      <StatusBar translucent={false} />
      <BackButton
        onPress={() => navigation.goBack()}
        title={'Forgot Password'}
      />
      <View style={styles.container}>
        <View style={styles.title}>
          <Header
            type={1}
            title={'Did you forget your password? Feel free to reset it'}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
        {error ? <CustomError error={error} /> : null}
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <CustomSuccessModal
          visible={successModal}
          message={successMessage}
          onClose={() => {}}
          style={styles.popup}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
