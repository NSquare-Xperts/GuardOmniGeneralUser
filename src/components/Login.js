import React, { Component } from 'react'
import { View, Text, Keyboard, TouchableWithoutFeedback, ActivityIndicator, KeyboardAvoidingView, Image,Platform } from 'react-native'
import LoginInput from './LoginInput'
import Button from './common/Button'
import { phoneChanged, otpChanged, loginUser, logoutPressed, VerifyOtp, closeBlackPopup } from '../actions'
import { Login_label, Please_Select_Country_Code_Before_Mobile_Number, Didnot_received_otp_click_to_resend, App_Name } from './common/constants'
import OtpInput from './otpInput'
import { connect } from 'react-redux'
import timer from 'react-native-timer'
import { red_lighter, black, grey, white_Original } from './common/color'
import { GuardOmni_Version } from './common/constants'
import { Actions } from 'react-native-router-flux'
import BlackPopup from './BlackPopup'
import { ScrollView } from 'react-native-gesture-handler'
import ImageButton from './common/ImageButton'
import firebase from 'react-native-firebase'

class Login extends Component {
  state = {
    isVisibleButton: true,
    reRender: false,
    error: '',
    errorOTP: '',
    edit: false,
    uri: require('./assets/Login/login_submit_click.png'),
    fcmToken: ''
  }
  onDecline() {
    this.props.closeBlackPopup()
  }

  changeLogo() {
    this.setState({
      uri: require('./assets/Login/login_unlock_click.png')
    });
  }

  renderButton() {
    if (this.props.auth.loading) {
      return (
        <ActivityIndicator
          size="large" color="#0000ff"
          animating />
      )
    } else {
      return (
        // <TouchableHighlight onPress={() => this.changeLogo()}>
        // <TouchableHighlight onPress={() => Actions.homepage()}>
        //   <Image
        //     source={this.state.uri}
        //     style={styles.loginButtonStyle} />
        // </TouchableHighlight>
        <ImageButton
          //style={styles.loginButtonStyle}
          image={this.state.uri}
          onPress={() => {
            if (this.props.auth.phone.length < 1) {
              this.setState({
                error: '    *Please Enter Registered Mobile Number.'
              })
            } else {
              // check failed or success
              this.props.loginUser(this.props.auth.code + '-' + this.props.auth.phone)
              // { this.renderisOTPVisible() }

            }
          }}>
          {/* {Login_label} */}
        </ImageButton>
      )
    }
  }

  _checkeyboardOpen() {
    if (Keyboard.dismiss) {

    }
  }

  renderVerifyButton() {
    if (this.props.auth.loading) {
      return (
        <ActivityIndicator
          size="large" color="#0000ff"
          animating />
      )
    } else {
      return (
        <ImageButton
          image={this.state.uri}
          onPress={() => {
            //Actions.homepage()
            phone = this.props.auth.code + '-' + this.props.auth.phone
            //phone = this.props.auth.phone
            otp = this.props.auth.otp
            console.log("otp : ", otp)
            if (this.props.auth.otp.length <= 0) {
              this.setState({
                errorOTP: '  *Please Enter OTP.'
              })
            }
            if (this.props.auth.phone.length <= 0) {
              this.setState({
                error: '   *Please Enter Registered Mobile Number.'
              })
            }
            else {

              token = this.state.fcmToken
              platform = Platform.OS

              this.props.VerifyOtp({ phone, otp,token,platform })

              this.setState({
                edit: true
              })
              timer.setTimeout(
                this, 'hideMsg', () => {
                  this.props.closeBlackPopup()
                }, 4000
              )
            }
          }
          }></ImageButton>
      )
    }
    //     <Button onPress={()=>{
    //       Actions.viewPager();
    //                 //     phone = this.props.auth.code+this.props.auth.phone
    //                 //     otp = this.props.auth.otp
    //                 //     this.props.VerifyOtp({phone, otp})
    //                 //     timer.setTimeout(
    //                 //     this, 'hideMsg', () => {
    //                 //          this.props.closeBlackPopup()}, 4000
    //                 //   )
    //                 // this.props.loginUser(this.props.auth.code+this.props.auth.phone)
    //             }
    //         }>{Login_label}</Button>
    //     )
    // }
  }

  renderVerify() {
    if (this.props.auth.toggle && this.props.auth.isOTPVisible) {

      if (this.props.auth.error == '') {
        return (

          <View style={{ flex: 1 }}>
            <LoginInput
              editable={this.state.edit}
              phoneChange={(text) => this.props.phoneChanged(text)}
              value={this.props.auth.phone}
              code={this.props.auth.code} />

            <OtpInput
              isResendVisible={this.state.isResendVisible}
              otpChange={(text) => this.props.otpChanged(text)}
              otp={this.props.otp} />
            {/* value={this.props.auth.otp} /> */}

            <Text style={styles.textStyle}>{Didnot_received_otp_click_to_resend}</Text>

            <Text style={styles.errorStyle}>{this.state.errorOTP}</Text>

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>

              {this.renderVerifyButton()}

            </View>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1 }}>
            <LoginInput
              editable={false}
              phoneChange={(text) => this.props.phoneChanged(text)}
              value={this.props.auth.phone}
              code={this.props.auth.code} />

            <OtpInput
              otpChange={(text) => this.props.otpChanged(text)}
              otp={this.props.otp} />
            {/* value={this.props.auth.otp} /> */}

            <Text style={styles.textStyle}>{Didnot_received_otp_click_to_resend}</Text>

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>

              {this.renderVerifyButton()}

              <BlackPopup
                visible={this.props.auth.displayModal}
                onDecline={this.onDecline.bind(this)}
                description={this.props.auth.error} />
            </View>
          </View>
        )
      }
    } else {
      // console.log("error : ",this.props.auth.error)
      if (this.props.auth.error == '') {
        return (
          <View style={{ flex: 1 }}>

            <LoginInput
              phoneChange={(text) => this.props.phoneChanged(text)}
              value={this.props.auth.phone}
              code={this.props.auth.code} />


            <Text style={styles.errorStyle}>{this.state.error}</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
              {this.renderButton()}

            </View>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1 }}>

            <LoginInput
              phoneChange={(text) => this.props.phoneChanged(text)}
              value={this.props.auth.phone}
              code={this.props.auth.code} />

            {/* <Text style={styles.textStyle}>{Please_Select_Country_Code_Before_Mobile_Number}</Text> */}

            <Text style={styles.errorStyle}>{this.state.error}</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
              {this.renderButton()}

              <BlackPopup
                visible={this.props.auth.displayModal}
                onDecline={this.onDecline.bind(this)}
                description={this.props.auth.error} />

            </View>
          </View>

        )
      }
    }
  }

  componentDidMount= async()=>{
    const enabled = await firebase.messaging().hasPermission();
    if(enabled){
      //user has permissions 
    }else{
      try{
        await firebase.messaging().requestPermission();

      }catch(error){
       // alert('No permission for notification')
       console.log("No permission for notification")
      }
    }
    this.state.fcmToken = await firebase.messaging().getToken()
    console.log("FCM TOKEN "+this.state.fcmToken)
    
      // this.notificationListener = firebase.notifications().onNotification((notification) => {
      //   // Process your notification as required
      //   const { title, body, data } = notification;
      //   console.log("OnNotification GaurdHomePage")
      //   console.log("Data " + JSON.stringify(data) + "And " + data.id)
  
      //   const localNotification = new firebase.notifications.Notification({
      //     sound: 'default',
      //     vibration: 300,
      //     show_in_foreground: true,
      //     local: true
      //   }).setNotificationId(notification.notificationId)
      //     .setTitle(notification.title)
      //     .setBody(notification.body)
      //     .setData(notification.data)
      //     .android.setSmallIcon('@drawable/shield')
      //     .android.setColor('#000000')
      //     .android.setPriority(firebase.notifications.Android.Priority.High)
      //     .android.setChannelId(1)
      // });
  
      // firebase.notifications()
      //   .displayNotification(localNotification)
      //   .catch(err => console.error(err));
    
  
      // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      //   const { title, body, data } = notificationOpen.notification;
      //   if (data.notification_category == "3") {
      //     console.log("Inside If Open")
      //     Actions.ComplaintDetail({ complaintID: data.id })
      //   }else if (data.notification_category == "2") {
      //     Actions.ReportedInOutDetails({ RId: data.id })
      //   } else if (data.notification_category == "0") {
  
      //     console.log("Inside If notice detail ")
      //     Actions.NoticeDetail({ noticeID: data.id })
      //   }
      //   // Actions.popTo('_Complaints',{complaintID:data.id})
      //   // else if(data.notification_category==2)
      //   // Actions.popTo('ReportedInOutDetails',{RId:data.id})
      //   // else if()
      //   console.log("OnNotification Open GaurdHomePage")
      //   console.log("Data " + JSON.stringify(data))
      // })
    }

  componentWillMount() {

    this.props.auth.phone = ''
    //this.props.auth.code = '+91'
  }
  render() {
    if (this.props.auth.phone.length > 5) {
      this.state.error = ''
    }
    return (

      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode='none'
          contentContainerStyle={{ position: 'absolute', backgroundColor: red_lighter, justifyContent: 'flex-start', height: '100%', width: '100%' }}>

          <View style={{ flex: 1 }}>
            <Image style={styles.topImage}
              source={require('./assets/Login/shield.png')} />
            <Text style={styles.topText}>{App_Name}</Text>
            <View style={styles.container}>

              {this.renderVerify()}
              <Text style={styles.textVersion}>{GuardOmni_Version}</Text>

            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  componentWillUnmount() {

    // this.notificationListener();
    // this.notificationOpenedListener();

    

    this.props.auth.phone = ''
    this.props.auth.isOTPVisible = false
    this.props.auth.toggle = false

    Actions.pop()
    return true;

  }
}

const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    height: 150,
    display: 'flex',
    flex: 1,
    marginTop: 63,
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    elevation: 4,
    borderRadius: 4
  },
  textStyle: {
    fontSize: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
    paddingTop: 10,
    color: grey
  },
  topImage: {
    width: '30%',
    height: '20%',
    marginTop: 35,
    alignSelf: 'center',
    resizeMode: 'stretch'

  },
  topText: {
    fontFamily: 'OpenSans-Bold',
    color: black,
    fontSize: 20,
    marginTop: 5,
    alignItems: 'center',
    alignSelf: 'center'
  },
  errorStyle: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 20,
    paddingTop: 5,
    color: 'red',
  },
  textVersion: {
    fontFamily: 'OpenSans-Regular',
    color: grey,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    fontSize: 14,
    marginBottom: 5
  },
  loginButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: white_Original,
    alignSelf: 'center',

  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { phoneChanged, otpChanged, loginUser, logoutPressed, VerifyOtp, closeBlackPopup })(Login);
// class Login extends Component {
//   state = {
//     reRender: false,
//     error: '',
//     item: [
//       {
//         key: '1',
//         label: 'Too Much Task for the day',
//         value: 'Too Much Task for the day'
//       },
//       {
//         key: '2',
//         label: 'Client was not present at the site',
//         value: 'Client was not present at the site'
//       },
//       {
//         key: '3',
//         label: 'Weather was not suitable',
//         value: 'Weather was not suitable'
//       },
//       {
//         key: '4',
//         label: 'Fuel emptied',
//         value: 'Fuel emptied'
//       },
//       {
//         key: '5',
//         label: 'Tyre Puncture',
//         value: 'Tyre Puncture'
//       },],
//     uri: require('./assets/Login/login_submit_click.png'),
//     visible: true
//   }
//   onDecline() {
//     this.props.closeBlackPopup()
//   }

//   changeLogo() {
//     this.setState({
//       uri: require('./assets/Login/login_unlock_click.png')
//     });
//   }
//   // renderButton() {
//   //   if (this.props.auth.loading) {
//   //     return (
//   //       <ActivityIndicator
//   //         size="large" color="#0000ff"
//   //         animating />
//   //     )
//   //   } else {
//   //     return (
//   //       // <TouchableHighlight onPress={() => this.changeLogo()}>
//   //       <TouchableHighlight onPress={() => Actions.homepage()}>
//   //         <Image
//   //           source={this.state.uri}
//   //           style={styles.loginButtonStyle} />
//   //       </TouchableHighlight>
//   //       //     <Button onPress={()=>{
//   //       //       Actions.viewPager();
//   //       //     //     if(this.props.auth.phone.length<=5){
//   //       //     //       this.setState({
//   //       //     //         error: 'Please enter a valid phone number.'
//   //       //     //       })
//   //       //     //     }else{
//   //       //     //       timer.setTimeout(
//   //       //     //         this, 'hideMsg', () => {
//   //       //     //              this.props.closeBlackPopup()}, 4000
//   //       //     //       )
//   //       //     //     this.props.loginUser(this.props.auth.code+this.props.auth.phone)
//   //       //     // }
//   //       // }}>{Login_label}</Button>
//   //     )
//   //   }
//   // }

//   renderButton() {
//     if (this.props.auth.loading) {
//       return (
//         <ActivityIndicator
//           size="large" color="#0000ff"
//           animating />
//       )
//     }
//     else {
//       return (
//         <Button onPress={() => {
//           if (this.props.auth.phone.length <= 5) {
//             this.setState({
//               error: 'Please enter a valid phone number.'
//             })
//           }
//           else {
//             timer.setTimeout(
//               this, 'hideMsg', () => {
//                 this.props.closeBlackPopup()
//               }, 4000
//             )
//             this.props.loginUser(this.props.auth.code + this.props.auth.phone)
//           }
//         }}>Login</Button>
//       )

//     }
//   }

//   renderVerifyButton() {
//     if (this.props.auth.loading) {
//       return (
//         <ActivityIndicator
//           size="large" color="#0000ff"
//           animating />
//       )
//     } else {
//       return (
//         <Button onPress={() => {
//           phone = this.props.auth.code + this.props.auth.phone
//           otp = this.props.auth.otp
//           this.props.VerifyOtp({ phone, otp })
//           timer.setTimeout(
//             this, 'hideMsg', () => {
//               this.props.closeBlackPopup()
//             }, 4000
//           )
//         }
//         }>
//           Verify
//             </Button>
//       )
//     }
//     //     <Button onPress={()=>{
//     //       Actions.viewPager();
//     //                 //     phone = this.props.auth.code+this.props.auth.phone
//     //                 //     otp = this.props.auth.otp
//     //                 //     this.props.VerifyOtp({phone, otp})
//     //                 //     timer.setTimeout(
//     //                 //     this, 'hideMsg', () => {
//     //                 //          this.props.closeBlackPopup()}, 4000
//     //                 //   )
//     //                 // this.props.loginUser(this.props.auth.code+this.props.auth.phone)
//     //             }
//     //         }>{Login_label}</Button>
//     //     )
//     // }
//   }

//   renderVerify() {
//     if (this.props.auth.toggle) {
//       return (
//         <View style={{ flex: 1 }}>

//           <LoginInput
//             phoneChange={(text) => this.props.phoneChanged(text)}
//             value={this.props.auth.phone}
//           //code={this.prop.code} 
// />

//           <OtpInput
//             otpChange={(text) => this.props.otpChanged(text)}
//             value={this.props.auth.otp} />

//           <Text style={styles.textStyle}>{Didnot_received_otp_click_to_resend}</Text>
//           <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
//             {this.renderVerifyButton()}
//           </View>
//         </View>
//       )
//     } else {
//       return (
//         <View style={{ flex: 1 }}>

//           <LoginInput
//             phoneChange={(text) => this.props.phoneChanged(text)}
//             value={this.props.auth.phone}
//             code={this.props.auth.code} />

//           <Text style={styles.textStyle}>{Please_Select_Country_Code_Before_Mobile_Number}</Text>
//           <OtpInput />
//           <Text style={styles.textStyle}>{Didnot_received_otp_click_to_resend}</Text>
//           <Text style={styles.errorStyle}>{this.state.error}</Text>
//           <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
//             {this.renderButton()}
//           </View>
//         </View>
//       )
//     }
//   }
//   render() {
//     if (this.props.auth.phone.length > 10) {
//       this.state.error = ''
//     }
//     return (
//       //onValueChange={(value)=>this.onValueChange(value)}
//       //item={this.state.item} 
//       // ORIGINAL VIEW
//       <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
//         <View style={{ flex: 1, backgroundColor: red_lighter }}>

//           <View style={{ height: '30%', justifyContent: 'center', marginTop: 40 }}>
//             <Image style={styles.topImage}
//               source={require('./assets/Login/shield.png')} />
//             <Text style={styles.topText}>{App_Name}</Text>
//           </View>

//           <View style={styles.container}>
//             {/* {this.renderVerify()} */}


//             <Text style={styles.textVersion}>{GuardOmni_Version}</Text>
//           </View>
//         </View>

//         {/* <View style = { {flex: 1, backgroundColor: red_lighter }}>
//              <Image style={styles.topImage} 
//               source = {require('./assets/Login/shield.png')} />
//           { this.renderVerify() } 
//           </View>       */}
//       </TouchableWithoutFeedback>


//     );
//   }
// }
// const styles = {
//   container: {
//     backgroundColor: white_Original,
//     width: '95.55%',
//     height: 150,
//     display: 'flex',
//     flex: 1,
//     marginTop: 63,
//     justifyContent: 'space-between',
//     alignSelf: 'flex-end',
//     flexDirection: 'column',
//     marginLeft: 10,
//     marginRight: 10,
//     elevation: 4,
//     borderRadius: 4
//   },
//   textStyle: {
//     fontSize: 10,
//     alignSelf: 'center',
//     paddingTop: 20,
//     color: 'rgba(0, 0, 0, 0.4)'
//   },
//   topImage: {
//     width: '30%',
//     height: 120,
//     //marginTop: 35,
//     alignSelf: 'center',
//     resizeMode: 'stretch',
//     alignItems: 'center',

//   },
//   topText: {
//     fontFamily: 'OpenSans-Bold.ttf',
//     color: black,
//     fontSize: 20,
//     marginTop: 5,
//     alignItems: 'center',
//     alignSelf: 'center'
//   },
//   errorStyle: {
//     fontSize: 14,
//     alignSelf: 'center',
//     paddingTop: 20,
//     color: 'red',
//   },
//   textVersion: {
//     fontFamily: 'OpenSans-Regular.ttf',
//     color: grey,
//     justifyContent: 'flex-end',
//     alignSelf: 'center',
//     fontSize: 14,
//     marginBottom: 15
//   },
//   loginButtonStyle: {
//     width: 60,
//     height: 60,
//     borderRadius: 60 / 2,
//     backgroundColor: white_Original,
//     alignSelf: 'center',

//   },
// }

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth
//   }
// }
//export default connect(mapStateToProps, { phoneChanged, otpChanged, loginUser, logoutPressed, VerifyOtp, closeBlackPopup })(Login);

