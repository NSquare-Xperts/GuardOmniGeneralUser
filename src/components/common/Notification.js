import React from 'react';
import { TouchableWithoutFeedback, Text, Image, ImageBackground,AsyncStorage, View } from 'react-native';
import { green, black, red, white_Original } from './color'
import { Actions } from 'react-native-router-flux'
import NotificationCount from '../NotificationCount'


const Notification = (props) => {
        // <TouchableWithoutFeedback onPress={() => Actions.Notifications()}>
        // <ImageBackground source={require('../assets/guard/home/notification_icn.png')}
        //     style={{ width: 30, height: 30, marginEnd: 10 }}>
        //     {/* <View style={styles.TextViewStyle}>
        //         <Text style={styles.TextStyle}>12</Text>
        //     </View> */}
        // </ImageBackground>
        // </TouchableWithoutFeedback>
        AsyncStorage.removeItem('notificationCount')
        // AsyncStorage.setItem('notificationCount',NotificationCount.getCurrentCount())
        AsyncStorage.setItem('notificationCount',JSON.stringify(NotificationCount.getCurrentCount()))
        if (NotificationCount.getCurrentCount() <= 0) {
            return (
                <TouchableWithoutFeedback onPress={() => Actions.Notifications()}>
                    <ImageBackground source={require('../assets/guard/home/notification_icn.png')}
                        style={{ width: 30, height: 30, marginEnd: 10 }}>
                        {/* <View style={styles.TextViewStyle}>
                            <Text style={styles.TextStyle}>{NotificationCount.getCurrentCount()}</Text>
                        </View> */}
                    </ImageBackground>
                </TouchableWithoutFeedback>
            );
        }else{
            return(
                <TouchableWithoutFeedback onPress={() => Actions.Notifications()}>
                <ImageBackground source={require('../assets/guard/home/notification_icn.png')}
                    style={{ width: 30, height: 30, marginEnd: 10 }}>
                    <View style={styles.TextViewStyle}>
                        <Text style={styles.TextStyle}>{NotificationCount.getCurrentCount()}</Text>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
            )
        }
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