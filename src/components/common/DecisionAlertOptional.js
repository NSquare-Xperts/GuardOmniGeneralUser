import React from 'react';
import { View, Text } from 'react-native';
import { black, white_Original, grey } from './color';
import { Content } from 'native-base';

const DecisionAlert = ({ label, value }) => {
  const { labelStyle, containerStyle,displayStyle} = styles;
  return (
  <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center'}}>
           
            <View style={containerStyle}>

                <Text style={labelStyle}>Update Profile Details ? </Text>
                <Text style={labelStyle}>Updated profile information will be saved </Text>

            </View>
  
  
  </View>
    );
};

const styles = {
  labelStyle: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: black,
  },
  displayStyle: {
    display: 'flex' , 
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: '95.55%',
    height: '20%',
    borderRadius: 3,
    padding: 10,
    flexDirection: 'column',
    backgroundColor: white_Original,
    justifyContent: 'center',
    //alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center', 
    elevation: 4
      // height: 40,
    // flex: 1,
    // flexDirection: 'row',
    // 
  }
};
export { DecisionAlert };
