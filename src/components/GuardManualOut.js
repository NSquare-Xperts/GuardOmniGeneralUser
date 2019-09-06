import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { red_lighter, white_Original, black, green, out } from './common'
import Button from './common/Button';

class GuardManualOut extends Component {
  render() {
    return (
      <View style={{ backgroundColor: red_lighter, flex: 1 }}>
        <View style={styles.container}>
          {/* <View style={{ width: '100%', height: '30%' }}> */}
          <Image style={styles.thumbnail_arrow}
            source={require('./assets/fullscreen.jpg')} />

              <View style={{ justifyContent: 'flex-start',alignItems: 'center', padding: 15 }}>
                {/* <Text style={styles.textStyleBold}>Success</Text> */}
                  <Text style={styles.textTitleStyle}>MARIA SMITH , OWNER</Text>
                  <Text style={styles.textStyle}>+65 1234 5678</Text>
                  <Text style={styles.textStyle}>Punch IN : 01-01-19, 10:00 AM</Text>

                  <View style={{ marginTop: 15 }} />
                  <Text style={styles.textStyle}>Visited to</Text>
                  <View style={{ marginBottom: 15 }} />

                  <Text style={styles.textTitleStyle}>MARIA SMITH , OWNER</Text>
                  <Text style={styles.textStyle}>A 304 ADDRESS........</Text>
                  <Text style={styles.textStyle}>+65 1234 5678</Text>

              </View>
          <View style={{marginBottom: 15}}>
            <Button>{out}</Button>
          </View>
        </View>
      </View>
    )
  }

}
export default GuardManualOut;

const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    height: '96%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    //justifyitems: 'center',
    elevation: 4,
    marginTop: 12,
    borderRadius: 3,
    alignSelf: 'center'
  },
  textTitleStyle: {
    color: black,
    marginTop: 15,
    fontFamily: 'OpenSans-Bold',
    fontSize: 14
  },
  textStyle: {
    color: black,
    fontFamily: 'OpenSans',
    fontSize: 12,
  },
  thumbnail_arrow: {
    height: 200,
    width: '100%',
    //elevation: 4,
    //alignSelf: 'flex-end',
    //justifyContent: 'flex-end',
  },
  textStyleSmall: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: black,
    marginTop: 2,
    marginBottom: 2
    //alignSelf: 'flex-start',
  },
  textStyle: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: black,
    //marginBottom: 2
    //alignSelf: 'flex-start',
    //marginLeft: 1,
    //marginTop: 2
  },
  textStyleGreen: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: green,
    //  marginBottom: 2
    //alignSelf: 'flex-start',
    //marginLeft: 1,
    //marginTop: 2
  },
  textStyleTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: black,
    //alignSelf: 'center',
    //marginLeft: 15,
    marginBottom: 10
  },
  textStyleBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: black,
    marginTop: 3,
    marginBottom: 15
  },


}