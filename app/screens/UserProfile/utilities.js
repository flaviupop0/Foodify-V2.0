import React from 'react';
import firestore from '@react-native-firebase/firestore';

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

export const getAllPosts = async userID => {
  try {
    const postsSnapshot = await firestore()
      .collection('users')
      .doc(userID)
      .collection('posts')
      .orderBy('datePosted', 'desc')
      .limit(10)
      .get();

    const posts = [];
    postsSnapshot.forEach(doc => {
      posts.push({id: doc.id, ...doc.data()});
    });

    return posts;
  } catch (error) {
    console.error('Error fetching user posts: ', error);
    return [];
  }
};
