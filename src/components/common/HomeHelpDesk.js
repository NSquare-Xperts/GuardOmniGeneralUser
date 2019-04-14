
import React from 'react'
import {Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { blue, white_Original} from './color'
import { Actions } from 'react-native-router-flux'

//make component 
const HomeHelpDesk = () => {
    const {gridRowStyle, container, textTitleStyle,thumbnail,thumbnail_arrow,gridColStyle,textStyle} = styles;
    return(
      
      <View style={container}>
      <TouchableWithoutFeedback onPress={()=> Actions.Helpdesk()}>
        <View style={gridRowStyle}>
     
              <Image  style={thumbnail}
                      source={require('../assets/Home/helpdesk_option.png')}/>
                        
                      <View style={gridColStyle}>
                          <Text style={textTitleStyle}>Helpdesk </Text>
                
                          <Text style={textStyle}>Call to Helplines</Text>
                    
                      </View>

               <Image  style={thumbnail_arrow}
                       source={require('../assets/Home/right_custom_arrow.png')}/>
             
         </View> 
         </TouchableWithoutFeedback>            
      </View>
    
    );
};


const styles = {

  container: {
    backgroundColor: blue,
    width: '95.55%',
    height: 80,
    borderRadius: 3,
    borderWidth: 0.1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    justifyitems: 'center',
    marginTop: 12,
    elevation: 4

},
thumbnail: {
  height: 50,
  width: 50,
  alignSelf: 'center',
  marginLeft:25,
},
thumbnail_arrow: {
  height: 25,
  width: 25,
  display: 'flex',
  justifyContent: 'flex-end',
  alignSelf: 'center'
},
gridRowStyle: {
   width: '95.55%',
   flexDirection: 'row', 
   display: 'flex',
   justifyContent:'space-between'
},
gridColStyle: {
  width: '70%',
  display: 'flex',
  flexDirection: 'column', 
  justifyContent:'center'
},
textTitleStyle: {
  fontFamily: 'OpenSans-Regular',
  fontSize: 14,
  color: white_Original,
  alignSelf: 'flex-start',
  marginLeft: 15
},
textStyle: {
  fontFamily: 'OpenSans-Regular',
  fontSize: 12,
  color: white_Original,
  alignSelf: 'flex-start',
  marginLeft: 15
}

}

export default HomeHelpDesk;
