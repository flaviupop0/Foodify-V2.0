import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import PurpleHeader from '../../components/PurpleHeader/PurpleHeader';
import styles from './styles';
import {
  formatDate,
  isLiked,
  likePost,
  handleAddComment,
  isSaved,
  savePost,
} from './utilities';
import Icon from 'react-native-vector-icons/FontAwesome';
import {horizontalScale} from '../../../assets/styles/scaling';
import {useSelector} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Comments from '../../components/Comments/Comments';

const ViewPost = ({route, navigation}) => {
  const {postData, userData} = route.params;
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
  const [comments, setComments] = useState(postData.comments || []);
  const [isSavedByCurrentUser, setIsSavedByCurrentUser] = useState(false);
  const currentUserData = useSelector(state => state.user.profile);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    const checkIfLiked = async () => {
      const liked = await isLiked(postData.likes);
      setIsLikedByCurrentUser(liked);
    };

    const checkeIsSaved = async () => {
      const saved = await isSaved(postData?.savedBy);
      setIsSavedByCurrentUser(saved);
    };

    checkIfLiked();
    checkeIsSaved();
  }, [postData?.likes, postData?.savedBy]);

  const handleAddCommentCallback = async text => {
    await handleAddComment(
      text,
      currentUserData,
      setComments,
      postData.postedBy,
      postData.id,
      navigation,
      route.params,
    );
  };

  const renderPhotos = () => {
    const photosToShow = postData.pictures.slice(0, 4);
    const extraPhotosCount = postData.pictures.length - 4;

    if (photosToShow.length === 1) {
      return (
        <View style={styles.singlePhotoWrapper}>
          <Image source={{uri: photosToShow[0]}} style={styles.singlePhoto} />
        </View>
      );
    }

    if (photosToShow.length === 2) {
      return (
        <View style={styles.photoGrid}>
          {photosToShow.map((photo, index) => (
            <View key={index} style={styles.twoPhotoWrapper}>
              <Image source={{uri: photo}} style={styles.photo2} />
            </View>
          ))}
        </View>
      );
    }

    if (photosToShow.length === 3) {
      return (
        <View style={styles.photoGrid}>
          <View style={styles.row}>
            <View style={styles.photoWrapper}>
              <Image source={{uri: photosToShow[0]}} style={styles.photo} />
            </View>
            <View style={styles.photoWrapper}>
              <Image source={{uri: photosToShow[1]}} style={styles.photo} />
            </View>
          </View>
          <View style={styles.centeredRow}>
            <View style={styles.photoWrapper}>
              <Image source={{uri: photosToShow[2]}} style={styles.photo} />
            </View>
          </View>
        </View>
      );
    }

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
    <KeyboardAvoidingView
      behavior="position"
      contentContainerStyle={{flex: 1}}
      style={{flex: 1, backgroundColor: '#f5f5f5'}}>
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
          {/* Save Button */}
          <TouchableOpacity
            onPress={async () => {
              const result = await savePost(
                postData.id,
                postData.postedBy,
                isSavedByCurrentUser,
                currentUserData,
                navigation,
                route.params,
              );
              setIsSavedByCurrentUser(result);
            }}
            style={[
              styles.interactionButton,
              {
                flexDirection: 'column',
                position: 'absolute',
                right: 0,
                top: horizontalScale(5),
              },
            ]}>
            <Icon
              name="bookmark"
              size={20}
              color={isSavedByCurrentUser ? '#8a2be2' : '#888'}
            />
            <Text
              style={[
                styles.comments,
                {color: isSavedByCurrentUser ? '#8a2be2' : '#888'},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <Text style={styles.description}>{postData.recipe}</Text>
        {renderPhotos()}

        {/* Interaction Section */}
        <View style={styles.interactionSection}>
          {/* Like Button */}
          <TouchableOpacity
            testID="likeButton"
            onPress={async () => {
              const result = await likePost(
                postData.id,
                postData.postedBy,
                isLikedByCurrentUser,
                currentUserData,
                navigation,
                route.params,
              );
              setIsLikedByCurrentUser(result);
            }}
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
                {color: isLikedByCurrentUser ? '#8a2be2' : '#888'},
              ]}>
              {postData.likes.length} Like
              {postData.likes.length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>

          {/* Comment Button */}
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.expand();
            }}
            style={styles.interactionButton}>
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

      {/* Bottom Sheet for Comments */}
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={['40%']}
        index={-1}
        handleIndicatorStyle={{
          backgroundColor: '#888',
        }}
        style={styles.shadow}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => bottomSheetRef.current?.close()}>
            <Icon name="close" size={25} color="white" />
          </TouchableOpacity>
          <Comments
            comments={comments}
            onAddComment={handleAddCommentCallback}
          />
        </BottomSheetView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default ViewPost;
