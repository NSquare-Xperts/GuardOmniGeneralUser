import React from 'react'
import { View, TextInput, TouchableWithoutFeedback, Text } from 'react-native'
import { grey_lighter,Expected_arrival_date_and_time, grey_light } from '../common'


const DateTimeInput = (props) => {
   console.log("DATE TIME : "+JSON.stringify(props))
    return (
        <View style={styles.displayStyle}>
            <View style={styles.containerStyle}>
                <TextInput
                    //style={{ height: 15, width: '70%', marginLeft: 15, justifyContent: 'center' }}
                    placeholder={ Expected_arrival_date_and_time }
                   // underlineColorAndroid='rgba(0,0,0,0)'
                    editable={false}
                    onChangeText={props.dateChanged}
                    //value={"hiiiii"}
                    value={props.value}
                    maxLength={30} />
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
    }
}
export default DateTimeInput;



