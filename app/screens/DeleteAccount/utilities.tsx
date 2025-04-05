import React from 'react';
import {Routes} from '../../navigation/Routes';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const goBack = (navigation: {
  reset: (arg0: {index: number; routes: {name: string}[]}) => void;
}) => {
  navigation.reset({
    index: 1,
    routes: [{name: Routes.LoggedInScreen}, {name: Routes.Settings}],
  });
};

const user = auth().currentUser;
export const checkPassword = async (currentPassword: string) => {
  if (!currentPassword) {
    return false;
  }

  if (!user || !user.email) {
    return 'User not found';
  }

  const credential = auth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );

  try {
    await user.reauthenticateWithCredential(credential);
    return true;
  } catch (error: any) {
    return 'Current password is incorrect';
  }
};

export const deleteAccount = async () => {
  try {
    await firestore().collection('users').doc(user?.uid).delete();
    await user?.delete();

    return true;
  } catch (error: any) {
    console.log('Error:', error);
  }
};
