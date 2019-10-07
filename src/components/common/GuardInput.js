import React from 'react';
import { TextInput, View, Image,TouchableWithoutFeedback } from 'react-native';
import { black, white_Original,grey_lighter } from './color';
import { Actions } from 'react-native-router-flux';

const GuardInput = ({ label, value, onChangeText, placeholder, secureTextEntry,multiline }) => {
  const { inputStyle } = styles;
  return (
      
    <View style={styles.container}>
     <TouchableWithoutFeedback onPress={()=> Actions.GuardPropertyDetails()}>
        <View style={styles.SectionStyle}>
          <TextInput
              style={{flex:1, padding: 23}}
              placeholder="Enter to Search"
              underlineColorAndroid="transparent"/>
          
          <Image source={require('../assets/guard/home/search_input.png')}
          style={styles.ImageStyle} />
        
        </View>
        </TouchableWithoutFeedback>
      </View>
  );
};

const styles = {

  container: {
    //flex: 1,
    //height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
    //padding: 30
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white_Original,
    borderWidth: .5,
    borderColor: grey_lighter,
    height: 40,
    borderRadius: 20 ,
    margin: 10,
    // paddingTop: 10,
    // paddingBottom: 10
},
ImageStyle: {
    padding: 15,
    marginRight:20,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center',
    alignSelf: 'flex-end'
   // flexDirection: 'flex-end'
}

};

export { GuardInput };
