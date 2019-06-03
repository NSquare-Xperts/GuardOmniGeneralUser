import React, { Component } from 'react'
import { View, ScrollView, Text, Image, AsyncStorage,BackHandler } from 'react-native'
//import axios from 'axios'
import { white_Original, grey, black, red_lighter } from './common'
import { callPostApi } from './Util/APIManager';
import ImageLoad from 'react-native-image-placeholder'
import {Actions} from 'react-native-router-flux'

class NoticeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeId: props.noticeID,
      refreshing: true,
      text: '',
      details: [
        {
          "notice_title": "NA",
          "notice_type": 0,
          "created_at": "NA",
          "notice_image": '',
          "notice_description": "NA"
        }
      ]
    }
  }

  renderNoticeDetails() {

    AsyncStorage.multiGet(["LoginData"]).then((data) => {
      LoginData = data[0][1];
      var res = JSON.parse(LoginData)

      this.setState({ userId: res.data[0].user_details.user_id })
      console.log('userId :: ', this.state.userId)
      console.log("notice ID details", this.state.noticeId);

      callPostApi('http://guardomni.dutique.com:8000/api/noticeDetails', {
        "userId": this.state.userId,
        "noticeId": this.state.noticeId
      })
        .then((response) => {
          // Continue your code here...
          res = JSON.parse(response)
          console.log("response : ", res)
          console.log("title : ", res.data[0].notice_title)
          if (res.status == 200) {
            this.setState({
              details: res.data, loadMore: false
              //status: res.status
            })
            console.log("detail : ", details[0].notice_title)
          } else if (res.status == 401) {

            AsyncStorage.removeItem('propertyDetails');
            AsyncStorage.removeItem('userDetail');
            AsyncStorage.removeItem('LoginData');
            //SimpleToast.show(response.message)
            Actions.reset('Login')
          }else {
            console.log("stop calling")
          }
        });
    });
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    this.renderNoticeDetails()
  }
  handleBackPress() {
    console.log("---scene---" + Actions.currentScene)
    if (Actions.currentScene == 'NoticeDetail') {
        Actions.pop()
    }
    return true;
}

  _handleRefresh = () => {
    this.setState({
      refreshing: false,
    },
      () => {
        this.renderNoticeDetails();
      })
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: "95%",
          backgroundColor: grey,
          marginLeft: 10,
          marginRight: 10,
        }}
      />
    );
  }

  _hideShowImageView() {

    if (this.state.details[0].notice_image != "") {
      return (
        <View>
          {/* <Image
                    style={styles.thumbnail}
                    source={{ uri: this.state.details[0].notice_image }} /> */}

          <ImageLoad
            style={styles.thumbnail}
            loadingStyle={{ size: 'large', color: 'blue' }}
            source={{ uri: this.state.details[0].notice_image }}
          />

        </View>
      )
    }
  }

  render() {
    console.log("render");
    return (
      <View style={{ backgroundColor: red_lighter, flex: 1 }}>
        <ScrollView style={styles.container}>

          <Text style={styles.textTitleStyle}>{this.state.details[0].notice_title}</Text>
          <Text style={styles.textTitleStyle}>{this.state.details[0].created_at}</Text>

          {this._hideShowImageView()}
          <Text style={styles.textDetailStyle}>{this.state.details[0].notice_description}
          </Text>
        </ScrollView>
      </View>
    )
  }
  componentWillUnmount() {

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    return true;
}
}
export default NoticeDetail;

const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    height: '100%',
    display: 'flex',
    //justifyContent: 'space-between',
    flexDirection: 'column',
    //padding:7,
    marginLeft: 10,
    justifyitems: 'center',
    elevation: 4,
    marginTop: 12,
    borderRadius: 2,
    marginBottom: 5
  },
  thumbnail: {
    height: 155,
    width: '100%',
    //alignSelf: 'flex-end',
    //justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  gridRowStyle: {
    flexDirection: 'row',

  },
  gridColStyle: {
    flexDirection: 'column'
  },
  textTitleStyle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    color: black,
    padding: 3,
    marginLeft: 5

  },
  textDetailStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: black,
    padding: 3,
    marginLeft: 5
  }

}