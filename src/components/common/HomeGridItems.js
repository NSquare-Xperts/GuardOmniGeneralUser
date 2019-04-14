import React from 'react'
import {Text, View, Image,Dimensions} from 'react-native'
//import { Content } from 'native-base';

//make component 
const HomeGridItems = () => {
    const {textStyle, card, thumbnail} = styles;
    return(

      <View style={card}>       
              
              <Image
              style={thumbnail}
              source={require('../assets/fullscreen.jpg')}/>

              <Text styles={textStyle}> Guard Omni </Text>

      </View>
    );
};
const styles = {
  
    // thumbnail: {
    //   height: 50,
    //   width: 50,
    //   position: 'absolute',
    //   top:0,
    //   left: 0,
    //   marginTop: 15 
    // },
    thumbnail: {
      height: 50,
      width: 50,
      display: 'flex',
    },
    textStyle: {
      fontSize: 14,
      color: 'black',
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
  },
  card: {
        backgroundColor: 'white',
        width: (Dimensions.get('window').width / 2) - 15,
        height: 200,
        marginLeft: 8,
        marginRight:3,
        marginTop: 10,
        elevation: 4,
        justifyContent: 'space-between',
      }
    
  }
export default HomeGridItems;
