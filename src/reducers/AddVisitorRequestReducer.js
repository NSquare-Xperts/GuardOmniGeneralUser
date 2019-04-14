//import { State } from "react-native-gesture-handler";
import { ADD_REQUEST,USERNAME_CHANGED, CODE_CHANGED, PHONE_CHANGED, NUMBER_OF_PEOPLE_CHANGED, VEHICLE_NO_CHANGED, date_CHANGED,VERIFY_REQUEST,VERIFY_REQUEST_FAILED } from "../actions/types";


const INITIAL_STATE = { code: '+91', name : '',phone:'', noOfPeople: '',vehicleNo: '',date: '' ,vehicleNumber:''}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case USERNAME_CHANGED:
            return { ...state, name: action.payload }
        case PHONE_CHANGED:
            return {...state,phone: action.payload}
        case CODE_CHANGED:
            return {...state, code:action.payload }    
        case ADD_REQUEST: 
            return {...state, loading: true, error: ''}
        case NUMBER_OF_PEOPLE_CHANGED:
            return {...state, noOfPeople: action.payload}
        case VEHICLE_NO_CHANGED:
            return {...state,  vehicleNumber : action.payload }    
        case date_CHANGED: 
            return {...state, date: action.payload}
        case VERIFY_REQUEST_FAILED: 
            return{...state,loading: false,error: action.payload,displayModal: true}
        case VERIFY_REQUEST: 
            return {...state, data:action.payload, loading: false
            }
        default:
            return state
    }
}

