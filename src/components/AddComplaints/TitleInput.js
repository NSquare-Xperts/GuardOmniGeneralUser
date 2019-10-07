import React from 'react'
import { View, TextInput } from 'react-native'
import { COMPLAINT_TITLE } from '../common'
import { black, white_Original, red_lighter, grey_lighter } from '../common/color'

const TitleInput = (props) => {
    return (
        <View style={styles.displayStyle}>
        <View style={styles.containerStyle}>
              
                <TextInput
                    style={{ height: 50, width: '100%', marginLeft: 15, justifyContent: 'center' }}
                    placeholder={COMPLAINT_TITLE}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.titleChange}
                    value={props.value}
                    maxLength={100}
                />

                
            </View>
        </View>

    );
};
const styles = {
    card: {
        backgroundColor: white_Original,
        width: '98%',
        height: '100%',
        display: 'flex',
        flex: 1,
        padding: 10,
        marginTop: 10,
        alignSelf: 'center',
        flexDirection: 'column',
        elevation: 4,
        borderRadius: 3
    },
    containerStyle: {
        height: 50,
        width: '91%',
        flexDirection: 'row',
        borderRadius: 30,
        shadowRadius: 4,
        marginLeft: 20,
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
    },
    inputStyle: {
        height: 170,
        width: '90%',
        color: black,
        backgroundColor: white_Original,
        borderRadius: 27,
        alignSelf: 'center',
        shadowRadius: 4,
        borderColor: grey_lighter,
        borderWidth: 2,
        marginTop: 15,
        paddingLeft: 25,
        fontFamily: 'OpenSans',
        fontSize: 12,
        color: black
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 20,
        borderWidth: 2,
        marginTop: 15,
        marginLeft: 15,
        borderColor: grey_lighter,

    },
    textStyle: {
        fontSize: 10,
        color: black,
        marginTop: 4,
        justifyContent: 'center'


    }
}
export default TitleInput;