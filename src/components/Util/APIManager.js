import { Alert } from 'react-native'
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
        console.log("Photo object 1 ", photo)
    }


    if (params.uri2 != '') {
        const photo2 = {
            uri: params.uri2,
            type: params.type2,
            name: params.name2
        };
        formdata.append("complaintImage2", photo2)
        console.log("Photo object 2 ", photo2)
    }

    if (params.uri3 != '') {
        const photo3 = {
            uri: params.uri3,
            type: params.type3,
            name: params.name3,
        };
        formdata.append("complaintImage3", photo3)
        console.log("Photo object 3 ", photo3)

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
            console.log("RESULT : ", result);
            return result
        })
        .catch((error) => {
            console.log("error :: ", error)
            Alert.alert('Alert Title failure' + JSON.stringify(error))

        });
}

export function callFormDataUpdateProfilePostApi(urlStr, params) {

    let formdata = new FormData();
    if (params.uri1 != '') {
        console.log("edit inside else : ", params)
        const photo = {
            uri: params.uri1,
            type: params.type1,
            name: params.name1
        };
        formdata.append("userProfileImage", photo)
   
    }else if(params.url != ''){
        console.log("edit inside else : ", params)
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
            console.log("RESULT : ", result);
            return result
        })
        .catch((error) => {
            console.log("error :: ", error)
            Alert.alert('Alert Title failure' + JSON.stringify(error))

        });
}

export function callPostApi(urlStr, params) {

    console.log("function **: ", urlStr, params)
    return fetch(urlStr, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'Content-Type':'application/x-www-form-urlencoded'

        },
        body: JSON.stringify(params)
    })
        .then((response) => response.json())
        .then((responseData) => {
            result = JSON.stringify(responseData)
            return result
        })
        .catch((error) => {
            //handle all errors
            // console.error(error);
            
            var errorString;

            if (error instanceof TimeoutError) {
                errorString = 'Request timed out. Please try again';
            } else if (error instanceof NoConnectionError) {
                errorString = 'No connection. Please try again';
            }  else if (error instanceof AuthFailureError) {
                errorString = 'Authentication error. Please try again';
            } else if (error instanceof ServerError) {
                errorString = 'Server error. Please try again';
            } else if (error instanceof NetworkError) {
                errorString = 'Network error. Please try again';
            } else if (error instanceof ParseError) {
                errorString = 'Invalid data. Please try again';
            }

            Alert.alert(errorString)
            console.log(errorString+" "+JSON.stringify(error))
            // ((ParentActivity) context).dismissProcessingDialog();
        });
}

//CALL COMPLAINT EDIT 
export function callFormDataUpdateComplaintPostApi(urlStr, params) {

    console.log("params edit:: ",params)
    let formdata = new FormData();
    if (params.uri1 != '') {
        const photo = {
            uri: params.uri1,
            type: params.type1,
            name: params.name1
        };
        formdata.append("complaintImage1", photo)
        console.log("Photo object 1 ", photo)
    }

    if (params.uri2 != '') {
        const photo2 = {
            uri: params.uri2,
            type: params.type2,
            name: params.name2
        };
        formdata.append("complaintImage2", photo2)
        console.log("Photo object 2 ", photo2)
    }

    if (params.uri3 != '') {
        const photo3 = {
            uri: params.uri3,
            type: params.type3,
            name: params.name3,
        };
        formdata.append("complaintImage3", photo3)
        console.log("Photo object 3 ", photo3)

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
            console.log("RESULT : ", result);
            return result
        })
        .catch((error) => {
            console.log("error :: ", error)
            Alert.alert('Alert Title failure' + JSON.stringify(error))

        });
}

//VISITOR REQUEST 
// export function callFormDataVisitorRequestPostApi(urlStr, params) {

//     console.log("---edit visitor request---",params)
//     let formdata = new FormData();

//     formdata.append("userId", params.userId)
//     formdata.append("visitorName", params.visitorName)
//     formdata.append("visitorMobileNumber", params.visitorMobileNumber)
//     formdata.append("requestDateTime",params.requestDateTime)
//     formdata.append("noOfVisitors",params.noOfVisitors)
//     formdata.append("flatId",params.flatId)
//     formdata.append("vehicleType", params.vehicleType)
//     formdata.append("vehicleNumber", params.vehicleNumber)
//     formdata.append("visitorRequestId", params.visitorRequestId)

//     return fetch(urlStr, {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'multipart/form-data'
//         },
//         body: formdata
//     })
//         .then((response) => response.json())
//         .then((responseData) => {
//             result = JSON.stringify(responseData)
//             console.log("RESULT : ", result);
//             return result
//         })
//         .catch((error) => {
//             console.log("error :: ", error)
//             Alert.alert('Alert Title failure' + JSON.stringify(error))

//         });
// }
