//2
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import HomeNumberOfVisitors from './common/HomeNumberOfVisitors'
// import TabBar from "react-native-underline-tabbar";
// import FlatListForVisitorsHistory from './FlatListForVisitorsHistory'
// import FlatListForVisitors from './FlatListForVisitors'
// import { purple } from './common';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//     fontSize: 28,
//   },
//   tabItem: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     padding: 10,
//     marginLeft: 12,
//     marginRight: 5,
//     borderBottomColor: purple,
//     borderBottomWidth: 2
//   }
// });

// export default class Visitors extends Component {
//   render() {
//     return (
//         <ScrollableTabView>
//           <FlatListForVisitors tabLabel="React" />
//           <FlatListForVisitorsHistory tabLabel="Flow" />
//         </ScrollableTabView>
//     )
//   }
// }

//1
import * as React from 'react'
import { View, Animated, TouchableOpacity, StyleSheet, AsyncStorage, Image, DeviceEventEmitter, BackHandler } from 'react-native'
import { TabView, SceneMap, PagerScroll,PagerPan } from 'react-native-tab-view'
import HomeNumberOfVisitors from './common/HomeNumberOfVisitors'
import FlatListForVisitors from './FlatListForVisitors'
import { purple, black, grey, red_lighter } from './common'
import { Actions } from 'react-native-router-flux'
import FlatListForVisitorsHistory from './FlatListForVisitorsHistory'
import { callPostApi } from './Util/APIManager'
import { ScrollableTab } from 'native-base'
import ScrollableTabView from 'react-native-scrollable-tab-view';

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

    callPostApi('http://guardomni.dutique.com:8000/api/visitorList', {
      "userId": this.state.userId,
      "pageNumber": 0,
      "flatId": this.state.flatId
    }).then((response) => {

      res = JSON.parse(response)

      if (res.status == 200) {
        this.setState({
          noOfVisitors: res.month_count + "",
          status: res.status
        })
      } else if (res.status == 401) {

        AsyncStorage.removeItem('propertyDetails');
        AsyncStorage.removeItem('userDetail');
        AsyncStorage.removeItem('LoginData');

        Actions.reset('Login')
      } else {
        this.setState({
          refreshing: false,
        })
      }
    });
  }

  handleBackPress() {
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

  _handleIndexChange = index => this.setState({ index: index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={{ backgroundColor: red_lighter }}>

        <HomeNumberOfVisitors
          noOfVisitors={this.state.noOfVisitors} />

        <View style={styles.tabBar}>
          {
            props.navigationState.routes.map((route, i) => {
              console.log("route : " + route + ',' + i)
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

  componentWillUnmount() {
    this.addRequestListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    return true;
  }

  renderPager = props => (
    <PagerPan {...props} />
  )

  render() {
    if (this.state.refreshing) {
      return (
        <View style={styles.container}>
          <TabView
            swipeEnabled={true}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            renderPager={this.renderPager}
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
            renderPager={this.renderPager}
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

