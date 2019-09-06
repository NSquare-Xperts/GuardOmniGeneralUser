import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import HomeListItems from './common/HomeListItems';
import { red_lighter } from './common/color'
import PropertyDetails from './PropertyDetails';
import HomePropertyDetailItem from './common/HomePropertyDetailItem';
import GuardAdvancedSearch from './common/GuardAdvancedSearch';
import GuardPunchIn from './common/GuardPunchIn';

class GuardHomepage extends Component {
  componentDidMount() {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      const { title, body, data } = notification;
      console.log("OnNotification GaurdHomePage")
      console.log("Data " + JSON.stringify(data) + "And " + data.id)

      // const localNotification = new firebase.notifications.Notification({
      //   sound: 'default',
      //   vibration: 300,
      //   show_in_foreground: true,
      //   local: true
      // }).setNotificationId(notification.notificationId)
      //   .setTitle(notification.title)
      //   .setBody(notification.body)
      //   .setData(notification.data)
      //   .android.setSmallIcon('@drawable/shield')
      //   .android.setColor('#000000')
      //   .android.setPriority(firebase.notifications.Android.Priority.High)
      //   .android.setChannelId(1)
    });

    // firebase.notifications()
    //   .displayNotification(localNotification)
    //   .catch(err => console.error(err));




    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body, data } = notificationOpen.notification;
      // if (data.notification_category == "3") {
      //   console.log("Inside If Open")
      //   Actions.ComplaintDetail({ complaintID: data.id })
      // } else if (data.notification_category == "2") {
      //   Actions.ReportedInOutDetails({ RId: data.id })
      // } else if (data.notification_category == "0") {

      //   console.log("Inside If notice detail ")
      //   Actions.NoticeDetail({ noticeID: data.id })
      // }
      // Actions.popTo('_Complaints',{complaintID:data.id})
      // else if(data.notification_category==2)
      // Actions.popTo('ReportedInOutDetails',{RId:data.id})
      // else if()
      console.log("OnNotification Open GaurdHomePage")
      console.log("Data " + JSON.stringify(data))
      firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId)
    })
  }
  render() {
    return (
      <View style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', backgroundColor: { red_lighter } }}>
        <HomePropertyDetailItem />
        <GuardAdvancedSearch />
        <GuardPunchIn />
        <GuardPunchIn />
      </View>);
  }
  componentWillUnmount(){
    //this.notificationListener();
    //this.notificationOpenedListener();
  }
}
export default GuardHomepage;
const styles = {

  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: 170,
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