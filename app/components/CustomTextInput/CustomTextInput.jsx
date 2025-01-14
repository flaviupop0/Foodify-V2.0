import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#4A4A4A',
  },
});

export default CustomTextInput;
