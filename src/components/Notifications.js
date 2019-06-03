import React, { Component } from 'react'
import { FlatList, Text, View, TouchableWithoutFeedback, AsyncStorage, Image, Alert, Dimensions,BackHandler } from 'react-native'
import Placeholder from 'rn-placeholder'
import { red_lighter, white_Original, grey } from './common'
import { Actions } from 'react-native-router-flux'
import NotificationListItem from './common/NotificationListItem'
import { callPostApi } from './Util/APIManager'
import SimpleToast from 'react-native-simple-toast'
import { ScrollView } from 'react-native-gesture-handler';
import NotificationCount from './NotificationCount'

class Notifications extends Component {
    state = {
        refreshing: true,
        notificationsList: [],
        flatId: '',
        userID: '',
        page: 0,
    }

    renderNotificationList() {
        

        console.log("notification List " + this.state.userId + "," + this.state.flatId)
        callPostApi('http://guardomni.dutique.com:8000/api/getNotificationList', {
            "userId": this.state.userId,
            "flatId": this.state.flatId,
            "pageNumber": this.state.page
            // "userId": 34,
            // "flatId": 56,
            // "pageNumber": 0
        })
            .then((response) => {
                // Continue your code here...
                res = JSON.parse(response)
                console.log("response : ", res)
                if (res.status == 200) {
                    this.setState({
                        notificationsList: this.state.notificationsList.concat(res.data), loadMore: false, refreshing: false,
                        status: res.status
                    })
                }else if (res.status == 401) {
                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');                    
                    Actions.reset('Login')
                  }              
                else {
                    this.setState({
                        refreshing: false,
                    })
                }
            });
    }

    handleLoadMore = () => {
        //console.warn('handleLoadMore');
        this.setState(
            { 
                page: this.state.page + 1, loadMore: true },
            this.renderNotificationList
        )
    }

    async _getUserStorageValue() {

        var value = await AsyncStorage.getItem('propertyDetails')
        var data = JSON.parse(value);

        var valueUser = await AsyncStorage.getItem('userDetail')
        var dataUser = JSON.parse(valueUser);

        console.log("data user : " + dataUser)
        console.log("value ::: " + valueUser)

        if (dataUser != '' || dataUser != null) {
            this.setState({
                userId: dataUser.user_id,
                flatId: data.flat_id
            })
            this.renderNotificationList()
        }
    }

    handleBackPress() {
        console.log("---scene---"+Actions.currentScene)
        if (Actions.currentScene == 'Notifications') {
            Actions.pop()
        }
        return true;
      }
  
    componentWillMount() {
        this._getUserStorageValue()
        NotificationCount.setCurrentCount(0)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }
    _handleRefresh = () => {
        this.setState({
            refreshing: true,
            loadMore: false,
            page: 0,
            notificationsList: []
        },
            () => {
                this.renderNotificationList();
            })
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    }

    _emptyPropertyList = () => {
        //call for empty component or error
        if (this.state.refreshing) {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>
                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4, height: '100%' }}>
                    <Text style={styles.textStyle}>No Data Found</Text>
                </View>
            )
        }
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.4,
                    width: "95%",
                    backgroundColor: grey,
                    marginLeft: 10,
                    marginRight: 10,
                }}
            />
        );
    }

    renderFooter = () => {
        return (
            this.state.loadMore ?
                <View style={styles.loader}>
                    <ActivityIndicator
                        size="large" />
                </View> : null
        )
    }

    _sendId(item) {
        // check notice type
        // 0 => notice detail
        // 1 => manual in : general user 
        // 2 => Reported Visitor request REported inout list in guard 
        // 3 => Complaint resolved

        data = JSON.parse(item.notification_data)
        
        SENDid =JSON.parse(item.notification_data)
       
        console.log("notificationItem : " +data.notification_category)
        console.log("notificationItem : " +SENDid.id)

        console.log("notificationData : " + data.notification_data.id)
        if (data.notification_category == "0") {
            Actions.NoticeDetail({ noticeID: SENDid.id })
        } else if (data.notification_category == "2") {
            Actions.ReportedInOutDetails({ RId: SENDid.id})
        } else if (data.notification_category == "3") {
            Actions.ComplaintDetail({ complaintID: SENDid.id })
        }
    }

    _deleteId(item) {
        console.log(" Delete ID"+item)
        console.log(" Delete ID :"+item.id)


            callPostApi('http://guardomni.dutique.com:8000/api/deleteSingleNotification', {
                "userId": this.state.userId,
                "notificationId": item.id,
            })
                .then((response) => {
                    // Continue your code here...
                    res = JSON.parse(response)
                    console.log("response : ", res)
                    if (res.status == 200) {
                       SimpleToast.show(res.message)
                       this._handleRefresh()
                   
                    } else {
                        SimpleToast.show(res.message)
                       
                        this._handleRefresh()
                    }
                });
    


    }
    render() {
        if (this.state.refreshing) {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1 }}>
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.notificationsList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={({ item }) =>
                                <Placeholder.Paragraph
                                    lineSpacing={10}
                                    firstLineWidth={'50%'}
                                    animate='fade'
                                    color={'grey'}
                                    lastLineWidth="30%"
                                //onReady={this.state.refreshing}>
                                // onReady={true}> 
                                >
                                    <NotificationListItem
                                        dataDelete={(item) => this._deleteId(item)}
                                        title={item.notification_title}
                                        description={item.notification_description}
                                    />

                                    < Text style={{ padding: 10, justifyContent: 'center', fontSize: 11 }}>{item.name}</Text>
                                </Placeholder.Paragraph>
                            }
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh} />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
                    <View style={styles.container}>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            nestedScrollEnabled={true}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            data={this.state.notificationsList}
                            renderItem={({ item }) =>
                                <NotificationListItem
                                    sendData={(item) => this._sendId(item)}
                                    dataDelete={(item) => this._deleteId(item)}
                                    objNotification={item}
                                    title={item.notification_title}
                                    description={item.notification_description}
                                />}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            ListFooterComponent={this.renderFooter} />
                    </View>

                    <TouchableWithoutFeedback onPress={() =>
                        Alert.alert(
                            'Are you sure you want to delete all notifications ?',
                            'All Notifications Will be deleted Permantly',
                            [
                                {
                                    text: 'No', onPress: () =>
                                        //Actions.notifications()
                                        console.log("delete nothing")
                                },
                                {
                                    text: 'Yes', onPress: () => {

                                        //call notification delete api 
                                        callPostApi('http://guardomni.dutique.com:8000/api/deleteAllNotifications', {
                                            "userId": this.state.userId,
                                            "flatId": this.state.flatId
                                        })
                                            .then((response) => {
                                                // Continue your code here...
                                                res = JSON.parse(response)
                                                console.log("response : ", res)
                                                if (res.status == 200) {

                                                    //AsyncStorage.removeItem('complaintID')
                                                    //AsyncStorage.removeItem('userID')
                                                    //Actions.pop('Complaints');
                                                    //DeviceEventEmitter.emit('eventDeletedComplaint',{isDeletedSuccessFully: true});
                                                    //Actions.popTo('_Complaints');

                                                    SimpleToast.show(res.message)
                                                } else {
                                                    SimpleToast.show(res.message)
                                                }
                                            });

                                    }
                                }
                            ],
                            { cancelable: true }
                        )


                    }>
                        <Image style={styles.thumbnail_arrow}
                            source={require('./assets/Home/delete_fab.png')} />
                    </TouchableWithoutFeedback>

                </View>
            )
        }
    }
}
export default Notifications;

const styles = {
    container: {
        backgroundColor: white_Original,
        width: '95.55%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
        marginLeft: 10,
        justifyitems: 'center',
        elevation: 4,
        marginTop: 12,
        borderRadius: 2
    },
    thumbnail_arrow: {
        height: 55,
        width: 55,
        elevation: 4,
        position: 'absolute',
        bottom: 0,
        right: 0,
        //padding: 20,
        //flex: 1,
        justifyContent: 'flex-end',
        //alignItems: 'flex-end',
        marginRight: 10,
        //alignSelf: 'flex-end',
        // marginLeft: 10,
        marginBottom: 8
    }
}

// import React, { Component } from 'react'
// import { FlatList ,Text,View,TouchableWithoutFeedback, Image } from 'react-native'
// import axios from 'axios'
// import Placeholder from 'rn-placeholder'
// import { red_lighter, white_Original, grey } from './common'
// import { Actions } from 'react-native-router-flux'
// import NotificationListItem from './common/NotificationListItem'

// class Notifications extends Component {
// state = {
//     refreshing: true,
//     user: [],
// }
// renderUsersList() {
//       this.setState({refreshing: true});
//       axios.get('https://jsonplaceholder.typicode.com/getNotificationList')
//       .then(response => {
//           this.setState({ user: response.data, refreshing: false}),
//           console.log("hi ",response.data)
//       }
//     ).catch((error) =>{
//                   console.log(error)
//                   this.setState({
//                           refreshing: false,
//         })
//       }); 
// }
// componentWillMount(){
//     this.renderUsersList()
// }

// _handleRefresh = () => {
//     this.setState({
//         refreshing: false,
//     },
//     () => {
//         this.renderUsersList();
//     })
// }

// FlatListItemSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 0.4,
//           width: "95%",
//           backgroundColor: grey,
//           marginLeft: 10, 
//           marginRight: 10,
//         }}
//       />
//     );
//   }
// render() {
//     if(this.state.refreshing){
//         return(
//             <View style={{backgroundColor: red_lighter, flex: 1}}>
//                 <View style={styles.container}>
//                     <FlatList            
//                         data= {this.state.user}
//                         ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                         renderItem={({item}) => 
//                             <Placeholder.Paragraph
//                                 lineSpacing={10}
//                                 firstLineWidth={'50%'}
//                                 animate='fade'
//                                 color={'grey'}
//                                 lastLineWidth="30%"
//                                 //onReady={this.state.refreshing}>
//                                 // onReady={true}>  
//                                 >
//                                 <NotificationListItem/>
//                                 {/* <Text style={{padding: 10, justifyContent:'center', fontSize: 14}}> {item.name} </Text> */}
//                                     <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>
//                                     </Placeholder.Paragraph>
//                                 }
//                                 refreshing={this.state.refreshing}
//                                 onRefresh={this._handleRefresh}/>
//                     </View>

//     </View>
//             )
//     }else{
//     return(
//         <View style={{backgroundColor: red_lighter,flex: 1,marginBottom: 5}}>
//             <View style={styles.container}>
//                 <FlatList   
//                     ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                     data= {this.state.user}
//                     renderItem={({item}) => 
//                     <NotificationListItem/>}
//                     // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
//                     refreshing={this.state.refreshing}
//                     onRefresh={this._handleRefresh}/>
//             </View>

//             <TouchableWithoutFeedback>
//              <Image style={styles.thumbnail_arrow}
//                             source={require('./assets/Home/delete_fab.png')}/> 
//             </TouchableWithoutFeedback>

//         </View>
//     )
//    }
// }

// }
// export default Notifications;

// const styles = {
//     container: {
//         backgroundColor: white_Original,
//         width: '95.55%',
//         height: '100%',
//         display: 'flex',
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         padding: 5,
//         marginLeft: 10,
//         justifyitems: 'center',
//         elevation: 4,
//         marginTop: 12,
//         borderRadius: 2
//     },
//     thumbnail_arrow: {
//         height: 55,
//         width: 55,
//         elevation: 4,
//         position: 'absolute',
//         bottom:0,
//         right: 0,
//         justifyContent: 'flex-end',
//         //justifyContent: 'flex-end',
//         marginRight: 10,
//         marginBottom: 8,
//       }

// }



// import React, { Component } from 'react'
// import { FlatList ,Text,View,TouchableWithoutFeedback, Image } from 'react-native'
// import axios from 'axios'
// import Placeholder from 'rn-placeholder'
// import { red_lighter, white_Original, grey } from './common'
// import { Actions } from 'react-native-router-flux'
// import NotificationListItem from './common/NotificationListItem'

// class Notifications extends Component {
// state = {
//     refreshing: true,
//     user: [],
// }
// renderUsersList() {
//       this.setState({refreshing: true});
//       axios.get('https://jsonplaceholder.typicode.com/users')
//       .then(response => {
//           this.setState({ user: response.data, refreshing: false}),
//           console.log("hi ",response.data)
//       }
//     ).catch((error) =>{
//                   console.log(error)
//                   this.setState({
//                           refreshing: false,
//         })
//       }); 
// }
// componentWillMount(){
//     this.renderUsersList()
// }

// _handleRefresh = () => {
//     this.setState({
//         refreshing: false,
//     },
//     () => {
//         this.renderUsersList();
//     })
// }

// FlatListItemSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 0.4,
//           width: "95%",
//           backgroundColor: grey,
//           marginLeft: 10, 
//           marginRight: 10,
//         }}
//       />
//     );
//   }
// render() {
//     if(this.state.refreshing){
//         return(
//             <View style={{backgroundColor: red_lighter, flex: 1}}>
//                 <View style={styles.container}>
//                     <FlatList            
//                         data= {this.state.user}
//                         ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                         renderItem={({item}) => 
//                             <Placeholder.Paragraph
//                                 lineSpacing={10}
//                                 firstLineWidth={'50%'}
//                                 animate='fade'
//                                 color={'grey'}
//                                 lastLineWidth="30%"
//                                 //onReady={this.state.refreshing}>
//                                 // onReady={true}>  
//                                 >
//                                 <NotificationListItem/>
//                                 {/* <Text style={{padding: 10, justifyContent:'center', fontSize: 14}}> {item.name} </Text> */}
//                                     <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>
//                                     </Placeholder.Paragraph>
//                                 }
//                                 refreshing={this.state.refreshing}
//                                 onRefresh={this._handleRefresh}/>
//                     </View>

//     </View>
//             )
//     }
// else{
//     return(
//         <View style={{backgroundColor: red_lighter,flex: 1,marginBottom: 5}}>
//             <View style={styles.container}>
//                 <FlatList   
//                     ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                     data= {this.state.user}
//                     renderItem={({item}) => 
//                     <NotificationListItem/>}
//                     // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
//                     refreshing={this.state.refreshing}
//                     onRefresh={this._handleRefresh}/>
//             </View>

//             <TouchableWithoutFeedback>
//              <Image style={styles.thumbnail_arrow}
//                             source={require('./assets/Home/delete_fab.png')}/> 
//             </TouchableWithoutFeedback>

//         </View>
//     )
//    }
// }
// }
// export default Notifications;

// const styles = {
//     container: {
//         backgroundColor: white_Original,
//         width: '95.55%',
//         height: '100%',
//         display: 'flex',
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         padding: 5,
//         marginLeft: 10,
//         justifyitems: 'center',
//         elevation: 4,
//         marginTop: 12,
//         borderRadius: 2
//     },
//     thumbnail_arrow: {
//         height: 55,
//         width: 55,
//         elevation: 4,
//         position: 'absolute',
//         bottom:0,
//         right: 0,
//         //padding: 20,
//         //flex: 1,
//         justifyContent: 'flex-end',
//         //alignItems: 'flex-end',
//         marginRight: 10,
//         //alignSelf: 'flex-end',
//        // marginLeft: 10,
//         marginBottom: 8
//       }     
// }



// import React, { Component } from 'react'
// import { FlatList, Text, View, TouchableWithoutFeedback, AsyncStorage, Image,Alert } from 'react-native'
// import axios from 'axios'
// import Placeholder from 'rn-placeholder'
// import { red_lighter, white_Original, grey } from './common'
// import { Actions } from 'react-native-router-flux'
// import NotificationListItem from './common/NotificationListItem'
// import { callPostApi } from './Util/APIManager'
// //import Swipeout from 'react-native-swipeout';

// class Notifications extends Component {
//     state = {
//         refreshing: true,
//         notificationsList: [],
//         flatId: '',
//         userID:'',
//         page: 0,
//     }

//     renderNotificationList() {

//         console.log("notification List " + this.state.userId + "," + this.state.flatId)
//         callPostApi('http://guardomni.dutique.com:8000/api/getNotificationList', {
//             "userId": this.state.userId,
//             "flatId": this.state.flatId,
//             "pageNumber": this.state.page
//         })
//             .then((response) => {
//                 // Continue your code here...
//                 res = JSON.parse(response)
//                 console.log("response : ", res)
//                 if (res.status == 200) {
//                     this.setState({

//                         notificationsList: this.state.notificationsList.concat(res.data), loadMore: false, refreshing: false,
//                         status: res.status
//                     })
//                 } else {
//                     this.setState({
//                         refreshing: false,

//                     })
//                 }
//             });
//     }
  
//     handleLoadMore = () => {
//         //console.warn('handleLoadMore');
//         this.setState(
//             { page: this.state.page + 1, loadMore: true },
//             this.renderNotificationList
//         )

//     }

//     async _getUserStorageValue() {

//         var value = await AsyncStorage.getItem('propertyDetails')
//         var data = JSON.parse(value);

//         var valueUser = await AsyncStorage.getItem('userDetail')
//         var dataUser = JSON.parse(valueUser);

//         console.log("data user : " + dataUser)
//         console.log("value ::: " + valueUser)

//         if (dataUser != '' || dataUser != null) {
//             this.setState({
//                 userId: dataUser.user_id,
//                 flatId: data.flat_id
//             })
//             this.renderNotificationList()
//         }
//     }
    
//     componentWillMount() {
//         this._getUserStorageValue()
//     }

//     _handleRefresh = () => {
//         this.setState({
//             refreshing: true,
//             loadMore: false,
//             page: 0,
//             notificationsList: []
//         },
//             () => {
//                 this.renderNotificationList();
//             })
//     }

//     _emptyPropertyList = () => {
//         //call for empty component or error
//         if (this.state.refreshing) {
//             return (
//                 <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>
//                 </View>
//             )
//         } else {
//             return (
//                 <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4, height: '100%' }}>
//                     <Text style={styles.textStyle}>No Data Found</Text>
//                 </View>
//             )
//         }
//     }

//     FlatListItemSeparator = () => {
//         return (
//             <View
//                 style={{
//                     height: 0.4,
//                     width: "95%",
//                     backgroundColor: grey,
//                     marginLeft: 10,
//                     marginRight: 10,
//                 }}
//             />
//         );
//     }
//     renderFooter = () => {
//         return (
//             this.state.loadMore ?
//                 <View style={styles.loader}>
//                     <ActivityIndicator
//                         size="large" />
//                 </View> : null
//         )
//     }

//     render() {
//         if (this.state.refreshing) {
//             return (
//                 <View style={{ backgroundColor: red_lighter, flex: 1 }}>
//                     <View style={styles.container}>
//                         <FlatList
//                             data={this.state.notificationsList}
//                             ItemSeparatorComponent={this.FlatListItemSeparator}
//                             renderItem={({ item }) =>
//                                 <Placeholder.Paragraph
//                                     lineSpacing={10}
//                                     firstLineWidth={'50%'}
//                                     animate='fade'
//                                     color={'grey'}
//                                     lastLineWidth="30%"
//                                 //onReady={this.state.refreshing}>
//                                 // onReady={true}> 
//                                 >
//                                     <NotificationListItem
//                                         title={item.notification_title}
//                                         description={item.notification_description}
//                                     />

//                                     < Text style={{ padding: 10, justifyContent: 'center', fontSize: 11 }}>{item.name}</Text>
//                                 </Placeholder.Paragraph>
//                             }
//                             refreshing={this.state.refreshing}
//                             onRefresh={this._handleRefresh} />
//                     </View>
//                 </View>
//             )
//         }
//         else {
//             return (
//                 <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
//                     <View style={styles.container}>
//                         {/* <FlatList
//                             ListEmptyComponent={this._emptyPropertyList}
//                             ItemSeparatorComponent={this.FlatListItemSeparator}
//                             data={this.state.notificationsList}
//                             renderItem={({ item }) =>
//                                 <NotificationListItem
//                                     title={item.notification_title}
//                                     description={notification_description}
//                                 />}
//                             // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
//                             onEndReached={this.handleLoadMore}
//                             refreshing={this.state.refreshing}
//                             onRefresh={this._handleRefresh}
//                             ListFooterComponent={this.renderFooter} /> */}
//                         <FlatList
//                             ListEmptyComponent={this._emptyPropertyList}
//                             nestedScrollEnabled={true}
//                             ItemSeparatorComponent={this.FlatListItemSeparator}
//                             data={this.state.notificationsList}
//                             renderItem={({ item }) =>
//                                 <NotificationListItem
//                                     title={item.notification_title}
//                                     description={item.notification_description}
//                                 />}

//                             keyExtractor={(item, index) => index.toString()}
//                             onEndReached={this.handleLoadMore}
//                             refreshing={this.state.refreshing}
//                             onRefresh={this._handleRefresh}
//                             ListFooterComponent={this.renderFooter} />
//                     </View>

//                     <TouchableWithoutFeedback onPress={() =>
//                         Alert.alert(
//                             'Are you sure you want to delete all notifications ?',
//                             'All Notifications Will be deleted Permantly',
//                             [
//                                 {
//                                     text: 'No', onPress: () =>
//                                         //Actions.notifications()
//                                         console.log("delete nothing")
//                                 },
//                                 {
//                                     text: 'Yes', onPress: () => {
                                     
//                                        //call notification delete api 
//                                        callPostApi('http://guardomni.dutique.com:8000/api/complaintDelete', {
//                                             "userId": this.state.userID,
//                                             "flatId": this.state.flatId,
//                                         })
//                                             .then((response) => {
//                                                 // Continue your code here...
//                                                 res = JSON.parse(response)
//                                                 console.log("response : ", res)
//                                                 if (res.status == 200) {

//                                                     AsyncStorage.removeItem('complaintID')
//                                                     AsyncStorage.removeItem('userID')
//                                                     //Actions.pop('Complaints');
//                                                     DeviceEventEmitter.emit('eventDeletedComplaint',{isDeletedSuccessFully: true});
//                                                     Actions.popTo('_Complaints');

//                                                     SimpleToast.show(res.message)
//                                                 } else {
//                                                     SimpleToast.show(res.message)
//                                                 }
//                                             });

//                                     }
//                                 }
//                             ],
//                             { cancelable: true }
//                         )


//                     }>
//                         <Image style={styles.thumbnail_arrow}
//                             source={require('./assets/Home/delete_fab.png')} />
//                     </TouchableWithoutFeedback>

//                 </View>
//             )
//         }
//     }
// }
// export default Notifications;

// const styles = {
//     container: {
//         backgroundColor: white_Original,
//         width: '95.55%',
//         height: '100%',
//         display: 'flex',
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         padding: 5,
//         marginLeft: 10,
//         justifyitems: 'center',
//         elevation: 4,
//         marginTop: 12,
//         borderRadius: 2
//     },
//     thumbnail_arrow: {
//         height: 55,
//         width: 55,
//         elevation: 4,
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         //padding: 20,
//         //flex: 1,
//         justifyContent: 'flex-end',
//         //alignItems: 'flex-end',
//         marginRight: 10,
//         //alignSelf: 'flex-end',
//         // marginLeft: 10,
//         marginBottom: 8
//     }
// }

// // import React, { Component } from 'react'
// // import { FlatList ,Text,View,TouchableWithoutFeedback, Image } from 'react-native'
// // import axios from 'axios'
// // import Placeholder from 'rn-placeholder'
// // import { red_lighter, white_Original, grey } from './common'
// // import { Actions } from 'react-native-router-flux'
// // import NotificationListItem from './common/NotificationListItem'

// // class Notifications extends Component {
// // state = {
// //     refreshing: true,
// //     user: [],
// // }
// // renderUsersList() {
// //       this.setState({refreshing: true});
// //       axios.get('https://jsonplaceholder.typicode.com/getNotificationList')
// //       .then(response => {
// //           this.setState({ user: response.data, refreshing: false}),
// //           console.log("hi ",response.data)
// //       }
// //     ).catch((error) =>{
// //                   console.log(error)
// //                   this.setState({
// //                           refreshing: false,
// //         })
// //       }); 
// // }
// // componentWillMount(){
// //     this.renderUsersList()
// // }

// // _handleRefresh = () => {
// //     this.setState({
// //         refreshing: false,
// //     },
// //     () => {
// //         this.renderUsersList();
// //     })
// // }

// // FlatListItemSeparator = () => {
// //     return (
// //       <View
// //         style={{
// //           height: 0.4,
// //           width: "95%",
// //           backgroundColor: grey,
// //           marginLeft: 10, 
// //           marginRight: 10,
// //         }}
// //       />
// //     );
// //   }
// // render() {
// //     if(this.state.refreshing){
// //         return(
// //             <View style={{backgroundColor: red_lighter, flex: 1}}>
// //                 <View style={styles.container}>
// //                     <FlatList            
// //                         data= {this.state.user}
// //                         ItemSeparatorComponent = {this.FlatListItemSeparator}         
// //                         renderItem={({item}) => 
// //                             <Placeholder.Paragraph
// //                                 lineSpacing={10}
// //                                 firstLineWidth={'50%'}
// //                                 animate='fade'
// //                                 color={'grey'}
// //                                 lastLineWidth="30%"
// //                                 //onReady={this.state.refreshing}>
// //                                 // onReady={true}>  
// //                                 >
// //                                 <NotificationListItem/>
// //                                 {/* <Text style={{padding: 10, justifyContent:'center', fontSize: 14}}> {item.name} </Text> */}
// //                                     <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>
// //                                     </Placeholder.Paragraph>
// //                                 }
// //                                 refreshing={this.state.refreshing}
// //                                 onRefresh={this._handleRefresh}/>
// //                     </View>

// //     </View>
// //             )
// //     }else{
// //     return(
// //         <View style={{backgroundColor: red_lighter,flex: 1,marginBottom: 5}}>
// //             <View style={styles.container}>
// //                 <FlatList   
// //                     ItemSeparatorComponent = {this.FlatListItemSeparator}         
// //                     data= {this.state.user}
// //                     renderItem={({item}) => 
// //                     <NotificationListItem/>}
// //                     // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
// //                     refreshing={this.state.refreshing}
// //                     onRefresh={this._handleRefresh}/>
// //             </View>

// //             <TouchableWithoutFeedback>
// //              <Image style={styles.thumbnail_arrow}
// //                             source={require('./assets/Home/delete_fab.png')}/> 
// //             </TouchableWithoutFeedback>

// //         </View>
// //     )
// //    }
// // }

// // }
// // export default Notifications;

// // const styles = {
// //     container: {
// //         backgroundColor: white_Original,
// //         width: '95.55%',
// //         height: '100%',
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         flexDirection: 'row',
// //         padding: 5,
// //         marginLeft: 10,
// //         justifyitems: 'center',
// //         elevation: 4,
// //         marginTop: 12,
// //         borderRadius: 2
// //     },
// //     thumbnail_arrow: {
// //         height: 55,
// //         width: 55,
// //         elevation: 4,
// //         position: 'absolute',
// //         bottom:0,
// //         right: 0,
// //         justifyContent: 'flex-end',
// //         //justifyContent: 'flex-end',
// //         marginRight: 10,
// //         marginBottom: 8,
// //       }

// // }