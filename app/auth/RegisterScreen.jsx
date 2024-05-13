import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);

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
  });

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
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />
      <View style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>Date of birthday</Text>
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: isSignUpEnabled ? '#8a2be2' : '#ccc'},
        ]}
        onPress={handleRegister}
        disabled={!isSignUpEnabled}>
        <Text style={styles.buttonText}>Register</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'PoetsenOne-Regular',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#ccc',
  },
  button: {
    width: '100%',
    height: 50,
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
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default RegisterScreen;
