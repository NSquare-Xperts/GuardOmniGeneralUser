import React, { Component } from 'react'
import { View,Image,Text } from 'react-native'
import { red_lighter,white_Original,black, grey ,grey_lighter, red} from './common';

class ReportedInOutDetails extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.card}>
         
          <Image source={require('./assets/fullscreen.jpg')}
            style={{ height: '35%', width: '100%', alignSelf: 'center'}} />

          <View style={styles.colStyle}>
            <Text style={styles.textTitleStyle}>Martin Smith, UNrequested</Text>
            <Text style={styles.textStyle}>+65 1234 5678</Text>
            <Text style={styles.textStyle}>01-01-19</Text>
            <View style={styles.rowStyle}>
                <Text style={styles.textStyle}>IN : 10:00 AM</Text>
                <Text style={styles.textStyle}>OUT : 12:00 PM</Text>
            </View>
          </View>

          <View style={{alignItems: 'flex-end',padding: 10,justifyContent:'flex-end',marginTop: 15}}>

                 <View style={styles.line}/> 
                    <Text         style={styles.textRedStyle}>Reported By</Text>
                 <View style={styles.line}/>   

                    <Text style={styles.textStyle}>Jhon Doe, Owner</Text>
                    <Text style={styles.textStyle}>A 304, Block A, Capital Tower</Text>
                    <Text style={styles.textStyle}>+65 1234 5678</Text>
               
          </View>
            </View>
      </View>
    )
  }
}

const styles = {

  card: {
    backgroundColor: white_Original,
    width: '98%',
    height: '100%',
    display: 'flex',
    flex: 1,
    //padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    elevation: 4,
    borderRadius: 3
  },
  containerStyle: {
    display: 'flex',
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    backgroundColor: red_lighter,
    borderRadius: 3
  },
  rowStyle: {
    flexDirection: 'row',
  },
  colStyle: {
    padding: 10,
    flexDirection: 'column'
  },
  displayStyle: {
    flexDirection: 'row',
    marginTop: 10

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
  textRedStyle: {
    color: red,
    fontFamily: 'OpenSans',
    fontSize: 12,
  },
  line : {
    height: 0.5,
    width: '100%',
    backgroundColor: grey,
    marginTop: 7,
    marginBottom: 7
  }
}
export default ReportedInOutDetails;

