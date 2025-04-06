import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {verticalScale, horizontalScale} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  profilePicture: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: Dimensions.get('window').height * 1,
    borderColor: '#8a2be2',
    borderWidth: 2,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    marginLeft: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  userName: {
    marginTop: verticalScale(4),
    color: 'black',
    fontWeight: '500',
  },
  aboutContainer: {
    marginLeft: horizontalScale(10),
    flex: 1,
  },
  numberOfCategory: {
    fontSize: 14,
    color: 'black',
    marginTop: verticalScale(4),
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
    color: 'black',
  },
  bioContainer: {
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(13),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
