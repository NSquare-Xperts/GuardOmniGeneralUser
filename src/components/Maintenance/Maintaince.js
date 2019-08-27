import React, { Component } from 'react'
import { Text, View,FlatList, ImageBackground,Dimensions, Image, ActivityIndicator, PixelRatio, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Button from '../common/Button'
import { titleChanged, commentsChanged, addComplaint_ } from './ComplaintsActions'
import { white_Original, red_lighter, grey_lighter, grey_light, Add_Complaint } from '../common';
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import HOmeMaintaince from '../common/HOmeMaintaince'
import Paysection from './Paysection'
import { callPostApi } from '../Util/APIManager'
import ComplaintListItems from '../common/ComplaintListItem'

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

      }, this.renderList)
    }
  }

  componentWillUnmount() {
    //return true;
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
            <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>
                <Text style={styles.textStyle}>No Complaints Added Yet</Text>
            </View>
        )
    }
}

renderList() {
  callPostApi('http://18.188.253.46:8000/api/complaintList', {
      "userId": this.state.userId,
      "pageNumber": this.state.page,
      "flatId": this.state.flatId
  }).then((response) => {
      // Continue your code here...
      res = JSON.parse(response)
      console.log("response : Complaints ", res.status)
      console.log("response : Complaints length ", res.data)
      if (res.status == 200) {
          this.setState({
              history: this.state.history.concat(res.data), loadMore: false, refreshing: false, 
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
       
          <HOmeMaintaince/>
          <Paysection/>

          <View style={styles.container}>
                        <FlatList
                            ListEmptyComponent={this._emptyList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            data={this.state.notices}
                            nestedScrollEnabled={true}
                            renderItem={({ item }) =>
                                <Placeholder.Paragraph>
                                    <ComplaintListItems
                                        //notice_image={'1'}
                                        //index={item.index}
                                        sendData={(item, status) => this._sendData(item, status)}
                                        complaintId={item.id}
                                        complaint_title={item.complaint_title}
                                        complaint_description={item.complaint_description}
                                        complaint_status={item.complaint_status}
                                        complaint_status_img={item.complaint_status_image}
                                        //out_date_time={item.out_date_time}
                                    />
                                </Placeholder.Paragraph>
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
//connect(mapStateToProps, { titleChanged, commentsChanged, addComplaint_ })(AddComplaintNew)