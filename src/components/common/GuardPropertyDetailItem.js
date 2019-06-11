import React from 'react';
import {TouchableWithoutFeedback,Text, View, Image } from 'react-native';
import { red_lighter, white_Original, black} from './color'
import { Actions } from 'react-native-router-flux'

//make component 
const GuardPropertyDetailItem = () => {
    const {gridRowStyle, container, thumbnail,gridColStyle,textStyle,textBoldStyle} = styles;
    return(
      <TouchableWithoutFeedback onPress={()=> Actions.profileDetails()}>
      <View style={container}>
        <View style={gridRowStyle}>
     
          <Image  style={thumbnail}
          source={require('../assets/Home/sample_property_icn.png')}/>
                    
              <View style={gridColStyle}>
                
                <Text style={textBoldStyle} >
                  Sky Villa Apartments</Text>
          
                <Text style={textStyle}> +65 1234 12334</Text>
              
                <Text style={textStyle}>
                Flat 201 ...</Text>

                <Text style={textStyle}>
                Tenant</Text>
                </View>
              </View>
      </View>
      </TouchableWithoutFeedback>
    );
};

const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    borderRadius: 3,
    borderWidth: 0.1,
    //width: Dimensions.get('window').width,
    height: 130,
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    elevation: 4,
  },
  thumbnail: {
    height: '100%',
    width: 110,
    alignSelf: 'center',
    marginLeft:0,
  },
  thumbnail_info: {
    height: 30,
    width: 30,
    marginRight: 20,
    marginBottom: 20,
    alignSelf: 'flex-end'
  },
 
  gridRowStyle: {
     flexDirection: 'row', 
     justifyContent:'flex-start'
  },
  gridColStyle: {
    flexDirection: 'column', 
    justifyContent:'center',
 },
  textStyle: {
    fontFamily: 'OpenSans',
    color: black,
    fontSize: 12,
    flexWrap: 'wrap' , 
    maxWidth: 200, 
    numberOfLines: 1,
    alignSelf: 'flex-start',
    marginLeft: 15, 
    flexShrink: 1,
    ellipsizeMode: 'tail'
  },
  textBoldStyle: {
    fontFamily: 'OpenSans-Bold',
    color: black,
    flexWrap: 'wrap' , 
    maxWidth: 200, 
    numberOfLines: 1,
    alignSelf: 'flex-start',
    marginLeft: 15, 
    flexShrink: 1,
    fontSize: 18,
    ellipsizeMode: 'tail'
  }
}

export default GuardPropertyDetailItem;
