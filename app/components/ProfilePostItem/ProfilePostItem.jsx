import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '../Header/Header';
import {horizontalScale, verticalScale} from '../../../assets/styles/scaling';

const ProfilePostItem = ({post, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}>
      <Image source={{uri: post.pictures[0]}} style={styles.image} />
      <View style={{paddingLeft: horizontalScale(5), overflow: 'hidden'}}>
        <Header type={2} title={post.title} color={'#8a2be2'} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#8a2be2',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    borderColor: '#8a2be2',
    width: '40%',
    paddingBottom: verticalScale(10),
  },
  image: {
    width: '100%',
    height: verticalScale(130),
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfilePostItem;
