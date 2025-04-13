import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
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

export const isSaved = async savedBy => {
  const currentUser = await auth().currentUser;
  return savedBy.some(user => user?.userID === currentUser.uid);
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

export const handleAddComment = async (
  text,
  currentUserData,
  setComments,
  userId,
  postID,
  navigation,
  route,
) => {
  const currentUser = await auth().currentUser;
  const db = getFirestore();
  try {
    const postRef1 = doc(db, 'users', userId, 'posts', postID);
    const postSnapshot1 = await getDoc(postRef1);
    const postData1 = postSnapshot1.data();
    const comments = postData1?.comments || [];
    const newComment = {
      userName: currentUserData.userName,
      text,
      date: new Date().toISOString(),
      profilePicture: currentUserData.profilePicture,
      userID: currentUser.uid,
    };
    let updatedComments = [...comments, newComment];
    setComments(updatedComments);
    await updateDoc(postRef1, {
      comments: updatedComments,
    });
    navigation.setParams({
      postData: {
        ...route.postData,
        comments: updatedComments,
      },
    });
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

export const savePost = async (
  postID,
  userId,
  isSavedByCurrentUser,
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
    const savedBy = postData?.savedBy || [];
    let updatedSavedBy, updatedPersonalSavedBy;

    const personalRef = doc(db, 'users', currentUser.uid, 'savedPosts', userId);
    const personalSnapshot = await getDoc(personalRef);
    const personalData = personalSnapshot.exists
      ? personalSnapshot.data()
      : null;
    const savedPostIds = personalData?.postIds || [];

    if (!personalSnapshot.exists) {
      await setDoc(personalRef, {postIds: []});
    }

    if (isSavedByCurrentUser) {
      updatedSavedBy = savedBy.filter(user => user?.userID !== currentUser.uid);
      updatedPersonalSavedBy = savedPostIds.filter(postId => postId !== postID);
      await updateDoc(personalRef, {
        postIds: updatedPersonalSavedBy,
      });
      await updateDoc(postRef, {
        savedBy: updatedSavedBy,
      });
      navigation.setParams({
        postData: {
          ...route.postData,
          savedBy: updatedSavedBy,
        },
      });
      return false;
    } else {
      updatedPersonalSavedBy = [...savedPostIds, postID];
      await updateDoc(personalRef, {
        postIds: updatedPersonalSavedBy,
      });
      const newIsSaved = {
        userID: currentUser.uid,
        date: new Date().toISOString(),
        userName: currentUserData.userName,
      };
      updatedSavedBy = [...savedBy, newIsSaved];
      await updateDoc(postRef, {
        savedBy: updatedSavedBy,
      });
      navigation.setParams({
        postData: {
          ...route.postData,
          savedBy: updatedSavedBy,
        },
      });
      return true;
    }
  } catch (error) {
    console.error('Error updating post likes:', error);
  }
};
