import React from 'react';
import {Text, View} from 'react-native';
import { black } from './color';

//make component 
const NotificationListItem = () => {
    const {gridRowStyle, textStyleTitle,gridColStyle,textStyle,textStyleDate} = styles;
    return(
      <View>     
        <View style={gridRowStyle}>
              <View style={gridColStyle}>
                          <Text style={textStyle}>Block A lift is not working</Text>
                          <Text style={textStyleTitle}>Nunc vitae arcu vel justo lobortis dictum volutpat sit amet nibh. Donec 
                          condimentum blandit rutrum. </Text>
              </View>
         </View>             
      </View>
    
    );
};
const styles = {
  container: {
    backgroundColor: 'white',
    width: '95.55%',
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    justifyitems: 'center',
    elevation: 4,
    borderRadius: 2
},
thumbnail: {
  height: 50,
  width: 50,
  alignSelf: 'center',
  marginLeft:25,
},
thumbnail_arrow: {
  height: 18,
  width: 18,
  display: 'flex',
  justifyContent: 'flex-end',
  alignSelf: 'flex-start'
},
gridRowStyle: {
   width: '95.55%',
   flexDirection: 'row', 
   display: 'flex',
   padding: 10,
   justifyContent:'space-between'
},
gridColStyle: {
  width: '95%',
  display: 'flex',
  flexDirection: 'column', 
  justifyContent:'center'
},
textStyle: {
  fontFamily: 'OpenSans-Bold',
  fontSize: 14,
  color: black,
  alignSelf: 'flex-start',
  marginLeft: 15
},
textStyleDate: {
  fontFamily: 'OpenSans-Regular',
  fontSize: 12,
  color: black,
  alignSelf: 'flex-start',
  marginLeft: 1,
  marginTop: 2
},
textStyleTitle: {
  fontFamily: 'OpenSans-Regular',
  fontSize: 12,
  color: black,
  alignSelf: 'flex-start',
  marginLeft: 15,
  marginTop: 2
},
rightSideButtonStyles: {
   display:'flex',
   flexDirection: 'column', 
   justifyContent: 'center',
   alignContent: 'flex-start',
   alignSelf: 'flex-start',
   marginRight: 10
}

}
export default NotificationListItem;
