import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import HomeListItems from './common/HomeListItems';
import HomeBottom from './common/HomeBottom';
import HomeVisitorsItems from './common/HomeVisitorItem';
import HomeComplaints from './common/HomeComplaints';
import HomeNotices from './common/HomeNotices';
import HomeHelpDesk from './common/HomeHelpDesk';
import { red_lighter } from './common/color'
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

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

  componentWillUnmount() {
    Actions.pop()
    return true;
  }
  componentDidMount() {
    this._getStorageValue();
  }

  async _getStorageValue() {
    var value = await AsyncStorage.getItem('propertyDetails')
    var data = JSON.parse(value);
    if (data != '' || data != null) {
      this.setState({
        propertyData: data
      })
      console.log("image >>>"+this.state.propertyData.site_image)
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