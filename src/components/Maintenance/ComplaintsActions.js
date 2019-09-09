import { COMPLAINT_TITLE, COMPLAINT_COMMENTS, ADD_COMPLAINT, event_NEW_COMPLAINT_ADDED, ADD_COMPLAINT_FAILED, VERIFY_COMPLAINT } from '../../actions/types'
import { Actions } from 'react-native-router-flux'
import { callFormDataPostApi } from '../Util/APIManager';
import { DeviceEventEmitter } from 'react-native'

export const addComplaint_ = (title, comments, uri1, type1, name1, uri2, type2, name2, uri3, type3, name3, flatId, userId) => {

    //export const addComplaint_ = (title,comments,uri1,type1,name1) => {
    return (dispatch) => {
        dispatch({ type: ADD_COMPLAINT });

        // console.log("video uri  "+uri1)
        // console.log("video name "+name1)
        // console.log("video type "+type1)

        callFormDataPostApi('http://guardomni.dutique.com:8000/api/complaintRequest', {
            "userId": userId,
            "complaintTitle": title,
            "uri1": uri1,
            "type1": type1,
            "name1": name1,
            "uri2": uri2,
            "type2": type2,
            "name2": name2,
            "uri3": uri3,
            "type3": type3,
            "name3": name3,
            "complaintDescription": comments,
            "flatId": flatId
        })
            .then((response) => {
                // Continue your code here...
                res = JSON.parse(response)
                console.log("add complaint response : ", res)
                if (res.status == '200') {
                    Actions.popTo('Complaints')

                    DeviceEventEmitter.emit('eventNewComplaintAdded', { isAddeddSuccessFully: true });
                    addComplaintSuccess(dispatch, data)
                } else {
                    addComplaintFailed(dispatch, response.message)
                }
            });
        //  });

    }
}

export const addComplaintSuccess = (dispatch, data) => {
    dispatch(
        {
            type: VERIFY_COMPLAINT,
            payload: data
        })
}

export const addComplaintFailed = (dispatch, errMsg) => {
    dispatch(
        {
            type: ADD_COMPLAINT_FAILED,
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
export const commentsChanged = (text) => {
    return {
        type: COMPLAINT_COMMENTS,
        payload: text
    }
}
