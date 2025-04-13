import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import ProfilePicture from '../ProfilePicture/ProfilePicture';

const Comments = ({comments, onAddComment}) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={{flex: 1}}>
      {/* Comments List */}
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.commentItem,
              {
                borderTopWidth: index === 0 ? 1 : 0,
              },
            ]}>
            <ProfilePicture
              imageUrl={item.profilePicture}
              style={styles.avatar}
            />
            <View style={styles.commentContent}>
              <Text style={styles.username}>{item.userName}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
              {item?.date && (
                <Text style={styles.commentDate}>{formatDate(item.date)}</Text>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noComments}>
              No comments yet. Be the first to comment!
            </Text>
          </View>
        }
        contentContainerStyle={styles.commentsList} // Ensures proper padding for the list
      />

      {/* Add Comment Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
