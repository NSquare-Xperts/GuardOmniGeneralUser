import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Keyboard, TouchableWithoutFeedback, ActivityIndicator, Image } from 'react-native'
import LoginInput from './LoginInput'
import Button from './common/Button'
import { phoneChanged, otpChanged, loginUser, logoutPressed, VerifyOtp, closeBlackPopup } from '../actions'
import { Login_label, Please_Select_Country_Code_Before_Mobile_Number, Didnot_received_otp_click_to_resend, App_Name, VerifyOTP_label } from './common/constants'
import OtpInput from './otpInput'
import { connect } from 'react-redux'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import timer from 'react-native-timer'
import { red_lighter, black, grey, white_Original, red } from './common/color'
import { GuardOmni_Version } from './common/constants'
import { BlackPopup } from './common/BlackPopup'

class NewLogin extends Component {
  state = {
    reRender: false,
    error: '',
  }

  onDecline() {
    this.props.closeBlackPopup()
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
        <Button onPress={() => {
           phone = this.props.auth.code + this.props.auth.phone
           otp = this.props.auth.otp
           this.props.VerifyOtp({ phone, otp })
           timer.setTimeout(
            this, 'hideMsg', () => {
              this.props.closeBlackPopup()
            }, 4000
          )
        }
        }>{ VerifyOTP_label }</Button>
      )
    }
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
        <Button onPress={() => {
          if (this.props.auth.phone.length <= 5) {
            this.setState({
              error: 'Please enter a valid phone number.'
            })
          } else {
            timer.setTimeout(
              this, 'hideMsg', () => {
                this.props.closeBlackPopup()
              }, 4000
            )
            this.props.loginUser(this.props.auth.code + this.props.auth.phone)
          }
        }}>Login</Button>
      )
    }
  }
  renderLoginApi() {
    axios.post('192.168.0.118:8080/api/validateUser', {
      "mobileNumber": "9975892114"
    })
      .then(response => {
        console.log("hi ", response.data)
      }).catch(error => {
        console.log("catch", error)
      })
  }
  renderVerify() {
    //toggle : true/false 
    
    if (this.props.auth.toggle) {
      //if mobile number isnot empty
      return (
        <View style={{ flex: 1 }}>
          <LoginInput
            phoneChange={(text) => this.props.phoneChanged(text)}
            value={this.props.auth.phone}
            code={this.props.auth.code} />

          <OtpInput
            otpChange={(text) => this.props.otpChanged(text)}
            value={this.props.auth.otp} />

          <Text style={styles.textStyle}>{Didnot_received_otp_click_to_resend}</Text>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
            {this.renderVerifyButton()}
            {/* <Text> SHOW VERIFY BUTTON</Text> */}
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
          <Text style={styles.textStyle}>{Please_Select_Country_Code_Before_Mobile_Number}</Text>
          {/* <OtpInput /> */}
          {/* <Text style={styles.textStyle}>{Didnot_received_otp_click_to_resend}</Text> */}
          <Text style={styles.errorStyle}>{this.state.error}</Text>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
            {this.renderButton()}
          </View>
        </View>
      )
    }
  }

  render() {
    if (this.props.auth.phone.length > 10) {
      this.state.error = ''
    }
    return (
      // ORIGINAL VIEW
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={{ flex: 1, backgroundColor: red_lighter }}>
          <View style={{ height: '30%', justifyContent: 'center', marginTop: 40 }}>
            <Image style={styles.topImage}
              source={require('./assets/Login/shield.png')} />
            <Text style={styles.topText}>{App_Name}</Text>
          </View>
          <View style={styles.container}>
            {this.renderVerify()}
            <Text style={styles.textVersion}>{GuardOmni_Version}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
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
    fontSize: 12,
    alignSelf: 'flex-start',
    paddingTop: 10,
    marginLeft: 25,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  topImage: {
    width: '30%',
    height: 120,
    //marginTop: 35,
    alignSelf: 'center',
    resizeMode: 'stretch',
    alignItems: 'center',

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
    paddingTop: 4,
    marginLeft: 20,
    color: red
  },
  textVersion: {
    fontFamily: 'OpenSans',
    color: grey,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    fontSize: 14,
    marginBottom: 15
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

export default connect(mapStateToProps, { phoneChanged, otpChanged, loginUser, logoutPressed, VerifyOtp, closeBlackPopup })(NewLogin);

