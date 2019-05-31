import React from 'react'
import { Name, Input } from '../common'
import { white_Original, red_lighter, grey_lighter, black } from '../common/color'

const UsernameInput = (props) => {
    return (
        <Input
            placeholder={Name}
            maxLength={30}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={props.usernameChange}
            value={props.value} />
    )
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
        display: 'flex',
        flex: 1,
        padding: 12,
        backgroundColor: red_lighter
    },
    pickerStyle: {
        height: 40,
        width: '32%',
        marginLeft: 10,
        padding: 10,
        marginBottom: 7,
        alignItems: 'center',
        flexDirection: 'row'
    },
    displayStyle: {
        flexDirection: 'row',
        marginTop: 10

    },
    containerStyleMobile: {
        height: 50,
        width: '91%',
        flexDirection: 'row',
        borderRadius: 30,
        shadowRadius: 4,
        marginLeft: 20,
        marginTop: 15,
        borderColor: grey_lighter,
        borderWidth: 2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: black,
        marginLeft: 20,
        marginTop: 10

    }
}
export default UsernameInput;