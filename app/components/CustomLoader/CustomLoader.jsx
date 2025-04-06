import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const CustomLoader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator testID="CustomLoader" color={'#8a2be2'} />
    </View>
  );
};

export default CustomLoader;
