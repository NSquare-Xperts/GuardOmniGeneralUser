import React from 'react'
import { View, Image, TextInput, Text, ImageBackground } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Input, Add_Complaint, COMPLAINT_TITLE, Enter_your_comments } from './common'
import { black, white_Original, red_lighter, grey_lighter } from './common/color'
import Button from './common/Button';

const AddComplaintInput = (props) => {
    return (
        <View style={styles.containerStyle}>

            <View style={styles.card}>
                <Input
                    placeholder={COMPLAINT_TITLE}
                    maxLength={30}
                    //style={styles.textInputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />
                <TextInput
                    placeholder={Enter_your_comments}
                    multiline={true}
                    style={styles.inputStyle}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={props.phoneChange}
                    value={props.value} />


                <ImageBackground
                    style={styles.imageStyle}
                    value={props.value}>
                    <View style={{ alignSelf: 'center', flex: 1,margin:5, padding:10,marginTop: 14}}>
                        <Image
                            source={require('./assets/Complaints/add_image_plus.png')}
                            style={{ height: 30, width: 30, }} />
                        <Text style={styles.textStyle}>Image</Text>
                    </View>
                </ImageBackground>

                <View style={{ width: '90%', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 15 }}>
                    <Button onPress={() => { Actions.homepage() }}>{Add_Complaint}</Button>
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
        //justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    displayStyle: {
        flexDirection: 'row',
        marginTop: 10
    },
    inputStyle: {
        // color: '#000',
        // paddingRight: 5,
        // paddingLeft: 5,
        // fontSize: 18,
        // lineHeight: 23,
        // flex: 2
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
        marginTop:4,
        justifyContent: 'center'


    }
}
export default AddComplaintInput;