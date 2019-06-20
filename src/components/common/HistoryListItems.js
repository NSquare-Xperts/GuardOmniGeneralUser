import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Alert,DeviceEventEmitter } from 'react-native';
import { black } from './color';
import { Dialog } from 'react-native-simple-dialogs';
import { Complaint_Description_Text } from './constants';
import { callPostApi } from '../Util/APIManager';
import SimpleToast from 'react-native-simple-toast';

//make component 
class HistoryListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowingDialog: false,
    }
  }
  render() {
    const { gridRowStyle, thumbnail_arrow, gridColStyle, textStyle } = styles;
    return (
      <View>
        <Dialog
          visible={this.state.isShowingDialog}
          title=""
          onTouchOutside={() => this.setState({ isShowingDialog: false })} >
          <View style={{ flexDirection: 'column' }}>
            <Image style={styles.thumbnail_popup}
              source={require('../assets/Common/success_icon.png')} />
            <Text style={styles.textStyleBold}>Visit Reported</Text>
            <Text style={styles.textStylePopup} >Further actions will be taken by administration</Text>
          </View>
        </Dialog>

        <View style={gridRowStyle}>
          <View style={gridColStyle}>
            <Text style={textStyle}>{this.props.visitor_name} </Text>
            <View style={{ flexDirection: 'row' }}>

              <Text style={styles.textStyleTime}>{this.props.in_date_time}</Text>
              {/* <Text style={styles.textStyleTime}>  IN : </Text>
                                <Text style={styles.textStyleTime}>10:00 AM</Text> */}
              <Text style={styles.textStyleTime}>  {this.props.out_date_time} </Text>
              {/* <Text style={styles.textStyleTime}>12:00 PM</Text> */}
            </View>
          </View>
        
          
          <TouchableWithoutFeedback onPress={() =>

          {this.props.status == false ? 
            Alert.alert(
              'Want to report this visit ?',
              'Visitor will be reported to admin for further actions',
              [
                {
                  text: 'No', onPress: () =>
                    console.log('Cancel Pressed')

                },
                {
                  text: 'Yes', onPress: () => {
                    // openAlertOK()
                    //openAlertOK()
                    //call report API
                    console.log("userID VID", this.props.userId, this.props.visitorId)

                    callPostApi('http://18.188.253.46:8000/api/visitorReport', {
                      "userId": this.props.userId,
                      "visitorId": this.props.id,
                    })
                      .then((response) => {
                        // Continue your code here...
                        res = JSON.parse(response)
                        console.log("response : ",res)
                        if (res.status == "200") {

                          //refresh visitor list 
                          DeviceEventEmitter.emit('eventReported',{iseventReportedSuccessFully: true});
                          this.setState({
                            isShowingDialog: true
                          })
                        } else {
                          this.setState({
                            isShowingDialog: false
                          })
                        SimpleToast.show("Failed To Report.")
                        }
                      });
                    //this.setState({ isShowingDialog: true })
                  }
                }
              ],
              { cancelable: true }
            )

            :

            SimpleToast.show("Already Reported.")
            }
            //selectedValue={this.state.selectedValue}
            //onAccept={()=>this.onAccept()}
            //onDecline={()=>this.onDecline()}
            //onValueChange={(value)=>this.onValueChange(value)}
            //item={this.state.item}
          }>
          {/* :  
              <Image style={thumbnail_arrow}
                source={require('../assets/Home/information_icn.png')}
              /> */}

            <View style={styles.rightSideButtonStyles}>
              <Image style={thumbnail_arrow}
                source = {{uri : this.props.flag_reported_image }}
              />
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
    marginLeft: 0,
    justifyitems: 'center',
    elevation: 4,
    borderRadius: 2
  },
  thumbnail: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginLeft: 0,
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
  gridColStyle: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textStyle: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: black,
    alignSelf: 'flex-start',
  },
  textStylePopup: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: black,
    alignSelf: 'center',
  },
  textStyleBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    color: black,
    alignSelf: 'center',
  },
  textStyleTime: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: black,
    alignSelf: 'flex-start',
    //marginLeft: 0,
    //marginTop: 2
  },
  rightSideButtonStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  dialogTextTitle: {
    fontSize: 16,
    justifyContent: 'center',
    flexDirection: 'column',

  },
  thumbnail_popup: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  }
}

export default HistoryListItem;
