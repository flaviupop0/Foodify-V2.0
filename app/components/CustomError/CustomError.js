import React from 'react';
import {Text, View} from 'react-native';
import style from './Style';

const CustomError = props => {
  return (
    <View style={style.mainAlertView}>
      <View style={style.verticalRedLine} />
      <View style={{flex: 1}}>
        <Text testID={props.testID} style={style.alertText}>
          {props.error}
        </Text>
      </View>
    </View>
  );
};

export default CustomError;
