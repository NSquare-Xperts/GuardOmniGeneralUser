import React from 'react'
import {Text, View, Image,TouchableWithoutFeedback} from 'react-native'
import { white_Original,  orange } from './color'
import {Actions} from 'react-native-router-flux'

//make component 
const HomeNumberOfNotices = (props) => {
    const {gridRowStyle, container, textTitleStyle,thumbnail,textNoStyle,gridColStyle,textStyle} = styles;
    return(
     
      <View style={container}>
        <View style={gridRowStyle}>
              <Image  style={thumbnail}
                      source={require('../assets/Notices/notice_option_large.png')}/>
                      <View style={gridColStyle}>
                          <Text style={textTitleStyle}>Notice</Text>
                          <Text style={textStyle}>This month</Text>
                      </View>
               <Text style={textNoStyle}>{props.month_count}</Text>    
         </View>             
      </View>
      
    );
};
const styles =  {

  container: {
    backgroundColor: orange,
    width: '95.55%',
    height: 130,
    borderRadius: 3,
    borderWidth: 0.1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    justifyitems: 'center',
    marginTop: 10,
    elevation: 4

},
thumbnail: {
  height: 80,
  width: 80,
  alignSelf: 'center',
  marginLeft:5,
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
  width: '60%',
  display: 'flex',
  flexDirection: 'column', 
  justifyContent:'center'
},
textTitleStyle: {
  fontFamily: 'OpenSans-Bold',
  fontSize: 18,
  color: white_Original,
  alignSelf: 'flex-start',
  marginLeft: 15
},
textNoStyle: {
  fontFamily: 'OpenSans-Bold',
  fontSize: 30,
  color: white_Original,
  //alignSelf: 'flex-start',
  justifyContent: 'center',
  alignSelf: 'center',
},
textStyle: {
  fontFamily: 'OpenSans',
  fontSize: 12,
  color: white_Original,
  alignSelf: 'flex-start',
  marginLeft: 15
}
}


export default HomeNumberOfNotices;
