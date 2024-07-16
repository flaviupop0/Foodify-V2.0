import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView} from 'react-native-gesture-handler';
import globalStyles from '../../../assets/styles/globalStyles';
import style from './style';
import BackButton from '../../components/BackButton/BackButton';
import Header from '../../components/Header/Header';

const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [error, setError] = useState('');
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      email &&
      userName &&
      password &&
      confirmPassword
    ) {
      setIsSignUpEnabled(true);
    } else {
      setIsSignUpEnabled(false);
    }
  }, [firstName, lastName, email, userName, password, confirmPassword]);

  const handleRegister = async () => {
    try {
      const minimumAgeDate = new Date();
      minimumAgeDate.setFullYear(minimumAgeDate.getFullYear() - 16);
      if (dateOfBirth > minimumAgeDate) {
        setError('You must be at least 16 years old to register.');
        return;
      }
      if (password !== confirmPassword) {
        setError(`Passwords don't match.`);
        return;
      }
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await firestore().collection('users').doc(user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        dateOfBirth: dateOfBirth.toISOString(),
      });
      console.log('User registered successfully!');
      navigation.navigate('Auth');
    } catch (err) {
      let errorMessage = err.message;
      if (errorMessage.includes(']')) {
        errorMessage = errorMessage.split(']')[1].trim();
      }
      setError(errorMessage);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.backgroundColor, globalStyles.flex]}>
      <View>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={style.title}>
          <Header title={'Create an account'} type={1} />
        </View>
        {error ? <Text style={style.error}>{error}</Text> : null}
        <View style={style.inputContainer}>
          <View style={style.instructions}>
            <Header title={'First name'} type={3} />
          </View>
          <TextInput
            autoCapitalize="none"
            style={style.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <View style={style.instructions}>
            <Header title={'Last name'} type={3} />
          </View>
          <TextInput
            autoCapitalize="none"
            style={style.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <View style={style.instructions}>
            <Header title={'Email'} type={3} />
          </View>
          <TextInput
            autoCapitalize="none"
            style={style.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={style.instructions}>
            <Header title={'Username'} type={3} />
          </View>
          <TextInput
            autoCapitalize="none"
            style={style.input}
            placeholder="Username"
            value={userName}
            onChangeText={setUserName}
          />
          <View style={style.instructions}>
            <Header title={'Birthday Date'} type={3} />
          </View>
          <TouchableOpacity
            style={style.input}
            onPress={() => setShowDatePicker(true)}>
            <Text style={style.datePickerText}>
              {dateOfBirth !== null
                ? dateOfBirth.toDateString()
                : 'Date of Birthday'}
            </Text>
          </TouchableOpacity>
          <View style={style.instructions}>
            <Header title={'Password'} type={3} />
          </View>
          <TextInput
            autoCapitalize="none"
            style={style.input}
            placeholder="******"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={style.instructions}>
            <Header title={'Confirm Password'} type={3} />
          </View>
          <TextInput
            autoCapitalize="none"
            style={style.input}
            placeholder="******"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={[
            style.button,
            {backgroundColor: isSignUpEnabled ? '#8a2be2' : '#ccc'},
          ]}
          onPress={handleRegister}
          disabled={!isSignUpEnabled}>
          <Text style={style.buttonText}>Register</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}>
            <View style={style.modalContainer}>
              <View style={style.modalContent}>
                <DateTimePicker
                  value={dateOfBirth || new Date()}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
                <Button
                  title="Close"
                  onPress={() => setShowDatePicker(false)}
                />
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
