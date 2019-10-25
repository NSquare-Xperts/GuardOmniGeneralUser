import React from 'react'
import { View, TextInput, TouchableWithoutFeedback, Text } from 'react-native'
//import { Actions } from 'react-native-router-flux'
import { grey_lighter,Number_of_people, Vehicle_No } from '../common'

const VehicleNoInput = (props) => {
    return (
        <View style={styles.displayStyle}>
            <View style={styles.containerStyle}>
                <TextInput
                    style={{ height: 50, width: '100%', marginLeft: 30, justifyContent: 'center' }}
                    placeholder={Vehicle_No}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.vehicleChange}
                    value={props.value}
                    maxLength={12} />
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        height: 50,
        width: '63%',
        flexDirection: 'row',
        borderRadius: 30,
        shadowRadius: 4,
        marginLeft: 35,
        //marginRight: 20,
        borderColor: grey_lighter,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerStyle: {
        height: 40,
        width: '32%',
        marginLeft: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    displayStyle: {
        flexDirection: 'row',
        //marginTop: 10
    }
}
export default VehicleNoInput;