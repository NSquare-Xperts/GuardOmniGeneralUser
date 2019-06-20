import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Alert,DeviceEventEmitter } from 'react-native';
import { callPostApi } from '../Util/APIManager';
import { black, white_Original } from './color';
import { Dialog } from 'react-native-simple-dialogs'
//import SimpleToast, { Toast } from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
//import { SimpleToast } from 'react-native-simple-toast';
//import Toast from 'react-native-easy-toast'
import SimpleToast from 'react-native-simple-toast';
//make component 
//const RequestListItems = (props) => {

class RequestListItems extends Component {

  constructor(props) {
    super(props);
    this.state = { isShowingDialog: false ,
    
    }
  }
  render() {
    const { gridRowStyle, thumbnail_arrow, gridColStyle, textStyle, textStyleDate } = styles;
    return (
      <View>
        <Dialog
          visible={this.state.isShowingDialog}
          title=""
          onTouchOutside={() => this.setState({ isShowingDialog: false })} >
          <View style={{ flexDirection: 'column' }}>
            <Image style={styles.thumbnail_popup}
              source={require('../assets/Common/success_icon.png')} />
            <Text style={styles.textStyleBold}>Request deleted successfully</Text>
            <Text style={styles.textStylePopup} >See updated list under request</Text>
          </View>
        </Dialog>

        <View style={gridRowStyle}>

          <View style={gridColStyle}>
            <Text style={textStyle}>{this.props.visitor_name} </Text>
            <Text style={textStyleDate}>{this.props.request_date_time}</Text>
          </View>
          
          <TouchableWithoutFeedback onPress={() =>
            Actions.editVR({ visitorRequestId: this.props.id})
          }>
            <View style={styles.rightSideButtonStyles}>
              <Image style={thumbnail_arrow}
                source={require('../assets/Home/edit_icn.png')} />
            </View>
          </TouchableWithoutFeedback>

          {/* delete perticular entry */}

          <TouchableWithoutFeedback onPress={() =>
            Alert.alert(
              'Want to delete request ?',
              'Visitor entry will be removed from request',
              [
                {
                  text: 'No', onPress: () =>
                    console.log('Cancel Pressed')

                },
                {
                  text: 'Yes', onPress: () => {

                    callPostApi('http://18.188.253.46:8000/api/deleteVisitorRequestById', {
                      "userId": this.props.userId,
                      "visitorRequestId": this.props.id,
                      "isDeleted": '1'
                    })
                      .then((response) => {
                        // Continue your code here...
                        res = JSON.parse(response)
                        console.log("request response : ")
                        if (res.status == 200) {
                          
                          DeviceEventEmitter.emit('eventVisitorDeleted', { isDeletedSuccessFully: true });
                          this.setState({
                            isShowingDialog: true
                          })
                        } else {
                          // console.log(" Toast stop calling")
                          this.setState({
                            isShowingDialog: false
                          })
                       SimpleToast.show("Failed To Add Request.")
                        //Toast.show("Failed To Add Request.")
                        }
                      });

                    //this.setState({ isShowingDialog: true })
                  }
                }
              ],
              { cancelable: true }
            )
            //selectedValue={this.state.selectedValue}
            //onAccept={()=>this.onAccept()}
            //onDecline={()=>this.onDecline()}
            //onValueChange={(value)=>this.onValueChange(value)}
            //item={this.state.item}
          }>

            <View style={styles.rightSideButtonStyles}>
              <Image style={thumbnail_arrow}
                source={require('../assets/Visitor/delete_icn.png')} />
            </View>

          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}
const styles = {
  container: {
    backgroundColor: 'white',
    width: '95.55%',
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    justifyitems: 'center',
    elevation: 4,
    borderRadius: 2
  },
  thumbnail: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginLeft: 25,
  },
  thumbnail_arrow: {
    height: 25,
    width: 25,
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  gridRowStyle: {
    width: '95.55%',
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
    justifyContent: 'space-between'
  },
  textStylePopup: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: black,
    alignSelf: 'center',
  },
  gridColStyle: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textStyle: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 15
  },
  textStyleDate: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 2
  },
  textStyleBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    color: black,
    alignSelf: 'center',
  },
  rightSideButtonStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  thumbnail_popup: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  }

}

export default RequestListItems;
