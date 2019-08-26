import { USERNAME_CHANGED, CODE_CHANGED ,PHONE_CHANGED, NUMBER_OF_PEOPLE_CHANGED, VEHICLE_NO_CHANGED, VERIFY_REQUEST, 
    ADD_REQUEST,VERIFY_REQUEST_FAILED} from '../../actions/types'
import { Actions } from 'react-native-router-flux'
import { callPostApi } from '../Util/APIManager'
import {AsyncStorage} from 'react-native'
import SimpleToast from 'react-native-simple-toast'
import { DeviceEventEmitter} from 'react-native'

//add request
export const VisitorRequest = (name,phone,selectedDate,noOfPeople,vehicleType,vehicleNumber,userId,flatId) => {
    
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
    
        console.log("vehicle type: ",vehicleType)
        callPostApi('http://192.168.0.32:8000/api/visitorRequest', {
            "userId" : userId,
            "visitorName": name,
            "visitorMobileNumber": phone,
            "requestDateTime" : selectedDate,
            "noOfVisitors" : noOfPeople,
            "flatId" : flatId,
            "vehicleType" : vehicleType,
            "vehicleNumber": vehicleNumber
        })     
        .then((response) => {
            // Continue your code here...
            res = JSON.parse(response)
            console.log(" VISITOR response : ", res)
            if (res.status == '200') {
                Actions.popTo('visitors')
                              
                DeviceEventEmitter.emit('eventVisitorRequestAdded',{isAddeddSuccessFully: true});
                verifyRequestSuccess(dispatch, data)
                
        }else if (data.status == 401) {

            AsyncStorage.removeItem('propertyDetails');
            AsyncStorage.removeItem('userDetail');
            AsyncStorage.removeItem('LoginData');
            //SimpleToast.show(response.message)
            Actions.reset('Login')
          }else{
            SimpleToast.show(res.message)
            verifyRequestFailed(dispatch, response.message)
        }
        });
    }
}

export const verifyRequestSuccess = (dispatch, data) => {
    dispatch(
        {
            type: VERIFY_REQUEST,
            payload: data
        })
}

export const verifyRequestFailed = (dispatch,errMsg) => {
        dispatch(
            {
                type: VERIFY_REQUEST_FAILED,
                payload: errMsg
            }
        )
}

export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    }
}

export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    }
}

export const codeChanged = (text) => {
    return{
        type: CODE_CHANGED,
        payload: text
    }
}

export const noOfPeopleChanged = (text) => {
    return {
        type: NUMBER_OF_PEOPLE_CHANGED,
        payload: text
    }
}

export const noOfVehicleChanged = (text) => {
        return {
            type: VEHICLE_NO_CHANGED,
            payload: text
        }
}

export const dateChanged = (text) => {
        return{
            type: dateChanged,
            payload: text
        }
}