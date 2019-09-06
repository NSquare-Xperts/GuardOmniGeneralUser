import React, { Component } from 'react'
import { Text, View, FlatList, Dimensions, ActivityIndicator,AsyncStorage } from 'react-native'
import Placeholder from 'rn-placeholder'
import { white_Original, red_lighter, grey_lighter, grey_light,grey } from '../common';
import axios from 'axios';
import { callPostApi } from '../Util/APIManager';
import HOmeMaintaince from '../common/HOmeMaintaince';
import Paysection from './Paysection';
import TransactionHistoryListItems from '../common/TransactionHistoryListItems';

class Maintaince extends Component {

  state = {
    refreshing: true,
    loadMore: false,
    isReload: true,
    history: [],
    res: '',
    page: 0,
    userId: '',
    flatId: '',
    maintenanInfo:'',
    flatno:'',
    amount:'NA',
    dueDate:'NA'
  }
  //call async data
  async _getUserStorageValue() {

    var value = await AsyncStorage.getItem('propertyDetails')
    var data = JSON.parse(value);

    var valueUser = await AsyncStorage.getItem('userDetail')
    var dataUser = JSON.parse(valueUser);

    if (dataUser != '' || dataUser != null) {
      this.setState({
        userId: dataUser.user_id,
        flatId: data.flat_id,
      },this.renderList)
    }
  }

  componentDidMount() {
    this._getUserStorageValue()
  }

  _handleRefresh = () => {
    this.setState({
      refreshing: true,
      loadMore: false,
      page: 0,
      history: []
    },
      () => {
        this.renderList();
      })
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
    )
  }

  handleLoadMore = () => {
    this.setState(
      { page: this.state.page + 1, loadMore: true },
      this.renderList
    )
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

  _emptyList = () => {
    //call for empty component or error
    if (this.state.loadMore || this.state.refreshing) {
      return (
        <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>

        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: 'white', display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>
          <Text style={styles.textStyle}>No History Found</Text>
        </View>
      )
    }
  }

  renderList() {
    
    console.log("response : Complaints ", this.state.userId)
    console.log("response : Complaints ", this.state.page)
    
    callPostApi('http://18.188.253.46:8000/api/userMaintenance', {
      "userId": this.state.userId,
      //"pageNumber": 0,
       "pageNumber": this.state.page,
      "flatId": 96
      // "flatId": this.state.flatId
      //
    }).then((response) => {
      // Continue your code here...
      res = JSON.parse(response)
      
      console.log("response : Complaints ", res.status)
      console.log("response : Complaints main info ",res.data.maintenanInfo)
      if (res.status == 200) {

        console.log("maintenance res " + JSON.stringify(res))
        this.setState({
          maintenanInfo: res.data.maintenanInfo[0],
          history: this.state.history.concat(res.data.transactions), loadMore: false, refreshing: false,
          status: res.status
        })
      } else if (res.status == 400) {
        this.setState({
          refreshing: false,
          loadMore: false
        })
      } else {
        this.setState({
          refreshing: false
        })
      }
    });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
 
        <HOmeMaintaince
           flatno={this.state.maintenanInfo.site_structure_name +'-'+this.state.maintenanInfo.flat_no}/>
       
       <Paysection 
         amount={this.state.maintenanInfo.maintenanceAmount}
         dueDate={this.state.maintenanInfo.dueDate} />

        <View style={styles.container}>
          <FlatList
            ListEmptyComponent={this._emptyList}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            data={this.state.history}
            nestedScrollEnabled={true}
            renderItem={({ item }) =>
              
                  <TransactionHistoryListItems
                 // notice_image={'1'}
                 // index={item.index}
                  transactionId={item.transactionId}
                  paidAmount={item.paidAmount}
                  transactionDate={item.transactionDate}
                /> 
             
            }
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            refreshing={this.state.refreshing}
            onRefresh={this._handleRefresh}
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    scrollEnabled: true,
    marginLeft: 10,
    justifyitems: 'center',
    elevation: 4,
    marginTop: 12,
    borderRadius: 2
  },
  errorStyle: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 20,
    paddingTop: 5,
    color: 'red'
  },
  textstyle: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 20,
    paddingTop: 8,
    color: grey_light
  },
  card: {
    backgroundColor: white_Original,
    width: '98%',
    height: '100%',
    display: 'flex',
    flex: 1,
    padding: 10,
    marginTop: 10,
    //justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    /// marginLeft: 10,
    // marginRight: 10,
    elevation: 4,
    borderRadius: 3
  },
  containerStyle: {
    display: 'flex',
    flex: 1,
    padding: 6,
    backgroundColor: red_lighter
  },
  imageStyle: {
    width: 83,
    height: 83,
    borderRadius: 20,
    borderWidth: 2,
    marginTop: 15,
    marginLeft: 15,
    borderColor: grey_lighter,
  },
  loader: {
    marginTop: 20,
    alignItems: 'center'
  }
}
export default Maintaince;