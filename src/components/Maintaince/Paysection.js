import React from 'react';
import { Text, View, Image } from 'react-native';
import { white_Original, pink, black, grey_light } from '../common/color';
import Button from '../common/Button';

//make component 
const Paysection = (props) => {
  const { gridRowStyle, container, textTitleStyle, thumbnail, textNoStyle, gridColStyle, textStyle } = styles;
  return (
    <View style={container}>
      {/* <View style={gridRowStyle}> */}
      
          <View style={gridRowStyle}>
            
            <View style={gridColStyle}>
              <Text style={textTitleStyle}>Maintaince Amount</Text>
              <Text style={textTitleStyle}> $1000 </Text>
            </View>
           
            <View style={{ height: 25, width: 1, marginLeft: 4, backgroundColor: grey_light, alignSelf: 'center' }} />

            <View style={gridColStyle}>
              <Text style={textTitleStyle}>Due Date</Text>
              <Text style={textTitleStyle}> 10-10-2019 </Text>
            </View>
          </View>
         
          {/* <Button style={{ marginLeft: 20, alignSelf:'center' ,justifyitems: 'center'}}>{"PAY NOW"}</Button> */}

        <Text style={textNoStyle}></Text>
      </View>
  );
};
const styles = {

  container: {
    backgroundColor: white_Original,
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
    marginTop: 5,
    elevation: 4

  },
  thumbnail: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginLeft: 5,
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
    justifyContent: 'space-between'
  },
  gridColStyle: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textTitleStyle: {
    fontFamily: 'OpenSans-Bold.ttf',
    fontSize: 14,
    color: black,
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
export default Paysection;
