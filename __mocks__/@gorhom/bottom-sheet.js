import React from 'react';
import {View} from 'react-native';

const BottomSheet = ({children, ...props}) => {
  return <View {...props}>{children}</View>;
};

const BottomSheetView = ({children, ...props}) => {
  return <View {...props}>{children}</View>;
};

export default BottomSheet;
export {BottomSheetView};
