import React from 'react';
import BackButton from '../BackButton/BackButton';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';
import Header from '../Header/Header';

const PurpleHeader = ({press, title}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={press} color={'white'} />
          <Header type={2} title={title} color={'white'} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PurpleHeader;
