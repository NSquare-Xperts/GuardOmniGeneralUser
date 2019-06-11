import React from 'react'
import { TextInput } from 'react-native'
import { black, white_Original, grey_lighter } from '../common/color'
import { Enter_your_comments } from '../common';

const CommentsInput = (props) => {
    return (
        <TextInput
            placeholder={Enter_your_comments}
            multiline={true}
            style={styles.inputStyle}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={props.commentsChange}
            numberOfLines={10}
            value={props.value} />

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
    },
    inputStyle: {
        textAlignVertical: 'top',
        height: 170,
        width: '90%',
        color: black,
        backgroundColor: white_Original,
        borderRadius: 27,
        alignSelf: 'flex-start',
        shadowRadius: 4,
        borderColor: grey_lighter,
        borderWidth: 2,
        marginTop: 10,
        marginLeft:15,
        paddingLeft: 25,
        fontFamily: 'OpenSans.ttf',
        fontSize: 14,
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
export default CommentsInput;