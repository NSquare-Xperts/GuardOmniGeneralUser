import React, { Component } from 'react';
import {AsyncStorage} from 'react-native'

class NotificationCount extends Component{
   
    static currentCount=0
    //AsyncStorage.getItem('notificationCount');
   
     static getCurrentCount() {
        return this.currentCount
    }
    static setCurrentCount(count){
        this.currentCount = count
    }
}
export default NotificationCount