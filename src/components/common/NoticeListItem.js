import React from 'react';
import {Text, View, Image,TouchableWithoutFeedback} from 'react-native';
import { black } from './color';
import {Actions} from 'react-native-router-flux'

//make component 
const NoticeListItem = (props) => {
  
    const {gridRowStyle, textStyleTitle,gridColStyle,textStyle,textStyleDate} = styles;
    console.log('id : ',props.noticeId)
    return(

      <TouchableWithoutFeedback onPress={()=> props.sendData(props.noticeId) }>
      
      {/*<TouchableWithoutFeedback 
      onPress={()=> 
      Actions.NoticeDetail()
      }>*/}
      <View>     
        <View style={gridRowStyle}>

              <View style={gridColStyle}>
                          <Text 
                          numberOfLines={1}
                          style={textStyle}>{props.notice_title}</Text>
                          <Text 
                           numberOfLines={2}
                          style={textStyleTitle}>{props.notice_description}</Text>
              </View>

               <View style={styles.rightSideButtonStyles}>
                      <Text  style={textStyleDate}> {props.created_at}</Text>
              </View>
         </View>             
      </View>
      </TouchableWithoutFeedback>
  
  
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
  width: '85%',
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

export default NoticeListItem;
