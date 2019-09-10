import React from 'react';
import { Text, View, Image, Platform } from 'react-native';

const PropertyDetailSubItem = (props) => {
  const { gridRowStyle, textStyle, profileImg, gridColStyle } = styles;

  return (
    <View>
      <View style={gridRowStyle}>
        <Image source={{ uri: props.image }} style={profileImg} />
        <View style={gridColStyle}>

          <Text style={textStyle}>{props.name}</Text>

          <Text style={textStyle}>{props.type}</Text>

          {/* {this.props.sectionType==='Documents' ? 
          <Text style={textStyle}></Text>
          :
          <Text style={textStyle}>{props.type}</Text>} */}

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  textStyle: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 15
  },
  textStyleDate: {
    fontFamily: 'OpenSans',
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
    height: 50,
    width: 50,
    //borderRadius: 20
    borderRadius: Platform.OS === 'ios' ? 50 / 2 : 30
  }
}
export default PropertyDetailSubItem;
