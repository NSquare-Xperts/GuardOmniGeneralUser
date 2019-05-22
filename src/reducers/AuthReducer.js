import { PHONE_CHANGED, OTP_CHANGED, LOGIN_PRESSED, RESEND_PRESSED, TIMER_COUNT, LOGOUT_PRESSED, LOGIN_USER, 
    LOGIN_FAIL, CODE_CHANGED, LOGIN_SUCCESS, CLOSE_BLACK_POPUP } from '../actions/types';

const INITIAL_STATE = { code: '+91', phone: '', otp: '',actualOtp: '', toggle: false , timeCount: 50, toggleResend: false ,error: '', loading: false, data: {}, displayModal: false }

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case PHONE_CHANGED: 
            return { ...state, phone: action.payload }
        case OTP_CHANGED: 
            return { ...state, otp: action.payload }
        case LOGIN_PRESSED: 
            return { ...state, toggle: true, loading: false, actualOtp: ''+action.payload }
        case LOGOUT_PRESSED: 
            return { ...state, toggle: false, loading: false, phone: '', otp: '' }
        case RESEND_PRESSED:
            return {...state, toggleResend: true}
        case TIMER_COUNT:
            return {...state, timeCount: action.payload}
        case LOGIN_USER: 
            return {...state, loading: true, error: ''}
        case LOGIN_FAIL: 
            return {...state, loading: false, error: action.payload, otp: '', displayModal: true}
        case CODE_CHANGED: 
            return {...state, code: action.payload}
        case LOGIN_SUCCESS:
            return {...state, data: action.payload, loading: false}
        case CLOSE_BLACK_POPUP:
            return {...state, displayModal: false}
        default:
            return state
    }
}