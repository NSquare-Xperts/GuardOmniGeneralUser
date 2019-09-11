import React from 'react';
import { Text, View, Image } from 'react-native';
import { white_Original, pink, black, grey_light } from '../common/color';
import Button from '../common/Button';

//make component 
const Paysection = (props) => {

  const { gridRowStyle, container, textTitleStyle,gridColFullStyle, textgreenStyle,textRedStyle,textNoStyle, gridColStyle, textStyle } = styles;
  
  var today = new Date();
  dateParsed =  today.getDate()+ '-' +(today.getMonth() + 1) + '-' + today.getFullYear()  
  return (
    <View style={container}>
      
      <View style={gridColFullStyle}>
          <View style={gridRowStyle}>
            
            <View style={gridColStyle}>
              <Text style={textTitleStyle}>Maintaince Amount</Text>
              <Text style={textTitleStyle}>{props.amount}</Text>
            </View>
           
            <View style={{ height: 25, width: 1, marginLeft: 4, backgroundColor: grey_light, alignSelf: 'center' }} />

            <View style={gridColStyle}>
              <Text style={textTitleStyle}>Due Date</Text>
              {dateParsed > props.dueDate == true? 
              <Text style={textRedStyle}>{props.dueDate}</Text>
              :
              <Text style={textgreenStyle}>{props.dueDate}</Text>
              }
            </View>
          </View>         
          <Button style={{marginTop:15}}>{"PAY NOW"}</Button>
        </View>
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
  gridColFullStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textRedStyle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15
  },
  textgreenStyle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: 'green',
    alignSelf: 'flex-start',
    marginLeft: 15
  },
  textTitleStyle: {
    fontFamily: 'OpenSans-Bold.ttf',
    fontSize: 14,
    color: 'black',
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
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: white_Original,
    alignSelf: 'flex-start',
    marginLeft: 15
  }
}
export default Paysection;
