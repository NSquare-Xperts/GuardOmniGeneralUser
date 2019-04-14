import React, { Component } from 'react';
import { View,Image, Text, Dimensions } from 'react-native';
import {Card, CardSection } from './common';

class HomePage extends Component {
  //width = Dimensions.get('window').width
  render(){
    return(
     <View style={{flex: 1}}>
     <Card>
          <CardSection >
                <View>
                  <Image
                    style={styles.thumbnail}
                    source={require('./assets/fullscreen.jpg')}/>
                  </View>

                  <View style={styles.headerContentStyle}>
                    <Text>HI RITU </Text>
                    <Text>Drawer 2</Text>
                  </View>
           </CardSection>
            {/* <CardSection>
                      <Image
                        style={{width: 50, height: 50,alignItems:'center'}}
                        source={require('./assets/fullscreen.jpg')}/>
            </CardSection> */}
    </Card>
   </View>
    );
  }
}
export default HomePage;

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'space-around'
  },
  thumbnail: {
    height: 50,
    width: 50
  },
  gridRowStyle: {
     flexDirection: 'row', 
  },
  gridColStyle: {
    flexDirection: 'column', 
 },
  card: {
    backgroundColor: 'white',
    width: (Dimensions.get('window').width / 2) - 15,
    height: 200,
    marginLeft: 8,
    marginRight:3,
    marginTop: 10,
    elevation: 4
  },
  textStyle: {
      fontSize: 14,
      color: 'black',
      alignItems: 'center',
      alignSelf: 'center'
  } 
}