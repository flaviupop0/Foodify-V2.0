import React from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';

const NewsFeed = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={{fontSize: 30}}>NewsFeed</Text>
    </SafeAreaView>
  );
};

export default NewsFeed;
