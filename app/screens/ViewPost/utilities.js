import React from 'react';
import auth from '@react-native-firebase/auth';

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
