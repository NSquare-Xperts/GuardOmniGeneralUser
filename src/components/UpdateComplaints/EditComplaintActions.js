import { COMPLAINT_TITLE, EDIT_COMPLAINT_COMMENTS, EDIT_PROFILE, EDIT_COMPLAINT, EDIT_COMPLAINT_FAILED } from '../../actions/types'
import { Actions } from 'react-native-router-flux'
import { callFormDataUpdateComplaintPostApi } from '../Util/APIManager'
import { DeviceEventEmitter } from 'react-native'
import SimpleToast from 'react-native-simple-toast'

export const editComplaint_ = (title, comments, uri1, type1, name1, uri2, type2, name2, uri3, type3, name3, complaintId,isFile1,isFile2,isFile3,userId) => {

    return (dispatch) => {
        dispatch({ type: EDIT_PROFILE });

        console.log("uri1 + ",uri1)
        console.log("uri2 + ",uri2)
        console.log("uri3 + ",uri3)
        console.log("type2 + ",type2)
        
        callFormDataUpdateComplaintPostApi('http://guardomni.dutique.com:8000/api/complaintUpdate', {

            "userId": userId,
            "complaintTitle": title,
            "complaintDescription": comments,
            "uri1": uri1,
            "type1": type1,
            "name1": name1,

            "uri2": uri2,
            "type2": type2,
            "name2": name2,

            "uri3": uri3,
            "type3": type3,
            "name3": name3,
           
            "isFile1":isFile1,
            "isFile2":isFile2,
            "isFile3":isFile3,
           
            "complaintId": complaintId
           
        })
        .then((response) => {
                // Continue your code here...
                data = JSON.parse(response)
                console.log("edit profileUpdate response : ", data)
                
                if (data.status == 200) {
                    Actions.popTo('ComplaintDetail');
                    DeviceEventEmitter.emit('eventEditedComplaint',{isEditedSuccessFully: true});
                    editComplaintSuccess(dispatch, data)
                }else if(data.status == 401) {
                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');
                    //SimpleToast.show(response.message)
                    Actions.reset('Login')
                    editComplaintFailed(dispatch, data.message)
                  } else{
                    SimpleToast.show(data.message)
                    editComplaintFailed(dispatch, data.message)
                }                
                
            }).catch((error)=>{
                SimpleToast.show(error)
            })
    }
}

export const editComplaintSuccess = (dispatch, data) => {
    dispatch(
        {
            type: EDIT_COMPLAINT,
            payload: data
        })
}

export const editComplaintFailed = (dispatch, errMsg) => {
    dispatch(
        {
            type: EDIT_COMPLAINT_FAILED,
            payload: errMsg
        }
    )
}
export const titleChanged = (text) => {
    return {
        type: COMPLAINT_TITLE,
        payload: text
    }
}
export const editCommentsChanged = (text) => {
    return {
        type: EDIT_COMPLAINT_COMMENTS,
        payload: text
    }
}
