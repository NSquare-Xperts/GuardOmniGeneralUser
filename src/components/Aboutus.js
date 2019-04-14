import React, { Component } from 'react'
import {  WebView, Platform} from 'react-native';

class Aboutus extends Component {
    state = {
        uri :'https://dutique.com'
    }

    render() {
        return (
            <WebView 
            style={styles.WebViewStyle} 
            source={{uri: this.state.uri}} 
            javaScriptEnabled={true}
            domStorageEnabled={true}  />
        )
    }
}
export default Aboutus;

const styles= {
WebViewStyle:
 {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
 
}
}

