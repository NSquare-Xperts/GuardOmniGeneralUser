import { Alert } from 'react-native'
import SimpleToast from 'react-native-simple-toast'
import { CONST_NO_CONNECTION, CONST_SERVER_ERROR } from '../common';
// STATUS : 400
//{uri: photo.uri, name: 'image.jpg', type: 'multipart/form-data'}
export function callFormDataPostApi(urlStr, params) {

    let formdata = new FormData();
    if (params.uri1 != '') {
        const photo = {
            uri: params.uri1,
            type: params.type1,
            name: params.name1
        };
        formdata.append("complaintImage1", photo)     
    }


    if (params.uri2 != '') {
        const photo2 = {
            uri: params.uri2,
            type: params.type2,
            name: params.name2
        };
        formdata.append("complaintImage2", photo2)        
    }

    if (params.uri3 != '') {
        const photo3 = {
            uri: params.uri3,
            type: params.type3,
            name: params.name3,
        };
        formdata.append("complaintImage3", photo3)
    }

    formdata.append("userId", params.userId)
    formdata.append("complaintTitle", params.complaintTitle)
    formdata.append("complaintDescription", params.complaintDescription)



    formdata.append("flatId", params.flatId)

    return fetch(urlStr, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formdata
    })
        .then((response) => response.json())
        .then((responseData) => {
            result = JSON.stringify(responseData)            
            return result
        })
        .catch((error) => {            
            SimpleToast.show(error)
            //Alert.alert('Error' + JSON.stringify(error))
        });
}

export function callFormDataUpdateProfilePostApi(urlStr, params) {

    let formdata = new FormData();
    if (params.uri1 != '') {
        
        const photo = {
            uri: params.uri1,
            type: params.type1,
            name: params.name1
        };
        formdata.append("userProfileImage", photo)
   
    }else if(params.url != ''){        
        formdata.append("userProfileImage", params.url)
    }

    formdata.append("userId", params.userId)
    formdata.append("userName", params.userName)
    formdata.append("userEmailId", params.userEmailId)
    formdata.append("userMobile", params.userMobile)
    formdata.append("isFile", params.isFile)

    return fetch(urlStr, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formdata
    })
        .then((response) => response.json())
        .then((responseData) => {
            result = JSON.stringify(responseData)            
            return result
        })
        .catch((error) => {            
            SimpleToast.show(error)
            //Alert.alert('Error' + JSON.stringify(error))
        });
}

export function callPostApi(urlStr, params) {

    return fetch(urlStr, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    
        },
        body: JSON.stringify(params)
    })
        .then((response) => response.json())
        .then((responseData) => {
            result = JSON.stringify(responseData)
            return result
        })
        .catch((error) => {
            if (!error.response) {
                console.log("*****validate error "+JSON.stringify(error))
                SimpleToast.show(CONST_NO_CONNECTION)
                // Alert.alert(CONST_NO_CONNECTION)
            }else{
                SimpleToast.show(CONST_SERVER_ERROR)
                //Alert.alert(CONST_SERVER_ERROR)
            }
            // ((ParentActivity) context).dismissProcessingDialog();
        });
}

//CALL COMPLAINT EDIT 
export function callFormDataUpdateComplaintPostApi(urlStr, params) {

    
    let formdata = new FormData();
    if (params.uri1 != '') {
        const photo = {
            uri: params.uri1,
            type: params.type1,
            name: params.name1
        };
        formdata.append("complaintImage1", photo)
    
    }

    if (params.uri2 != '') {
        const photo2 = {
            uri: params.uri2,
            type: params.type2,
            name: params.name2
        };
        formdata.append("complaintImage2", photo2)
        
    }

    if (params.uri3 != '') {
        const photo3 = {
            uri: params.uri3,
            type: params.type3,
            name: params.name3,
        };
        formdata.append("complaintImage3", photo3)
        

    }

    formdata.append("userId", params.userId)
    formdata.append("complaintTitle", params.complaintTitle)
    formdata.append("complaintDescription", params.complaintDescription)
    formdata.append("isFile1",params.isFile1)
    formdata.append("isFile2",params.isFile2)
    formdata.append("isFile3",params.isFile3)
    formdata.append("complaintId", params.complaintId)

    return fetch(urlStr, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formdata
    })
        .then((response) => response.json())
        .then((responseData) => {
            result = JSON.stringify(responseData)
            
            return result
        })
        .catch((error) => {
            
            SimpleToast.show(error)
            //Alert.alert('Error' + JSON.stringify(error))

        });
}


