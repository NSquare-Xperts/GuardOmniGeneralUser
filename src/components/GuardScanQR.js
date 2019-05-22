import React, { Component } from 'react'
import { Text,View, Image } from 'react-native'
import { red_lighter, white_Original, black, close, green } from './common'
import Button from './common/Button';

class GuardScanQR extends Component {
render() {
    return(
            <View style={{backgroundColor: red_lighter, flex: 1}}>
                <View style={styles.container}>

                      <View style={{width: '100%' ,height: '30%'}}> 
                          <Image  style={styles.thumbnail_arrow}
                                  source={require('./assets/fullscreen.jpg')}/>
                      </View> 

                      <View style={{alignSelf: 'center',alignItems: 'center',marginTop: 70}}>        
                          
                              <Image  style={{width: 50, height: 50}}
                                  source={require('./assets/Common/success_icon.png')}/>
                              <Text style={styles.textStyleBold}>Success</Text>
                              <Text style={styles.textStyle}>MARIA SMITH , OWNER</Text>
                              <Text style={styles.textStyleSmall}>A 304, Block A, Capital Tower</Text>
                              <Text style={styles.textStyleSmall}>+65 1234 5678</Text>
                            
                              <View style={{marginTop: 20, marginBottom: 10}}>
                                     <Text style={styles.textStyleGreen}>Not this Person ?</Text>
                             </View>
                      </View>
                  <Button>{ close }</Button>
                </View>
            </View>
           )
    }
}
export default GuardScanQR;
const styles = {
    container: {
        backgroundColor: white_Original,
        width: '95.55%',
        height: '96%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        //padding: 5,
        marginLeft: 10,
        marginRight: 10,
        justifyitems: 'center',
        elevation: 4,
        marginTop: 12,
        borderRadius: 3,
        alignSelf: 'center'
    },
    thumbnail_arrow: {
        height: 200,
        width: '100%',
        //elevation: 4,
        //alignSelf: 'flex-end',
        //justifyContent: 'flex-end',
      },
      textStyleSmall: {
        fontFamily: 'OpenSans-Regular.ttf',
        fontSize: 12,
        color: black,
        marginTop: 2,
        marginBottom: 2
        //alignSelf: 'flex-start',
      },
      textStyle: {
        fontFamily: 'OpenSans-Regular.ttf',
        fontSize: 14,
        color: black,
        //marginBottom: 2
        //alignSelf: 'flex-start',
        //marginLeft: 1,
        //marginTop: 2
      },
      textStyleGreen: {
        fontFamily: 'OpenSans-Regular.ttf',
        fontSize: 12,
        color: green,
      //  marginBottom: 2
        //alignSelf: 'flex-start',
        //marginLeft: 1,
        //marginTop: 2
      },
      textStyleTitle: {
        fontFamily: 'OpenSans-Bold.ttf',
        fontSize: 20,
        color: black,
        //alignSelf: 'center',
        //marginLeft: 15,
        marginBottom: 10
      },
      textStyleBold: {
        fontFamily: 'OpenSans-Bold.ttf',
        fontSize: 18,
        color: black,
        marginTop: 3,
        marginBottom: 15
      },
      
    
}