import React from 'react'
import { View, TextInput, Image, TouchableWithoutFeedback, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Mobile_Number, grey_lighter, Name } from '../common'
import { Input } from '../common';

const UsernameInput = (props) => {
    return (
        <View style={styles.displayStyle}>
            <View style={styles.containerStyle}>
                <TextInput
                    style={{ height: 50, width: '70%', marginLeft: 15, justifyContent: 'center' }}
                    placeholder={Name}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.nameChange}
                    value={props.value}
                    maxLength={30}
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
       // marginTop: 10
    }
}
export default UsernameInput;