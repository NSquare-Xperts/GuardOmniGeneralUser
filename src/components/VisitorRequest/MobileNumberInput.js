import React from 'react'
import { View, TextInput, Image, TouchableWithoutFeedback, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Mobile_Number, grey_lighter } from '../common'

const MobileNumberInput = (props) => {
    return (
        <View style={styles.displayStyle}>
            <View style={styles.containerStyle}>

                <TouchableWithoutFeedback onPress={() => { Actions.countrycodeVR() }}>
                    <View style={styles.pickerStyle}>
                        <Text style={{ marginLeft: 50 }}>{props.code}</Text>
                        <Image
                            source={require('../assets/Login/dropdown_arrow.png')}
                            style={{ height: 24, width: 24 }} />
                    </View>
                </TouchableWithoutFeedback>

                <TextInput
                    style={{ height: 50, width: '70%', marginLeft: 23, justifyContent: 'center' }}
                    placeholder={Mobile_Number}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value}
                    maxLength={12}
                    keyboardType='numeric' />
            </View>
        </View>
    );
};
const styles = {
    containerStyle: {
        height: 50,
        width: '91%',
        flexDirection: 'row',
        borderRadius: 30,
        shadowRadius: 4,
        marginLeft: 20,
        //marginTop: 20,
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

    },
}
export default MobileNumberInput;