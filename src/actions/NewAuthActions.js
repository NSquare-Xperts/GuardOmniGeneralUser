import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { PHONE_CHANGED, LOGIN_PRESSED, LOGIN_SUCCESS, LOGIN_FAIL, OTP_CHANGED, LOGIN_USER, CLOSE_BLACK_POPUP, CODE_CHANGED, LOGIN_FAIL_MOBILE_NUMBER } from './types'
import { AsyncStorage } from 'react-native'
import { CONST_NO_CONNECTION } from '../components/common'

export const loginUser = (phone) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });        
        
         //Live : http://guardomni.dutiqueIIIIIIIII.com:8000
        //aws : http://18.temp188.253.46:8000temp                
        axios.post('http://guardomni.dutique.com:8000/api/validateUser',
            { "mobileNumber": phone,
            "loginType": '4' 
        })
        .then((response) => {
                var data = response.data                               
                if (data.status == 400) {                    
                    loginFailedMobileNumber(dispatch, data.message)
                } else if (data.status == 401) {
                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');                    
                    Actions.reset('Login')
                  }else {                    
                loginPressed(dispatch, data)
                }
            })
            .catch(error => {                
                loginFailedMobileNumber(dispatch, CONST_NO_CONNECTION)                
            });
    }
}

export const VerifyOtp = ({ phone, otp, token, platform }) => {
    return (dispatch) => {
       dispatch({ type: LOGIN_USER });
        axios.post('http://guardomni.dutique.com:8000/api/validateOTP', {
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
                    Actions.reset('Login')
                  } else {
                     AsyncStorage.multiSet([
                         ["LoginData", login]
                     ])
                    AsyncStorage.setItem('userDetail',JSON.stringify(data.data[0].user_details))
                    AsyncStorage.setItem('propertyDetails',JSON.stringify(data.data[0].property_details))
                    Actions.reset('drawer')
                    loginSuccess(dispatch, data)
                }
            }).catch(error => {
                loginFailed(dispatch, error.message)                
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