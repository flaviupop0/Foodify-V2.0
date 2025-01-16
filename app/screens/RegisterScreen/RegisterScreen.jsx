import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StatusBar,
} from 'react-native';
import auth, {sendEmailVerification} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';
import globalStyles from '../../../assets/styles/globalStyles';
import style from './style';
import BackButton from '../../components/BackButton/BackButton';
import Header from '../../components/Header/Header';
import CustomError from '../../components/CustomError/CustomError';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFirstViewOpen, setFirstViewOpen] = useState(true);
  const [isEmailViewOpen, setIsEmailViewOpen] = useState(false);
  const [isPasswordViewOpen, setIsPasswordViewOpen] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    firstPassword: false,
    secondPassword: false,
  });

  const resetError = () => {
    setTimeout(() => {
      setError('');
    }, 4000);
  };

  const togglePasswordVisibility = field => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const verifyEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setError('You must enter an email!');
      resetError();
      return;
    } else if (!emailRegex.test(email)) {
      setError('Invalid email format!');
      resetError();
      return;
    }
    const snapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

    if (!snapshot.empty) {
      setError('There is an account already associated to this email');
      resetError();
      return;
    }
    setIsEmailViewOpen(false);
    setIsPasswordViewOpen(true);
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

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setError(`Passwords don't match.`);
        resetError();
        return;
      }
      if (!password || !confirmPassword) {
        setError("Password can't be empty");
        resetError();
        return;
      }
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const defaultPictureAsset = Image.resolveAssetSource(
        require('../../../assets/Default_pfp.jpg'),
      ).uri;
      const defaultPictureBase64 = await fetchBase64(defaultPictureAsset);
      const storageRef = storage().ref(`profilePictures/${user.uid}.jpg`);
      await storageRef.putString(defaultPictureBase64, 'base64');
      const defaultProfilePictureURL = await storageRef.getDownloadURL();
      await firestore().collection('users').doc(user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        dateOfBirth: dateOfBirth.toISOString(),
        profilePicture: defaultProfilePictureURL,
      });
      navigation.navigate('Login');
      await sendEmailVerification(user);
      setIsPasswordViewOpen(false);
    } catch (err) {
      let errorMessage = err.message;
      if (errorMessage.includes(']')) {
        errorMessage = errorMessage.split(']')[1].trim();
      }
      setError(errorMessage);
      resetError();
    }
  };

  const verifyBirthDay = () => {
    const minimumAgeDate = new Date();
    minimumAgeDate.setFullYear(minimumAgeDate.getFullYear() - 16);
    if (dateOfBirth > minimumAgeDate) {
      setError('You must be at least 16 years old to register.');
      resetError();
      return false;
    }
    return true;
  };

  const verifyInputs = input => {
    if (!input) {
      setError('You must fill all the inputs!');
      resetError();
      return false;
    }
    return true;
  };

  const checkIfUsernameExists = async () => {
    const snapshot = await firestore()
      .collection('users')
      .where('userName', '==', userName)
      .get();

    if (!snapshot.empty) {
      setError('Username taken');
      resetError();
      return false;
    }
    return true;
  };

  const firstView = () => {
    if (isFirstViewOpen === true) {
      return (
        <SafeAreaView style={[globalStyles.backgroundColor, globalStyles.flex]}>
          <StatusBar
            translucent={false}
            backgroundColor={'#FFFFFF'}
            barStyle={'dark-content'}
          />
          <View>
            <BackButton
              onPress={() => navigation.goBack()}
              title={'Create an account'}
            />
          </View>
          <View style={style.title}>
            <Header title={'We would love to meet you'} type={1} />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              style={style.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={style.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              autoCapitalize="none"
              style={style.input}
              placeholder="Username"
              value={userName}
              onChangeText={setUserName}
            />
            <TouchableOpacity
              style={style.datePickerButton}
              onPress={() => setShowDatePicker(true)}>
              <Text
                style={[
                  style.dateText,
                  {color: hasSelectedDate ? '#000000' : '#A0A0A0'},
                ]}>
                {hasSelectedDate
                  ? new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date(dateOfBirth))
                  : 'Birthday date'}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={showDatePicker}
              date={dateOfBirth}
              mode="date"
              onConfirm={date => {
                setShowDatePicker(false);
                setDateOfBirth(date);
                setHasSelectedDate(true);
              }}
              onCancel={() => {
                setShowDatePicker(false);
              }}
            />
          </View>
          {error ? <CustomError error={error} /> : null}
          <TouchableOpacity
            style={style.button2}
            onPress={async () => {
              const usernameExists = await checkIfUsernameExists();
              if (
                !usernameExists ||
                !verifyInputs(firstName) ||
                !verifyInputs(lastName) ||
                !verifyInputs(userName) ||
                !verifyInputs(hasSelectedDate) ||
                !verifyBirthDay()
              ) {
                return;
              }
              setFirstViewOpen(false);
              setIsEmailViewOpen(true);
            }}>
            <Text style={style.buttonText}>Next</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
  };

  const renderEmailView = () => {
    if (isEmailViewOpen) {
      return (
        <SafeAreaView style={[globalStyles.backgroundColor, globalStyles.flex]}>
          <View>
            <BackButton
              onPress={() => {
                setIsEmailViewOpen(false);
                setFirstViewOpen(true);
              }}
              title={'Email address'}
            />
          </View>
          <View style={style.title}>
            <Header title={'Where should we contact you?'} type={1} />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              autoCapitalize="none"
              style={style.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          {error ? <CustomError error={error} /> : null}
          <TouchableOpacity
            style={style.button2}
            onPress={async () => {
              verifyEmail();
            }}>
            <Text style={style.buttonText}>Next</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
  };

  const renderPasswordView = () => {
    if (isPasswordViewOpen) {
      return (
        <SafeAreaView style={[globalStyles.backgroundColor, globalStyles.flex]}>
          <View>
            <BackButton
              onPress={() => {
                setIsPasswordViewOpen(false);
                setIsEmailViewOpen(true);
              }}
              title={'Password'}
            />
          </View>
          <View style={style.title}>
            <Header title={'Make sure to set a good password'} type={1} />
          </View>
          <View style={style.inputContainer}>
            <View style={style.passwordContainer}>
              <TextInput
                autoCapitalize="none"
                style={style.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisibility.firstPassword}
              />
              <TouchableOpacity
                onPress={() => togglePasswordVisibility('firstPassword')}
                style={style.iconContainer}>
                <Ionicons
                  name={
                    passwordVisibility.firstPassword
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <View style={style.passwordContainer}>
              <TextInput
                autoCapitalize="none"
                style={style.passwordInput}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!passwordVisibility.secondPassword}
              />
              <TouchableOpacity
                onPress={() => togglePasswordVisibility('secondPassword')}
                style={style.iconContainer}>
                <Ionicons
                  name={
                    passwordVisibility.secondPassword
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
          {error ? <CustomError error={error} /> : null}
          <TouchableOpacity
            style={style.button2}
            onPress={() => {
              handleRegister();
            }}>
            <Text style={style.buttonText}>Register</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[globalStyles.backgroundColor, globalStyles.flex]}>
        {firstView()}
        {renderEmailView()}
        {renderPasswordView()}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
