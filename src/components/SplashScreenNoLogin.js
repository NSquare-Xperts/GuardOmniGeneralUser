import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GuardOmni_Version } from './common/constants';
import { white_light } from './common/color'

class SplashScreenNoLogin extends Component {

  componentWillMount() {
    setTimeout(() => {
      //Actions.homepage();
     // Actions.AddComplaintNew()
    }, 3000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <Image
          style={{ height: '100%', width: '100%', resizeMode: 'stretch' }}
          source={require('./assets/splash/splash_bg_complete.png')} />

        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5 }}>
          <Text style={styles.textVersion}>{GuardOmni_Version}</Text>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    Actions.pop();
    return true;
  }
}
export default SplashScreenNoLogin;

const styles = {

  textVersion: {
    fontFamily: 'OpenSans-Regular',
    color: white_light,
    fontSize: 12
  }
}