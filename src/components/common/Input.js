import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { black, white_Original, grey, grey_lighter } from './color';


const Input = ({ label, value, onChangeText, placeholder, secureTextEntry,multiline }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
      <TextInput
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
  );
};

const styles = {
  inputStyle: {
      height: 55,
      width: '90%',
      color: black, 
      backgroundColor: white_Original,
      borderRadius: 27,
      alignSelf: 'center',
      shadowRadius: 4,
      borderColor: grey_lighter, 
      borderWidth: 2, 
      marginTop: 15,
      paddingLeft: 25,
      fontFamily: 'OpenSans-Regular', 
      fontSize: 12
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
