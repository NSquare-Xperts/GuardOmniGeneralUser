import React from 'react'
import {Text, View, Image,TouchableWithoutFeedback} from 'react-native'
import { white_Original, green, green_select} from './color';
import {Actions} from 'react-native-router-flux'

//make component 
const HomeBottom = () => {
    const {bottomLayout,bottomTextStyle,thumbnail} = styles;
    return(

      
      <TouchableWithoutFeedback onPress={()=> Actions.MyId()}>
      <View style={bottomLayout}>       
              <Text style={bottomTextStyle}> MY ID </Text> 
              <Image
                   style={thumbnail}
                   source={require('../assets/Home/qr_code.png')}/>
      </View>
      </TouchableWithoutFeedback>
    );
};
const styles = {
  thumbnail: {
    height: 30,
    width: 30,
    marginLeft: 5
  },
  bottomTextStyle: {
    fontFamily: 'OpenSans-Bold',
    color : white_Original,
    fontSize: 20
   },
 
bottomLayout: {
  backgroundColor: green,
  width: '95.55%',
  height: 60,
  marginLeft: 10,
  borderRadius: 3,
  borderWidth: 2,
  borderColor: green_select,
  display: 'flex',
  //justifyContent: 'space-between',
   justifyContent: 'center',
   alignItems: 'center',
  // alignself: 'flex-end',
  flexDirection: 'row',
  padding: 5,
  marginTop: 10,
  marginBottom: 10
 }
}
export default HomeBottom;
