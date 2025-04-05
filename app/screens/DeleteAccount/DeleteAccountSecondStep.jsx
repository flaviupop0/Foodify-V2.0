import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {scaleFontSize, verticalScale} from '../../../assets/styles/scaling';
import {Routes} from '../../navigation/Routes';
import Header from '../../components/Header/Header';
import {wonderingImage} from './assets';
import CustomButton from '../../components/CustomButton/CustomButton';
import {goBack} from './utilities';

const DeleteAccountSecondStep = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          goBack(navigation);
        }}
        style={styles.backButton}>
        <Icon name={'x'} color={'black'} size={scaleFontSize(20)} />
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Header title={'Delete account'} type={1} />
        <Text style={styles.confirmationMessage}>
          Are you really sure you want to delete your account?
        </Text>
        <Image source={wonderingImage} style={styles.firstImage} />
        <Text style={[styles.confirmationMessage, {marginTop: 0}]}>
          We are very sorry that you are leaving our community
        </Text>
      </View>
      <CustomButton
        style={[
          styles.buttonContainer,
          {
            bottom: verticalScale(80),
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 0.5,
          },
        ]}
        textStyle={{color: 'black'}}
        title={'Cancel'}
        onPress={() => {
          goBack(navigation);
        }}
      />
      <CustomButton
        onPress={() => {
          navigation.navigate(Routes.DeleteAccountThirdStep);
        }}
        style={[styles.buttonContainer, {bottom: verticalScale(30)}]}
        title={'Confirm'}
      />
    </SafeAreaView>
  );
};

export default DeleteAccountSecondStep;
