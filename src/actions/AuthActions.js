import {
    PHONE_CHANGED, OTP_CHANGED, LOGIN_PRESSED, RESEND_PRESSED, TIMER_COUNT, LOGOUT_PRESSED, LOGIN_USER,
    LOGIN_FAIL, CODE_CHANGED, LOGIN_SUCCESS, HEADER_CHANGE, CLOSE_BLACK_POPUP, CLEAR_STATE
} from './types';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export const loginUser = (phone) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        axios.post('http://192.168.0.32:8000/api/validateUser',
            {
                "phone": phone
            })
            .then((response) => {
                var data = response.data
                loginPressed(dispatch, data.otpData.otp)
                console.log("data : ", data)
            })
            .catch(error => {
                loginPressed(dispatch, data.otpData.otp)
                console.log("error: ", error)
                if (error.response.status == 401) {
                    loginFailed(dispatch, 'User not registered, Contact Administration!')
                }
                if (error.response.status == 400) {
                    loginFailed(dispatch, 'You are Blocked, Contact Admnistration!')
                }
            }
            )
    }
}

export const logoutUser = (accessToken) => {
    console.log(accessToken)
    return (dispatch) => {

        var config = {
            headers: {
                "Authorization": accessToken
            }
        }

        axios.delete('http://ec2-34-219-55-114.us-west-2.compute.amazonaws.com:3000/api/logout/', config)
            .then((response) => {

                var data = response.data
                try {
                    AsyncStorage.removeItem('LoginData');
                    Actions.login();
                }
                catch (exception) {
                    console.log(exception)
                }
                logoutPressed(dispatch)
            })
            .catch(error => {
                console.log(error);
                console.log('Request failed')
            }
            )
    }
}

export const VerifyOtp = ({ phone, otp }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        axios.post('http://ec2-34-219-55-114.us-west-2.compute.amazonaws.com:3000/api/verifyOtp/', {
            "phone": phone,
            "otp": otp            
        })
            .then((response) => {

                var data = response.data

                var login = JSON.stringify(data)
                AsyncStorage.multiSet([
                    ["LoginData", login]
                ])
                Actions.tabs()
                loginSuccess(dispatch, data)
            })
            .catch(error => {

                loginFailed(dispatch, 'Wrong OTP.')
                console.log(error)
            }
            )
    }
}

export const closeBlackPopup = () => {
    return {
        type: CLOSE_BLACK_POPUP
    }
}

export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    }
}

export const Code = (text) => {
    return {
        type: CODE_CHANGED,
        payload: text
    }
}

export const HeaderChange = ({ date }) => {
    return {
        type: HEADER_CHANGE,
        payload: date
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
    }
    )
}


export const loginPressed = (dispatch, data) => {
    dispatch(
        {
            type: LOGIN_PRESSED,
            payload: data
        })

}

export const logoutPressed = (dispatch) => {
    dispatch({
        type: LOGOUT_PRESSED
    })
}

export const resendPressed = () => {
    return {
        type: RESEND_PRESSED
    }
}

export const timerCount = (count) => {
    return {
        type: TIMER_COUNT,
        payload: count
    }
}
export const setStateToDefault = () => {
    return {
        type: CLEAR_STATE
    }
}

export const loginSuccess = (dispatch, data) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data
    })
}