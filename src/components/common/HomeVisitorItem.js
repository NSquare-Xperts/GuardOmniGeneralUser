import React from 'react';
import {Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { purple, white_Original, pink } from './color';

//make component 
const HomeVisitorItems = () => {
    const {gridRowStyle, container, textTitleStyle,thumbnail,thumbnail_arrow,gridColStyle,textStyle} = styles;
    return(
      <TouchableWithoutFeedback onPress={()=> Actions.visitors()}>
      <View style={container}>
        <View style={gridRowStyle}>
              <Image  style={thumbnail}
                      source={require('../assets/Home/visitors_option.png')}/>
                      <View style={gridColStyle}>
                          <Text style={textTitleStyle}>Visitors </Text>
                          <Text style={textStyle}>Add, Requested Visitors, View History</Text>
                      </View>
               <Image  style={thumbnail_arrow}
                        source={require('../assets/Home/right_custom_arrow.png')}/>
         </View>             
      </View>
      </TouchableWithoutFeedback>
    );
};

const styles =  {

  container: {
    backgroundColor: purple,
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
    marginTop: 10,
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

//   container: {
//     backgroundColor: 'purple',
//     width: '94%',
//     //width: Dimensions.get('window').width,
//     height: 70,
//     display: 'flex',
//     flexDirection : 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//     marginLeft: 10,
//     elevation: 4,
//   },
//   thumbnail: {
//     height: 50,
//     width: 50,
//     alignSelf: 'center',
//     marginLeft:25,
//   },
//   thumbnail_arrow: {
    
//     width: 25,
//     height: 25,
//     // height: 25,
//     // width: 25,
//     left: 0,
//     alignSelf: 'center'
  
//   },
//   gridRowStyle: {
//      flexDirection: 'row', 
//      justifyContent:'flex-start'
//   },
//   gridColStyle: {
//     flexDirection: 'column', 
//     justifyContent:'center'
//  },
//   textStyle: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Italic',
//     color: 'white',
//     alignSelf: 'flex-start',
//     marginLeft: 15, 
//   }
// });

export default HomeVisitorItems;
