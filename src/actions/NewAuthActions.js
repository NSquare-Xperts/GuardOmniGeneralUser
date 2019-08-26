import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { PHONE_CHANGED, LOGIN_PRESSED, LOGIN_SUCCESS, LOGIN_FAIL, OTP_CHANGED, LOGIN_USER, CLOSE_BLACK_POPUP, CODE_CHANGED, LOGIN_FAIL_MOBILE_NUMBER } from './types'
import { AsyncStorage } from 'react-native'

export const loginUser = (phone) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        console.log("phone :: ", phone)
        
         //Live : http://guardomni.dutiqueIIIIIIIII.com:8000
        //aws : http://18.temp188.253.46:8000temp
        //local : http://192.168.0.32:8000
        axios.post('http://192.168.0.32:8000/api/validateUser',
            { "mobileNumber": phone,
            "loginType": '4' 
        })
            .then((response) => {
                var data = response.data
                //Actions.homepage()
                console.log("response :: ", data)
                if (data.status == 400) {
                    console.log("inside failed : 400")
                    loginFailedMobileNumber(dispatch, data.message)
                } else if (data.status == 401) {

                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');
                    //SimpleToast.show(response.message)
                    Actions.reset('Login')
                  }else {
                    console.log("inside success : 200")
                loginPressed(dispatch, data)
                
                }
            })
            .catch(error => {
                console.log("error : ", error.response.message)
                loginFailedMobileNumber(dispatch, 'Please Check Your Internet Connection.')
                // check error status to handle blocked user
                // if (error.response.status == 400) {
                //     loginFailedMobileNumber(dispatch, error.response.message)
                // }
            });
    }
}

export const VerifyOtp = ({ phone, otp, token, platform }) => {
    return (dispatch) => {
       dispatch({ type: LOGIN_USER });
        axios.post('http://192.168.0.32:8000/api/validateOTP', {
            "mobileNumber": phone,
            "otp": otp,
            "cloudId":token,
            "deviceType":(platform=="android"?0:1),
            "loginType": '4'
        })
            .then((response) => {
                var data = response.data
                var login = JSON.stringify(data)               
                               
                if (data.status == 400) {
                    loginFailed(dispatch, data.message)
                }else if (data.status == 401) {
                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');
                    //SimpleToast.show(response.message)
                    Actions.reset('Login')
                  } else {
                   //data array
                   //1 .username 2. property details
                     AsyncStorage.multiSet([
                         ["LoginData", login]
                     ])

                    // AsyncStorage.multiSet([['userDetail', data.data[0].user_details], ['propertyDetails', login.data.data[0].property_details]])                    
                    AsyncStorage.setItem('userDetail',JSON.stringify(data.data[0].user_details))
                    AsyncStorage.setItem('propertyDetails',JSON.stringify(data.data[0].property_details))
                    
                    //Actions.homepage();
                    Actions.reset('drawer')
                    loginSuccess(dispatch, data)
                }
            }).catch(error => {
                loginFailed(dispatch, error.message)
                console.log("response verify otp : ", error.message)
            })
    }
}

export const loginPressed = (dispatch, data) => {
    dispatch({
        type: LOGIN_PRESSED,
        payload: data
    }
    )
}

export const loginSuccess = (dispatch, data) => {
    dispatch(
        {
            type: LOGIN_SUCCESS,
            payload: data
        })
}

export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    }

}

export const otpChanged = (text) => {
    return {
        type: OTP_CHANGED,
        payload: text
    }

}

export const loginFailed = (dispatch, errMsg) => {
    dispatch({
        type: LOGIN_FAIL,
        payload: errMsg
    })
}


export const loginFailedMobileNumber = (dispatch, errMsg) => {
    dispatch({
        type: LOGIN_FAIL_MOBILE_NUMBER,
        payload: errMsg
    })
}


export const closeBlackPopup = () => {
    return {
        type: CLOSE_BLACK_POPUP
    }

}

export const Code = (text) => {
    return {
        type: CODE_CHANGED,
        payload: text
    }
}