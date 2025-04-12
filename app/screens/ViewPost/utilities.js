import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from '@react-native-firebase/firestore';

export const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isLiked = async likes => {
  const currentUser = await auth().currentUser;
  return likes.some(like => like?.userID === currentUser.uid);
};

export const likePost = async (
  postID,
  userId,
  isLiked,
  currentUserData,
  navigation,
  route,
) => {
  const currentUser = await auth().currentUser;
  const db = getFirestore();
  try {
    const postRef = doc(db, 'users', userId, 'posts', postID);
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();
    const likedUsers = postData?.likes || [];
    let updatedLikes;

    if (isLiked) {
      updatedLikes = likedUsers.filter(
        like => like?.userID !== currentUser.uid,
      );
      await updateDoc(postRef, {
        likes: updatedLikes,
      });
      navigation.setParams({
        postData: {
          ...route.postData,
          likes: updatedLikes,
        },
      });
      return false;
    } else {
      const newLike = {
        userID: currentUser.uid,
        date: new Date().toISOString(),
        userName: currentUserData.userName,
        profilePicture: currentUserData.profilePicture,
      };
      updatedLikes = [...likedUsers, newLike];
      await updateDoc(postRef, {
        likes: updatedLikes,
      });
      navigation.setParams({
        postData: {
          ...route.postData,
          likes: updatedLikes,
        },
      });
      return true;
    }
  } catch (error) {
    console.error('Error updating post likes:', error);
  }
};
