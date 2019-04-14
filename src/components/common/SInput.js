import React from 'react';
import { Image, View, Text } from 'react-native';
import { black, white_Original, grey, grey_lighter } from './color';


const SInput = (props) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Image
        style={{height: 30, width: 30}}
          source={require('../assets/Home/notice_option.png')} />
        <Text>hi</Text>
        <Text>Message</Text>
        
    <Text>{props.value} {props.label}</Text>
    </View>

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
      fontSize: 12,
      color: black
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
  
export {SInput};
