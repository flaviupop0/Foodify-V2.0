import {StyleSheet, Dimensions} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
    margin: verticalScale(10),
    borderRadius: verticalScale(10),
    padding: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  userDetails: {
    marginLeft: horizontalScale(10),
  },
  username: {
    fontSize: scaleFontSize(14),
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: scaleFontSize(12),
    color: '#888',
  },
  description: {
    fontSize: scaleFontSize(14),
    color: '#333',
    marginBottom: verticalScale(10),
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: verticalScale(10),
  },
  photoWrapper: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: verticalScale(10),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(10),
  },
  overlayText: {
    color: 'white',
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
  },
  interactionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    borderTopWidth: verticalScale(1),
    borderTopColor: '#eee',
    paddingTop: verticalScale(10),
    width: '100%',
  },
  interactionButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  likes: {
    fontSize: scaleFontSize(14),
    fontWeight: 'bold',
    color: '888',
    marginLeft: horizontalScale(2),
  },
  comments: {
    fontSize: scaleFontSize(14),
    fontWeight: 'bold',
    color: '#888',
    marginLeft: horizontalScale(2),
  },
  profilePicture: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    borderRadius: Dimensions.get('window').height * 1,
    borderColor: '#8a2be2',
    borderWidth: 2,
  },
});

export default styles;
