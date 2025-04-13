import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  commentsList: {
    paddingBottom: verticalScale(80),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: horizontalScale(10),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: horizontalScale(35),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: verticalScale(20),
    paddingHorizontal: horizontalScale(10),
  },
  sendButton: {
    backgroundColor: '#8a2be2',
    borderRadius: 50,
    padding: horizontalScale(10),
    marginLeft: verticalScale(10),
  },
  commentItem: {
    flexDirection: 'row',
    padding: horizontalScale(10),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomColor: '#ddd',
    marginTop: verticalScale(5),
  },
  avatar: {
    marginRight: horizontalScale(10),
    width: horizontalScale(35),
    height: horizontalScale(35),
    borderRadius: horizontalScale(20),
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: verticalScale(5),
    color: '#555',
  },
  noCommentsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: horizontalScale(20),
  },
  noComments: {
    color: '#888',
    fontStyle: 'italic',
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default styles;
