import React from 'react'
import { View, TextInput, TouchableWithoutFeedback, Text } from 'react-native'
//import { Actions } from 'react-native-router-flux'
import { grey_lighter,Number_of_people } from '../common'

const NoOfPeopleInput = (props) => {
    return (
        <View style={styles.displayStyle}>
            <View style={styles.containerStyle}>
                
                <TextInput
                    style={{ height: 50, width: '70%', marginLeft: 15, justifyContent: 'center' }}
                    placeholder={Number_of_people}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.onChangeText}
                    value={props.value}
                    keyboardType = 'numeric'
                    maxLength={3}
                />
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
       // marginTop: 10
    }
}
export default NoOfPeopleInput;