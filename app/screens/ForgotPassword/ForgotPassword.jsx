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

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      setSuccessMessage(
        'Password reset email sent successfully. Please check your email.',
      );
      setError('');
    } catch (error) {
      let errorMessage = error.message;
      if (errorMessage.includes(']')) {
        errorMessage = errorMessage.split(']')[1].trim();
      }
      setError(errorMessage);
      setSuccessMessage('');
    }
  };

  return (
    <SafeAreaView style={[globalStyles.backgroundColor, globalStyles.flex]}>
      <StatusBar translucent={false} />
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Header type={1} title={'Forgot Password'} />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
