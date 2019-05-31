import React, { Component } from 'react'
import { View, Dimensions, AsyncStorage, BackHandler,DeviceEventEmitter } from 'react-native'
import HomeListItems from './common/HomeListItems'
import HomeBottom from './common/HomeBottom'
import HomeVisitorsItems from './common/HomeVisitorItem'
import HomeComplaints from './common/HomeComplaints'
import HomeNotices from './common/HomeNotices'
import HomeHelpDesk from './common/HomeHelpDesk'
import { red_lighter } from './common/color'
import { ScrollView } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import firebase from 'react-native-firebase'
import NotificationCount from './NotificationCount'

class Homepage extends Component {

  state = {
    propertyData: {
      "site_name": "NA",
      "site_image": "NA",
      "flat_no": 'NA',
      "role_name": "NA",
      "user_name": "NA"
    },
    refreshing: true
  }

  handleBackPress() {
    console.log("Back handler" + Actions.currentScene)
    if (Actions.currentScene == 'Login') {
      //Actions.refresh({ key: Math.random() })
      BackHandler.exitApp()
    }
    else if (Actions.currentScene == 'splash') {
      BackHandler.exitApp()
    } else if (Actions.currentScene == '_homepage') {
      BackHandler.exitApp()
    } else if (Actions.currentScene == 'drawer') {
      BackHandler.exitApp()
    } else if (Actions.currentScene == 'LoginIn') {
      Actions.popTo('_homepage')
    } else if (Actions.currentScene == '_notices') {
      Actions.popTo('_notices')
    } else if (Actions.currentScene == '_ReportedInOutlIST') {
      Actions.popTo('_homepage')
    } else if (Actions.currentScene == 'MyId') {
      BackHandler.exitApp()
    }
    return true;
  }

  getNotificationCount() {
    // AsyncStorage.removeItem('notificationCount')
     var count = NotificationCount.getCurrentCount();
     
     console.log("count : " + count)
     count = count + 1;
     console.log("count : " + count)
     NotificationCount.setCurrentCount(count)
     var countIncreased = NotificationCount.getCurrentCount();
     console.log("count increased : " + countIncreased)
   }

  componentWillMount() {

    console.log("HomePage: componentWillMount")

    this._getStorageValue();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    Actions.pop()
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

    return true;
  }

  componentDidMount() {
    
    console.log("HomePage: componentDidMount")
    
    this.addnotificationListener =
    DeviceEventEmitter.addListener('notificationcount', (e) => {
      if (e) {
        Actions.refresh()
        this._getStorageValue()
      }
    });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      const { title, body, data } = notification;
      console.log("OnNotification HomePage")
      console.log("Data " + JSON.stringify(data) + "And " + data.id)

      this.getNotificationCount()

      DeviceEventEmitter.emit('notificationcount', { isNotificationAdded: true });

      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        vibration: 300,
        show_in_foreground: true,
        local: true
      }).setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)
        //.android.setSmallIcon('@drawable/shield')
        .android.setColor('#000000')
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setChannelId(1)
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body, data } = notificationOpen.notification;
      // 0 => notice detail
      // 1 => manual in : general user 
      // 2 => Reported Visitor request REported inout list in guard 
      // 3 => Complaint resolved
      console.log("notification type : " + data.notification_category)

      if (data.notification_category == "3") {
        Actions.ComplaintDetail({ complaintID: data.id })
      } else if (data.notification_category == "1") {

        // Actions.ReportedInOutDetails({ RId: data.id })
        Actions.visitors()

      } else if (data.notification_category == "0") {
        console.log("Inside If notice detail ")
        Actions.NoticeDetail({ noticeID: data.id })
      }
      // Actions.popTo('_Complaints',{complaintID:data.id})
      // else if(data.notification_category==2)
      // Actions.popTo('ReportedInOutDetails',{RId:data.id})
      // else if()
      //console.log("OnNotification Open GaurdHomePage")
      //console.log("Data " + JSON.stringify(data))
    })
  }


  async _getStorageValue() {
    var value = await AsyncStorage.getItem('propertyDetails')
    var data = JSON.parse(value);
    if (data != '' || data != null) {
      this.setState({
        propertyData: data
      })
    }
  }

  render() {
    console.log("render2")
    if (!this.state.refreshing) {
      return (
        <View style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', backgroundColor: { red_lighter } }}>
          <ScrollView>
            <HomeListItems
              site_name={this.state.propertyData.site_name}
              flat_no={this.state.propertyData.flat_no}
              role_name={this.state.propertyData.role_name}
              image={this.state.propertyData.site_image} />

            <HomeVisitorsItems />
            <HomeComplaints />
            <HomeNotices />
            <HomeHelpDesk />

          </ScrollView>
          <HomeBottom />
        </View>
      );
    } else {
      return (
        <View style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', backgroundColor: { red_lighter } }}>

          <ScrollView>
            <HomeListItems
              site_name={this.state.propertyData.site_name}
              flat_no={this.state.propertyData.flat_no}
              role_name={this.state.propertyData.role_name}
              image={this.state.propertyData.site_image} />

            <HomeVisitorsItems />
            <HomeComplaints />
            <HomeNotices />
            <HomeHelpDesk />

          </ScrollView>
          <HomeBottom />
        </View>


      );

    }
  }
}
export default Homepage;
const styles = {
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: 130,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    elevation: 4,
  },
  headerContentStyle: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center'
  },
  thumbnail: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginLeft: 25,
  },
  thumbnail_info: {
    height: 30,
    width: 30,
    marginRight: 20,
    marginBottom: 20,
    alignSelf: 'flex-end'
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
    marginRight: 3,
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