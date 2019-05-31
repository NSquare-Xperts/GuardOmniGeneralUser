import React from 'react';
import { Text, View, Image, Platform } from 'react-native'
import { white_Original } from './color'


const AdvanceSearchSubItem = (props) => {
  const { gridRowStyle, textStyle, profileImg } = styles;
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5}}>
        <View style={{width: '90%', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Text style={textStyle}>John Doe</Text>
            <Text style={textStyle}>Owner oooo</Text>
        </View>
        
        <Image source={require('../assets/Common/switch_property_navigate.png')} 
        style={profileImg} />
      </View>
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    height: 80,
    display: 'flex',
    //justifyContent: 'space-between',
    flexDirection: 'row',
    //padding: 5,
    marginLeft: 10,
    //justifyitems: 'center',
    elevation: 4,
    borderRadius: 2
  },
  thumbnail: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 40,
    marginLeft: 25,
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
    padding: 10,
    justifyContent: 'flex-start',
  },
  gridColStyle: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'black',
    //alignSelf: 'center',
    marginLeft: 15
  },
  textStyleDate: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 2
  },
  rightSideButtonStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  profileImg: {
    height: 25,
    width: 25,
    alignSelf: 'flex-end',
    //alignContent: 'flex-end',
    //justifyContent: 'center',
   // justifyitems: 'flex-end'
    //borderRadius: 20
    //borderRadius: Platform.OS === 'ios' ?  50/2 : 30
  }
}
export default AdvanceSearchSubItem;
