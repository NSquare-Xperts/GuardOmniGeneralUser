import React from 'react';
import {Text, View, Image} from 'react-native';
import {  white_Original, pink,light_blue } from './color';

const HOmeMaintaince = (props) => {
    const {gridRowStyle, container, textTitleStyle,thumbnail,textNoStyle,gridColStyle,textStyle} = styles;
    return(
      <View style={container}>
        <View style={gridRowStyle}>
              <Image  style={thumbnail}
                      source={require('../assets/Complaints/complaints_option_large.png')}/>
                      <View style={gridColStyle}>
                          <Text style={textTitleStyle}>Maintaince</Text>
                          <Text style={textStyle}>{props.flatno}</Text>
                      </View>
               <Text style={textNoStyle}></Text>
                      
         </View>             
      </View>
    );
};
const styles =  {

container: {
    backgroundColor: light_blue,
    width: '96%',
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
  justifyContent: 'center',
  alignSelf: 'center',
},
textStyle: {
  fontFamily: 'OpenSans-Regular',
  fontSize: 12,
  color: white_Original,
  alignSelf: 'flex-start',
  marginLeft: 15
}
}
export default HOmeMaintaince;
