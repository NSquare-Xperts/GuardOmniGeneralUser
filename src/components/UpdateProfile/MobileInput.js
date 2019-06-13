import React from 'react'
//import { Name, Input, Mobile_NO } from '../common'
import { white_Original, red_lighter, grey_lighter, black ,grey} from '../common/color'
import { TextInput,Image,View, Text } from 'react-native';
import { Mobile_Number, Mobile_NO } from '../common';

const MobileInput = (props) => {
    return (
        <View style={styles.containerStyleMobile}>
            <View style={styles.displayStyle}>
                <View 
                editable={false}
                style={styles.pickerStyle}>
                    <Text style={{ color: grey }}>{props.countryCode}</Text>
                    <Image
                        source={require('../assets/Login/dropdown_arrow.png')}
                        style={{ height: 24, width: 24 }} />
                </View>

                <TextInput
                    editable={false}
                    style={{ fontFamily: 'OpenSans', marginBottom: 7, fontSize: 12, color: grey, marginLeft:8}}
                    placeholder={ Mobile_NO }
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.mobileNo}
                    keyboardType='numeric' />

            </View>
        </View>
        // <Input
        //     placeholder={Mobile_NO}
        //     maxLength={30}
        //     underlineColorAndroid='rgba(0,0,0,0)'
        //     onChangeText={props.mobileChanged}
        //     value={props.value} />
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
        fontFamily: 'OpenSans',
        fontSize: 12,
        color: black,
        marginLeft: 20,
        marginTop: 10

    }
}
export default MobileInput;