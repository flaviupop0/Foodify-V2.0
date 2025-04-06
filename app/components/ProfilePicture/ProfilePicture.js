import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {verticalScale} from '../../../assets/styles/scaling';
const ProfilePicture = ({imageUrl, style}) => {
  return (
    <View>
      <Image
        source={{uri: imageUrl}}
        style={style ? style : styles.image}
        resizeMode="c"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    borderRadius: Dimensions.get('window').height * 1,
    borderColor: '#8a2be2',
    borderWidth: 1,
  },
});
export default ProfilePicture;
