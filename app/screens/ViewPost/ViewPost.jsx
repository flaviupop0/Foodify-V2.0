import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import styles from './styles';
import {formatDate, isLiked} from './utilities';
import Icon from 'react-native-vector-icons/FontAwesome';
import {horizontalScale} from '../../../assets/styles/scaling';

const ViewPost = ({route, navigation}) => {
  const {postData, userData} = route.params;
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      const liked = await isLiked(postData.likes);
      setIsLikedByCurrentUser(liked);
    };

    checkIfLiked();
  }, [postData.likes]);

  console.log('Post Data:', postData);
  console.log('User Data:', userData);

  const renderPhotos = () => {
    const photosToShow = postData.pictures.slice(0, 4);
    const extraPhotosCount = postData.pictures.length - 4;

    return (
      <View style={styles.photoGrid}>
        {photosToShow.map((photo, index) => (
          <View key={index} style={styles.photoWrapper}>
            <Image source={{uri: photo}} style={styles.photo} />
            {index === 3 && extraPhotosCount > 0 && (
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{extraPhotosCount} more</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <PurpleHeader press={() => navigation.goBack()} title={postData?.title} />
      <View style={styles.postContainer}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <ProfilePicture
            imageUrl={userData?.profilePicture}
            style={styles.profilePicture}
          />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{userData?.userName}</Text>
            <Text style={styles.timestamp}>
              {formatDate(postData.datePosted)}
            </Text>
          </View>
        </View>

        {/* Post Content */}
        <Text style={styles.description}>{postData.recipe}</Text>
        {renderPhotos()}

        {/* Interaction Section */}
        <View style={styles.interactionSection}>
          {/* Like Button */}
          <TouchableOpacity
            style={[
              styles.interactionButton,
              {marginLeft: horizontalScale(10)},
            ]}>
            <Icon
              name="thumbs-up"
              size={20}
              color={isLikedByCurrentUser ? '#8a2be2' : '#888'}
            />
            <Text
              style={[
                styles.likes,
                {color: isLikedByCurrentUser ? '#8a2be2' : '888'},
              ]}>
              {postData.likes.length} Like{' '}
              {postData.likes.length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>

          {/* Comment Button */}
          <TouchableOpacity style={styles.interactionButton}>
            <Icon name="comment" size={20} color="#888" />
            <Text style={styles.comments}>
              {postData?.comments?.length} Comment
              {postData?.comments?.length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity
            style={[
              styles.interactionButton,
              {marginRight: horizontalScale(10)},
            ]}>
            <Icon name="share" size={20} color="#888" />
            <Text style={styles.comments}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewPost;
