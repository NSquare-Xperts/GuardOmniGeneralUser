
import React from 'react'
import { Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { blue, white_Original, green, purple } from './color'
//import { Actions } from 'react-native-router-flux'
import { QR, MANUAL } from '../../actions/types';
import { Actions } from 'react-native-router-flux';

//make component 
const GuardPunchIn = () => {
  const { gridRowStyle, container, textTitleStyle, thumbnail, gridColBlueStyle, gridColWhiteStyle, thumbnail_arrow, gridColStyle, textStyle } = styles;
  return (

    <View style={container}>
      {/* <TouchableWithoutFeedback onPress={()=> Actions.Helpdesk()}> */}

      <View style={gridColWhiteStyle}>
        <Image style={thumbnail}
          source={require('../assets/guard/home/in_tile_icn.png')} />
      </View>      

      <TouchableWithoutFeedback onPress={() => Actions.GuardScanQR()}>
        <View style={gridColStyle}>
          <Image style={thumbnail}
            source={require('../assets/guard/home/security_qr_code_icn.png')} />
          <Text style={textStyle}>{QR}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => Actions.GuardManualOut()}>
        <View style={gridColBlueStyle}>
          <Image style={thumbnail}
            source={require('../assets/guard/home/security_qr_code_icn.png')} />
          <Text style={textStyle}>{MANUAL}</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* <View style={gridRowStyle}>
              <Image  style={thumbnail}
                      source={require('../assets/Home/helpdesk_option.png')}/>
                        
                      <View style={gridColStyle}>
                          <Text style={textTitleStyle}>Helpdesk </Text>
                          <Text style={textStyle}>Call to Helpline</Text>
                      </View>

               <Image  style={thumbnail_arrow}
                       source={require('../assets/Home/right_custom_arrow.png')}/>
         </View>  */}
      {/* </TouchableWithoutFeedback>             */}
    </View>

  );
};


const styles = {

  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    height: 150,
    borderRadius: 3,
    borderWidth: 0.1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    //padding: 5,
    marginLeft: 10,
    justifyitems: 'center',
    marginTop: 12,
    elevation: 4
  },
  thumbnail: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  thumbnail_arrow: {
    height: 25,
    width: '20%',
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
    width: '35%',
    height: 'auto',
    display: 'flex',
    backgroundColor: purple,
    flexDirection: 'column',
    justifyContent: 'center',

  },
  gridColBlueStyle: {
    width: '35%',
    height: 'auto',
    display: 'flex',
    backgroundColor: blue,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  gridColWhiteStyle: {
    width: '30%',
    height: 'auto',
    display: 'flex',
    backgroundColor: white_Original,
    flexDirection: 'column',
    justifyContent: 'center'
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
    fontSize: 14,
    color: white_Original,
    alignSelf: 'center',
    marginTop: 15
  }
}
export default GuardPunchIn;
