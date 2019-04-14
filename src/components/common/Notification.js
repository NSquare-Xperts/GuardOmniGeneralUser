import React from 'react';
import { TouchableOpacity, Text, Image, ImageBackground, View } from 'react-native';
import { green, black, red, white_Original } from './color'

const Notification = (props) => {
    return (
        // <TouchableOpacity onPress={props.onPress} >
        // </View >

        <ImageBackground source={require('../assets/guard/home/notification_icn.png')} 
        style={{ width: 30, height: 30,marginEnd: 10}}>
            <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>12</Text>
            </View>
        </ImageBackground>

    );
};
const styles = {
    TextViewStyle:
    {
        borderRadius: 10,
        width: 20,
        height: 20,
        marginLeft: 14,
        marginBottom: 20,
        justifyContent: 'center',
        backgroundColor: red
    },
    TextStyle:
    {
        textAlign: 'center',
        color: white_Original,
        fontSize: 12

    }
};
export default Notification;