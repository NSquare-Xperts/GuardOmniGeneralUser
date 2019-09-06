import { USERNAME_CHANGED, PHONE_CHANGED, CODE_CHANGED, NUMBER_OF_PEOPLE_CHANGED, VEHICLE_NO_CHANGED, 
    EDIT_VISITOR_REQUEST_FAILED, EDIT_VISITOR_REQUEST } from '../../actions/types'
import { Actions } from 'react-native-router-flux'
import {  callPostApi } from '../Util/APIManager'
import { DeviceEventEmitter } from 'react-native'
//import SimpleToast from 'react-native-simple-toast'

export const editVisitorRequest_ = (userId, visitorName, visitorMobileNumber, requestDateTime, noOfVisitors, vehicleType, vehicleNumber, visitorRequestId,flatId) => {

    return (dispatch) => {
        dispatch({ type: EDIT_VISITOR_REQUEST });

        callPostApi('http://18.188.253.46:8000/api/visitorRequestEdit', {

            "userId": userId,
            "visitorName": visitorName,
            "visitorMobileNumber": visitorMobileNumber,
            "requestDateTime": requestDateTime,
            "noOfVisitors": noOfVisitors,
            "flatId": flatId,
            "vehicleType": vehicleType,
            "vehicleNumber": vehicleNumber,
            "visitorRequestId": visitorRequestId
        })
        .then((response) => {
                // Continue your code here...
                res = JSON.parse(response)
                console.log("edit visitor request : ", res)
               
                if (res.status == 200) {
                    
                    //Toast.show(res.message)
                   // SimpleToast.show(res.message,100)
                    Actions.popTo('visitors')
                    DeviceEventEmitter.emit('eventVisitorRequestEdited',{isEditedSuccessFully: true});
                    editVisitorRequestSuccess(dispatch, data)
                  

                }else if (data.status == 401) {

                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');
                    //SimpleToast.show(response.message)
                    Actions.reset('Login')
                  }
                else{
                    SimpleToast.show(res.message)
                    editVisitorRequestFailed(dispatch, data)
                }
                //     Actions.popTo('Complaints')
                //     DeviceEventEmitter.emit('eventNewComplaintAdded', { isAddeddSuccessFully: true });
                //     addComplaintSuccess(dispatch, data)
                // } else {
                //     addComplaintFailed(dispatch, response.message)
                // }
               
            }).catch((error)=>{
                SimpleToast.show(error)
            })
    }
}

export const editVisitorRequestSuccess = (dispatch, data) => {
    dispatch(
        {
            type: EDIT_VISITOR_REQUEST,
            payload: data
        })
}

export const editVisitorRequestFailed = (dispatch, errMsg) => {
    dispatch(
        {
            type: EDIT_VISITOR_REQUEST_FAILED,
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
