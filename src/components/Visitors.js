import * as React from 'react'
import { View, Animated, TouchableOpacity, StyleSheet, AsyncStorage, Image, DeviceEventEmitter, BackHandler } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import HomeNumberOfVisitors from './common/HomeNumberOfVisitors'
import FlatListForVisitors from './FlatListForVisitors'
import { purple, black, grey, red_lighter } from './common'
import { Actions } from 'react-native-router-flux'
import FlatListForVisitorsHistory from './FlatListForVisitorsHistory'
import { callPostApi } from './Util/APIManager'

export default class Visitors extends React.Component {
  state = {
    refreshing: true,
    noOfVisitors: 'NA',
    pressStatus: false,
    index: 0,
    inputStyle: '',
    swipeEnabled: true,
    flatId: '',
    routes: [
      { key: 'first', title: 'Request' },
      { key: 'second', title: 'History' },
    ],
  };

  componentWillMount() {
    //  this.renderUsersList
    this.addRequestListener =
      DeviceEventEmitter.addListener('eventVisitorRequestAdded', (e) => {
        if (e) {
          this.setState({
            refreshing: true,
            loadMore: false,
            page: 0,
            swipeEnabled: true,
            notices: []
          })
          this._getStorageValue()
        }
        this._getStorageValue()
      });
    this._getStorageValue()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  renderUsersList() {
    console.log("----------call render : ")
    callPostApi('http://192.168.0.32:8000/api/visitorList', {
      "userId": this.state.userId,
      "pageNumber": 0,
      "flatId": this.state.flatId
    }).then((response) => {
      //console.log("response : ")   
      res = JSON.parse(response)
      // console.log("******res : ",res)
      //console.log("---------* noOfVisitors : ", res.month_count)
      if (res.status == 200) {
        this.setState({
          noOfVisitors: res.month_count + "",
          status: res.status
        })
      } else if (res.status == 401) {

        AsyncStorage.removeItem('propertyDetails');
        AsyncStorage.removeItem('userDetail');
        AsyncStorage.removeItem('LoginData');
        //SimpleToast.show(response.message)
        Actions.reset('Login')
      } else {
        this.setState({
          refreshing: false,
        })
      }
    });
  }


  handleBackPress() {
    console.log("---scene---" + Actions.currentScene)
    if (Actions.currentScene == 'visitors') {
      Actions.pop()
    }
    return true;
  }

  //userID and FlatId
  async _getStorageValue() {
    var value = await AsyncStorage.getItem('propertyDetails')
    var data = JSON.parse(value);

    var valueUser = await AsyncStorage.getItem('userDetail')
    var dataUser = JSON.parse(valueUser);


    if (data != '' || data != null) {
      this.setState({
        userId: dataUser.user_id,
        flatId: data.flat_id
      }, this.renderUsersList())
      this.renderUsersList()
    }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={{ backgroundColor: red_lighter }}>

        <HomeNumberOfVisitors
          noOfVisitors={this.state.noOfVisitors} />
        <View style={styles.tabBar}>
          {
            props.navigationState.routes.map((route, i) => {
              const color = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map(
                  inputIndex => (inputIndex === i ? black : grey),
                ),
              });
              return (
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => this.setState({ index: i })}>
                  <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FlatListForVisitors,
    second: FlatListForVisitorsHistory
  });
  //  AddTodoButton = ({ onPress }) => (
  //   <Fab
  //       direction="up"
  //       containerStyle={{}}
  //       style={{ backgroundColor: COLORS.primary }}
  //       position="bottomRight"
  //       onPress={onPress}
  //   >
  //       <Icon name="add" />
  //   </Fab>
  // );

  componentWillUnmount() {
    this.addRequestListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    return true;
  }
  render() {
    if (this.state.refreshing) {
      return (
        <View style={styles.container}>
          <TabView
            swipeEnabled={true}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange} />

        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <TabView
            swipeEnabled={true}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: red_lighter
  },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    marginLeft: 12,
    marginRight: 5,
    borderBottomColor: purple,
    //borderBottomLeftRadius: 8,
    borderBottomWidth: 2
  },
  tabItemNoBorder: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    marginLeft: 10,
    marginRight: 5,
    borderBottomColor: 'black',
    borderBottomLeftRadius: 8,
    borderBottomWidth: 2
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
    marginLeft: 10,
    marginBottom: 8
  }
});

// import React, { Component } from 'react';
// import {View, Text, Image, Dimensions} from 'react-native';
// import {  TabView, SceneMap } from 'react-native-tab-view';

// const FirstRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
//   );
//   const SecondRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
//   );

// class Visitors extends Component{
//     state = {
//         index: 0,
//         routes: [
//           { key: 'first', title: 'First' },
//           { key: 'second', title: 'Second' },
//         ],
//       };

//     render(){
//         return (
//             <TabView
//             indicatorStyle={{ height: 0, borderBottomWidth:2, borderBottomColor:'#f7a500' }}
//               navigationState={this.state}
//               renderScene={SceneMap({
//                 first: FirstRoute,
//                 second: SecondRoute,
//               })}
//               onIndexChange={index => this.setState({ index })}
//               //initialLayout={{width: 'auto'}}
//              // initialLayout={{ width: Dimensions.get('window').width }}
//             />
//           );
// //         return(            
// //             // <View style={{ display: 'flex', flex: 1,justifyContent: 'flex-start'}}>
// //         <View>
// //                 {/* <View style={styles.containerTop}>
// //                         <Image  style={styles.thumbnail}/>
// //                         <Text style={styles.textStyleTopContainer}>
// //                                 HIIII </Text>      
// //                 </View> */}
// //                 <View>
// //                         <TabView
// //                                 navigationState={this.state}
// //                                 renderScene={SceneMap({

// //                                     first: FirstRoute,
// //                                     second: SecondRoute,

// //                                 })}  
// //                                 onIndexChange={index => this.setState({ index})}
// //                                 initialLayout={{width: Dimensions.get('window').width}}
// //                         />

// //                  </View>

// //             </View>
// //         )
//     }
// }
// const styles = {
//     scene:{
//      flex: 1

//     },
// containerTop: {
//     backgroundColor: 'white',
//     width : '95.55%',
//     height : 130,
//     display : 'flex',
//     marginLeft: 10,
//     marginTop: 10,
//     elevation: 4
// },
// thumbnail: {
//     width : 25,
//     height : 25
// },
// textStyleTopContainer: {
//         textSize: 14,
//         color: 'black',
//         alignSelf: 'flex-start',
//         marginLeft: 15

//     },
//     tabBar: {
//       flexDirection: 'row',
//       justifyContent: 'flex-start',
//     },
//     tabItem: {
//       flexDirection: 'row',
//       justifyContent:'flex-start',
//       alignItems: 'flex-start',
//       padding: 8,
//     }
// }
// export default Visitors;