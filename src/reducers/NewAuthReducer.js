

import { LOGIN_SUCCESS, LOGIN_FAIL_MOBILE_NUMBER, CODE_CHANGED, PHONE_CHANGED, LOGIN_FAIL, CLOSE_BLACK_POPUP, LOGIN_PRESSED, OTP_CHANGED } from '../actions/types'
import { State } from 'react-native-gesture-handler';

const INITIAL_STATE = {
    code: '+91', phone: '', otp: '',
    actualOtp: '', toggle: false, toggleResend: false, error: '', isOTPVisible: false, data: {}, loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PHONE_CHANGED:
            return { ...state, phone: action.payload }
        case LOGIN_PRESSED:
            return { ...state, toggle: true, loading: false, actualOtp: '' + action.payload ,isOTPVisible: true}
        case OTP_CHANGED:
            return { ...state, otp: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, data: action.payload, loading: false, isOTPVisible: true}
        case LOGIN_FAIL_MOBILE_NUMBER:
            return { ...state, loading: false, error: action.payload, displayModal: true, isOTPVisible: false }
        case LOGIN_FAIL:
            return { ...state, loading: false, error: action.payload, otp: '', displayModal: true }
        case CLOSE_BLACK_POPUP:
            return { ...state, displayModal: false }
        case CODE_CHANGED:
            return { ...state, code: action.payload }

        default:
            return state
    }
}