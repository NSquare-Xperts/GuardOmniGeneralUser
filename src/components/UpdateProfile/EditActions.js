import { COMPLAINT_TITLE, COMPLAINT_COMMENTS, EDIT_PROFILE, ADD_COMPLAINT_FAILED, VERIFY_COMPLAINT,PROFILE_UPDATE_FAILED, EDIT_USERNAME, EDIT_EMAIL, PROFILE_UPDATE } from '../../actions/types'
import { Actions } from 'react-native-router-flux'
import { callFormDataPostApi, callFormDataUpdateProfilePostApi } from '../Util/APIManager'
import { DeviceEventEmitter } from 'react-native'
import SimpleToast from 'react-native-simple-toast';

export const editProfile_ = (username, email, flatId,userId, uri1, type1, name1, mobileNo,isFile) => {
    return (dispatch) => {
        dispatch({ type: EDIT_PROFILE });

        callFormDataUpdateProfilePostApi('http://guardomni.dutique.com:8000/api/profileUpdate?', {
            "userId": userId,
            "userName": username,
            "userEmailId": email,
            "userMobile": mobileNo,
            "uri1": uri1,
            "userProfileImage": '',
            "type1": type1,
            "name1": name1,
            "isFile" : isFile
        })
        .then((response) => {
                // Continue your code here...
                res = JSON.parse(response)
                console.log("add profileUpdate response : ", res)
              
                 if (res.status === 200) {
                    console.log("add profileUpdate response : ", res.status)
                    SimpleToast.show(res.message)
                    Actions.popTo('PropertyDetails')
                    //updateProfileSuccess(dispatch, data)
                   // DeviceEventEmitter.emit('eventUpdated', { eventUpdated: true });
                 }else{
                    //console.log("failed")
                    updateProfileFailed(dispatch, response.message)
                    SimpleToast.show(res.message)
                 }
                
            }).catch((error)=>{
                SimpleToast.show(error)
            })
    }
}

export const updateProfileSuccess = (dispatch, data) => {
    dispatch(
        {
            type: PROFILE_UPDATE,
            payload: data
        })
}

export const updateProfileFailed = (dispatch, errMsg) => {
    dispatch(
        {
            type: PROFILE_UPDATE_FAILED,
            payload: errMsg
        }
    )
}


export const nameChanged = (text) => {
    return {
        type: EDIT_USERNAME,
        payload: text
    }
}
export const emailChanged = (text) => {
    return {
        type: EDIT_EMAIL,
        payload: text
    }
}
