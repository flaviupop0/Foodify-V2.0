import React from 'react';
import firestore from '../../../__mocks__/@react-native-firebase/firestore';

export const getUserData = async userID => {
  try {
    const userDoc = await firestore().collection('users').doc(userID).get();

    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data: ', error);
    return null;
  }
};
