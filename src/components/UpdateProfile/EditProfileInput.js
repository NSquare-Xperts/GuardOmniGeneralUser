import React from 'react'
import { View, Image, Platform, Text, Alert ,TextInput } from 'react-native'
import { Mobile_Number, Name, Input, Owner, Address, Save } from '../common'
import { white_Original, red_lighter, grey_lighter, black, grey } from './common/color'
import Button from '../common/Button'

const EditProfileInput = (props) => {
    return (
        <View style={styles.containerStyle}>
            
            <View style={{ height: '20%', justifyContent: 'center' }}>
                <Image source={require('./assets/fullscreen.jpg')}
                    style={{ height: 95, width: 95, alignSelf: 'center', borderRadius: Platform.OS === 'ios' ? 95 / 2 : 60 }} />
            </View>

            <View style={styles.card}>
                <Input
                    placeholder={Name}
                    maxLength={30}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />
                <Input
                    placeholder={Owner}
                    maxLength={12}
                    style={styles.textInputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />

                <Input
                    placeholder={Address}
                    maxLength={30}
                    style={styles.textInputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />

                {/* <View style={{marginTop: 15,flexDirection: 'row', height: 50,justifyContent: 'center',alignItems: 'center', width: '91%'}}>                        */}
                {/* <View style={styles.pickerStyle}>   
                            <Text style={{marginLeft: 50}}>{+91}</Text>
                            <Image 
                                    source= {require('./assets/fullscreen.jpg')}
                                    style={{ height: 24, width: 24 }}/>
                    </View> */}

                {/* <Input
                            placeholder = {Mobile_Number}
                            underlineColorAndroid ='rgba(0,0,0,0)'  
                            onChangeText = {props.phoneChange}
                            value = {props.value} 
                            keyboardType = 'numeric'/>
                 */}


                <View style={styles.containerStyleMobile}>
                    <View style={styles.displayStyle}>
                        <View style={styles.pickerStyle}>
                            <Text style={{ color: grey }}>{+91}</Text>
                            <Image
                                source={require('./assets/Login/dropdown_arrow.png')}
                                style={{ height: 24, width: 24 }} />
                        </View>

                        <TextInput
                            style={{ fontFamily: 'OpenSans',marginBottom:7, fontSize: 12, color: grey }}
                            placeholder={Mobile_Number}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={props.phoneChange}
                            value={props.value}
                            keyboardType='numeric' />

                    </View>
                </View>
                {/* call Yes/No alert */}
                <View style={{ width: '90%', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 15 }}>
                    <Button onPress={() => {
                        Alert.alert(
                           'Update Profile Details?',
                            'Updated profile information will be saved',
                            [
                                {
                                    text: 'No', onPress: () =>
                                        console.log('Ask me later pressed')
                                },
                                {
                                    text: 'Yes', onPress: () => {
                                      //Actions.modal()
                                      console.log('Ask me later pressed')
                                    }
                                }
                            ],
                            { cancelable: true }
                        )

                    }}>
                        {Save}</Button>
                </View>






                {/* <TextInput
                                        placeholder = {Number_of_people}
                                        maxLength={6}
                                        style={styles.textInputStyle}
                                        underlineColorAndroid ='rgba(0,0,0,0)'  
                                        onChangeText = {props.phoneChange}
                                        value = {props.value} />

            <View style={styles.pickerStyle}>                       
                            
                            <TextInput 
                            placeholder = {Vehicle_No}
                            maxLength={15}
                            style={styles.textInputStyle}
                            onChangeText = {props.phoneChange}
                            value = {props.value}/>
                         
                      <TextInput
                                 placeholder = {Vehicle_No}
                                 maxLength={15}
                                 style={styles.textInputStyle}
                                 underlineColorAndroid ='rgba(0,0,0,0)'  
                                 onChangeText = {props.phoneChange}
                                 value = {props.value} >
                        <Image 
                                source= {require('./assets/fullscreen.jpg')}
                                style={{ height: 24, width: 24 ,alignSelf: 'flex-end',alignContent: 'flex-end',justifyContent: 'flex-end'}}/>
                     </TextInput> 

                                        
             </View>

        
            <View style={ {width: '90%', position: 'absolute',bottom: 0,alignSelf: 'center',marginBottom: 15}}>
                        <Button onPress={()=>{Actions.homepage()}}>{ Add_Request}</Button>
                        </View> */}

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
        </View>

    );
};
// var {width, height}  = Dimensions.get('window');
// const marg = (height/2)-((100)+(height*0.156))
const styles = {
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
        width: '32%',
        // borderRadius: 20,
        // shadowRadius: 4,
        // borderColor: '#EEEEEE',
        // borderWidth: 1,
        marginLeft: 10,
        padding: 10,
        marginBottom: 7,
        //justifyContent: 'center',
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
export default EditProfileInput;