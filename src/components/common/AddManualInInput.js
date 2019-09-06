import React from 'react'
import { View, Text, Image, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Mobile_Number, Name, Expected_arrival_date_and_time, Number_of_people, Vehicle_No, Add_Request, PersonToVisit, Mobile_NO, Arrival, NoOfPeople } from './constants'
import { black, white_Original, grey, red_lighter, grey_lighter } from './color'
import Button from './Button'
import { TextInput } from 'react-native-gesture-handler';
import { Input } from './Input';
import LoginInput from '../LoginInput';

const AddManualInInput = (props) => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.card}>

                <Image source={require('../assets/fullscreen.jpg')}
                    style={{ height: 155, width: '100%', alignSelf: 'center' }} />

                <Input
                    placeholder={Name}
                    maxLength={30}
                    style={styles.textInputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />

                <Input
                    placeholder={PersonToVisit}
                    maxLength={30}
                    style={styles.textInputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />

                {/* add mobileno drop down  */}
                {/* <Input
                            placeholder = {Mobile_NO}
                            maxLength={12}
                            style={styles.textInputStyle}
                            underlineColorAndroid ='rgba(0,0,0,0)'  
                            onChangeText = {props.phoneChange}
                            value = {props.value} /> */}

                <View style={styles.displayStyle}>

                    <View style={styles.containerStyle}>
                        <View style={styles.pickerStyle}>
                            <Text style={{ marginLeft: 50 }}>{props.code}</Text>
                            <Image
                                source={require('../assets/fullscreen.jpg')}
                                style={{ height: 24, width: 24 }} />
                        </View>

                        <TextInput
                            style={{ height: 50, width: '70%', marginLeft: 23, justifyContent: 'center' }}
                            placeholder={Mobile_Number}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={props.phoneChange}
                            value={props.value}
                            keyboardType='numeric' />
                    </View>
                </View>

                <TextInput
                    style={{ height: 50, width: '70%', marginLeft: 23, justifyContent: 'center' }}
                    placeholder={Mobile_Number}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value}
                    keyboardType='numeric' />
            </View>

            <Input
                placeholder={Arrival}
                maxLength={30}
                style={styles.textInputStyle}
                underlineColorAndroid='rgba(0,0,0,0)'
                onChangeText={props.phoneChange}
                value={props.value} />

            <Input
                placeholder={NoOfPeople}
                maxLength={6}
                style={styles.textInputStyle}
                underlineColorAndroid='rgba(0,0,0,0)'
                onChangeText={props.phoneChange}
                value={props.value} />

            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 12,
                justifyContent: 'space-between'
            }}>
                <TextInput
                    placeholder={Vehicle_No}
                    maxLength={15}
                    style={styles.textInputPickerStyle}
                    onChangeText={props.phoneChange}
                    value={props.value} />

                <TextInput
                    placeholder={Vehicle_No}
                    maxLength={15}
                    style={styles.textInputPickerStyle}
                    onChangeText={props.phoneChange}
                    value={props.value} />

            </View>

            <View style={{ width: '90%', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 15 }}>
                <Button onPress={() => { Actions.homepage() }}>{Add_Request}</Button>
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
        //padding: 10,
        alignSelf: 'center',
        flexDirection: 'column',
        elevation: 4,
        borderRadius: 3
    },
    containerStyle: {
        display: 'flex',
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        backgroundColor: red_lighter
    },
    pickerStyle: {
        height: 40,
        width: '45%',
        marginLeft: 20,
        marginRight: 5,
        marginTop: 15,
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    displayStyle: {
        flexDirection: 'row',
        marginTop: 10

    },
    textInputStyle: {
        height: 55,
        width: '90%',
        color: black,
        backgroundColor: white_Original,
        borderRadius: 27,
        alignSelf: 'center',
        shadowRadius: 4,
        borderColor: grey,
        borderWidth: 2,
        marginTop: 15,
        paddingLeft: 25,
        fontFamily: 'OpenSans',
        fontSize: 12,
        color: black
    },
    textInputPickerStyle: {
        height: 55,
        width: '45%',
        color: black,
        backgroundColor: white_Original,
        borderRadius: 27,
        //alignSelf: 'center',
        shadowRadius: 4,
        borderColor: grey_lighter,
        borderWidth: 2,
        marginTop: 15,
        marginRight: 5,
        paddingLeft: 25,
        fontFamily: 'OpenSans',
        fontSize: 12,
        color: black
    },
    pickerStyle: {
        height: 40,
        width: '32%',
        // borderRadius: 20,
        // shadowRadius: 4,
        // borderColor: '#EEEEEE',
        // borderWidth: 1,
        marginLeft: 10,
        //justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
}
export default AddManualInInput;