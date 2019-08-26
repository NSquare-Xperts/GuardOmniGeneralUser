import React from 'react'
import { Text, Image, View, Alert, AsyncStorage, TouchableOpacity,DeviceEventEmitter } from 'react-native';
import { red, black } from './color'
import { Actions } from 'react-native-router-flux'
import { callPostApi } from '../Util/APIManager'
import SimpleToast from 'react-native-simple-toast'
import { Dropdown } from 'react-native-material-dropdown';



const OptionMenuDelete = (props) => {
    
    let data = [{
        value: 'Delete',
    }
    ];


    onChangeText = (value) => {
        //  var valueFilter;
       
            if (value == 'Delete') {

                Alert.alert(
                    'Want to Delete this complaint ?',
                    'Complaint will be deleted permantly',
                    [
                        {
                            text: 'No', onPress: () =>
                                console.log('Cancel Pressed')

                        },
                        {
                            text: 'Yes', onPress: () => {

                                AsyncStorage.multiGet(["LoginData"]).then((data) => {
                                    LoginData = data[0][1];
                                    var res = JSON.parse(LoginData)

                                    console.log('userId :: ', res.data[0].user_details.user_id)

                                    AsyncStorage.getItem('complaintID').then((data) => {
                                        console.log("Option menu", data)

                                        callPostApi('http://192.168.0.32:8000/api/complaintDelete', {
                                            "userId": res.data[0].user_details.user_id,
                                            "complaintId": data,
                                        })
                                            .then((response) => {
                                                // Continue your code here...
                                                res = JSON.parse(response)
                                                console.log("response : ", res)
                                                if (res.status == 200) {

                                                    AsyncStorage.removeItem('complaintID')
                                                    AsyncStorage.removeItem('userID')
                                                    //Actions.pop('Complaints');
                                                    DeviceEventEmitter.emit('eventDeletedComplaint',{isDeletedSuccessFully: true});
                                                    Actions.popTo('Complaints');

                                                    SimpleToast.show(res.message)
                                                } else {
                                                    SimpleToast.show(res.message)
                                                }
                                            });

                                    });
                                });
                            }
                        }
                    ],
                    { cancelable: true }
                )


            }
        
    }
    return (
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => this.dropDownCompaint.focus()}>
                <Image
                    source={require('../assets/Complaints/more_options.png')}
                    style={styles.iconNotification} />
            </TouchableOpacity>
            <Dropdown
                containerStyle={{ width: 100, justifyContent: 'space-between', marginTop: 25 }}
                ref={ref => this.dropDownCompaint = ref}
                //value={this.state.name}
                data={data}
                baseColor='transparent'
                selectedItemColor='black'
                itemColor='black'
                textColor='white'
                onChangeText={val => this.onChangeText(val)}
            //onChangeText={val => this.onChangeText()}
            />
        </View>
    );

};
const styles = {
    TextViewStyle:
    {
        borderRadius: 10,
        width: 20,
        height: 20,
        marginLeft: 12,
        marginBottom: 18,
        justifyContent: 'center',
        backgroundColor: red
    },
    TextStyle:
    {
        textAlign: 'center',
        alignSelf: 'center',
        color: black,
        padding: 2,
        marginLeft: 10,
        fontSize: 14,
    },
    rowStyle: {
        flexDirection: 'row',
        padding: 5
    },
    icon: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        //marginTop: 15,
        //marginRight: 10
    },
    iconNotification: {
        height: 23,
        width: 23,
        marginTop: 25,
        // paddingTop:15, 
        //   justifyContent: 'spa',
        alignSelf: 'center',
        // marginTop: 5,
        marginRight: 8
        // position:'absolute'
    }
};
export default OptionMenuDelete;