import React from 'react'
import { View, Image, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Mobile_Number, Name, Expected_arrival_date_and_time, Number_of_people, Vehicle_No, Add_Request, Input, Vehicle_Type, this_field_is_optional } from './common'
import { black, white_Original, grey, red_lighter, grey_lighter } from './common/color'
import Button from './common/Button';
import { TextInput } from 'react-native-gesture-handler';

const AddVisiorRequestInput = (props) => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.card}>
             <Input
                    placeholder={Name}
                    maxLength={30}
                    style={styles.textInputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />

                <View style={styles.containerStyleMobile}>
                    <View style={styles.displayStyle}>

                        <View style={styles.pickerStyle}>
                            <Text>{+91}</Text>
                            <Image
                                source={require('./assets/Login/dropdown_arrow.png')}
                                style={{ height: 24, width: 24 }} />
                        </View>

                        <TextInput
                            style={{ fontFamily: 'OpenSans', fontSize: 12, color: black }}
                            placeholder={Mobile_Number}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={props.phoneChange}
                            value={props.value}
                            keyboardType='numeric' />

                    </View>
                </View>

                <Input
                    placeholder={Expected_arrival_date_and_time}
                    maxLength={30}
                    style={styles.textInputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />

                <Input
                    placeholder={Number_of_people}
                    maxLength={6}
                    style={styles.textInputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />

                <View style={{ flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between' }}>

                    <TextInput
                        placeholder={Vehicle_No}
                        maxLength={15}
                        style={styles.textInputPickerStyle}
                        onChangeText={props.phoneChange}
                        value={props.value} />

                    <TextInput
                        placeholder={Vehicle_Type}
                        maxLength={15}
                        style={styles.textInputPickerStyle}
                        onChangeText={props.phoneChange}
                        value={props.value} />
                </View>

                <Text style={styles.textStyle}>{this_field_is_optional}</Text>
               
                <View style={{ width: '90%', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 15 }}>
                    <Button onPress={() => { Actions.homepage() }}>{Add_Request}</Button>
                </View>

                {/* <TouchableWithoutFeedback onPress={()=> { Actions.countrycode() }}>
                            <View style={styles.pickerStyle}>                       
                                <Text style={{marginLeft: 50}}>{props.code}</Text>
                                <Image 
                                    source= {require('./LoginAssets/mobile_icn.png')}
                                    style={{ height: 24, width: 24 }}/>

                            </View>
                    </TouchableWithoutFeedback>        
                     <TextInput
                        placeholder = {Mobile_Number}
                        style={{height: 50, width: '91%',color: { black}}}
                        underlineColorAndroid ='rgba(0,0,0,0)'  
                        onChangeText = {props.phoneChange}
                        value = {props.value} 
                        keyboardType = 'numeric'/> */}
            </View>
        </View >

    );
};
const styles = {
    // card: {
    //     backgroundColor: white_Original,
    //     width: '98%',
    //     height: '100%',
    //     display: 'flex',
    //     flex: 1,
    //     padding: 10,
    //     alignSelf: 'center',
    //     flexDirection: 'column',
    //     elevation: 4,
    //     borderRadius: 3
    // },
    // containerStyle: {
    //     display: 'flex',
    //     flex: 1,
    //     padding: 12,
    //     backgroundColor: red_lighter
    // },
    card: {
        backgroundColor: white_Original,
        width: '98%',
        height: '100%',
        display: 'flex',
        flex: 1,
        padding: 10,
        marginTop: 10,
        //justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        /// marginLeft: 10,
        // marginRight: 10,
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
        width: 50,
        marginLeft: 20,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    displayStyle: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10

    },
    textInputStyle: {
        height: 55,
        width: '90%',
        color: black,
        backgroundColor: grey_lighter,
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
        width: '44.55%',
        color: black,
        backgroundColor: white_Original,
        borderRadius: 27,
        //alignSelf: 'center',
        shadowRadius: 4,
        borderColor: grey_lighter,
        borderWidth: 2,
        marginTop: 15,
        marginRight: 10,
        paddingLeft: 25,
        fontFamily: 'OpenSans',
        fontSize: 12,
        color: black
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
export default AddVisiorRequestInput;