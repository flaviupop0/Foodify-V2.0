import React from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import {confirmImage} from './assets';
import Header from '../../components/Header/Header';
import styles from './styles';
import {horizontalScale, verticalScale} from '../../../assets/styles/scaling';
import CustomButton from '../../components/CustomButton/CustomButton';
import {deleteAccount} from './utilities';

const DeleteAccountThirdStep = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center', marginTop: verticalScale(20)}}>
        <Header title="Your account has been deleted successfully" />
      </View>
      <View
        style={{marginTop: verticalScale(40), alignItems: 'center', flex: 1}}>
        <Image
          resizeMode="contain"
          source={confirmImage}
          style={{width: horizontalScale(280), height: verticalScale(280)}}
        />
        <CustomButton
          testID="deleteButton"
          onPress={async () => {
            await deleteAccount();
          }}
          title={'Close the app'}
          style={styles.buttonContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default DeleteAccountThirdStep;
