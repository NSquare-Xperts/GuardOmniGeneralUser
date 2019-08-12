import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, DatePickerIOS } from 'react-native'
import UsernameInput from './UsernameInput'
import MobileNumberInput from './MobileNumberInput'
import { connect } from 'react-redux'
import Button from '../common/Button'
import { usernameChanged, phoneChanged, codeChanged, noOfPeopleChanged, VisitorRequest, noOfVehicleChanged, vehicleNoChanged, dateChanged } from './AddVisitorRequestActions'
import { Add_Request, white_Original, red_lighter, This_field_is_optional, grey_light, grey_lighter } from '../common'
import NoOfPeopleInput from './NoOfPeopleInput'
import VehicleNoInput from './VehicleNoInput'
import DateTimePicker from "react-native-modal-datetime-picker"
import DateTimeInput from './DateTimeInput'
import { Picker } from 'native-base'
import { Actions } from 'react-native-router-flux'
import resetForm from 'react-redux'
import TimePicker from '../TimePicker';

class AddVisiorRequestNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // choosenDate:new Date(),
            errorName: '',
            errorPassword: '',
            errornoOfPeople: '',
            errornDate: '',
            isDateTimePickerVisible: false,

            selectedDate: '',
            userId: '',
            flatId: '',
            pickerSelectedValue: '',
            minimumDate: new Date(),
            is24Hours: false,

        }
    }

    componentWillMount() {
        this.props.auth.phone = ''
        //this.props.auth.code = '+91'
    }
    componentDidMount() {
        this._getUserStorageValue()
    }

    componentWillUnmount() {

        this.props.auth.name = ''
        this.props.auth.phone = ''
        this.props.auth.code = '+91'
        this.props.auth.noOfPeople = ''
        this.state.pickerSelectedValue = ''
        this.props.auth.vehicleNumber = ''

        Actions.popTo('visitors');
        return true;

    }

    async _getUserStorageValue() {

        var value = await AsyncStorage.getItem('propertyDetails')
        var data = JSON.parse(value);

        var valueUser = await AsyncStorage.getItem('userDetail')
        var dataUser = JSON.parse(valueUser);

        if (dataUser != '' || dataUser != null) {
            this.setState({
                userId: dataUser.user_id,
                flatId: data.flat_id,
            })

        }

    }
    _getSelectedPickerValue = () => {
        console.log("selected date type : ", this.state.pickerSelectedValue)
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

    _handleDatePicked = date => {

        var today = new Date(date.toString());
        dateParsed = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

        time = today.getHours() + ':' + today.getMinutes()
        dateTime = dateParsed + ' ' + time


        console.log("print date : ", time)
        console.log("print date : ", dateTime)

        this.setState({ selectedDate: dateTime });
        this._hideDateTimePicker();

    };

    renderButton() {
        return (
            <Button style={{ width: '100%' }}
                onPress={() => {
                    //name = this.props.auth,name
                    if (this.props.auth.name.length < 1) {
                        this.setState({
                            errorName: '* Please Enter Name.'
                        })
                    } else if (this.props.auth.phone.length < 1) {
                        this.setState({
                            errorPhone: '* Please Enter Valid Mobile Number.'
                        })

                    } else if (this.props.auth.noOfPeople.length <= 0) {
                        this.setState({
                            errornoOfPeople: '* Please Enter Number Of People.'
                        })
                    } else if (this.state.selectedDate == '') {
                        this.setState({
                            errornoOfPeople: '* Please Select Date & Time.'
                        })
                    } else {
                        name = this.props.auth.name;
                        phone = this.props.auth.code + '-' + this.props.auth.phone
                        selectedDate = this.state.selectedDate
                        noOfPeople = this.props.auth.noOfPeople
                        vehicleType = this.state.pickerSelectedValue
                        vehicleNumber = this.props.auth.vehicleNumber
                        userId = this.state.userId
                        flatId = this.state.flatId

                        this.props.VisitorRequest(name, phone, selectedDate, noOfPeople, vehicleType, vehicleNumber, userId, flatId)
                    }
                }}
            >{Add_Request}
            </Button>
        );
    }

    renderVerifyFileds() {
        return (
            <View style={{ flex: 1 }}>

                <UsernameInput
                    nameChange={(text) => this.props.usernameChanged(text)}
                    value={this.props.auth.name} />
                <Text style={styles.errorStyle}>{this.state.errorName}</Text>

                <MobileNumberInput
                    phoneChange={(text) => this.props.phoneChanged(text)}
                    value={this.props.auth.phone}
                    code={this.props.auth.code} />

                <Text style={styles.errorStyle}>{this.state.errorPhone}</Text>

                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <DateTimeInput
                        nameChange={(text) => this.props.dateChanged(text)}
                        value={this.state.selectedDate}
                    />
                </TouchableOpacity>

                <Text style={styles.errorStyle}>{this.state.errorDate}</Text>

                <NoOfPeopleInput
                    onChangeText={(text) => this.props.noOfPeopleChanged(text)}
                    value={this.props.auth.noOfPeople} />

                <Text style={styles.errorStyle}>{this.state.errornoOfPeople}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={styles.veicleNoStyle}>
                        <VehicleNoInput
                            vehicleChange={(text) => this.props.noOfVehicleChanged(text)}
                            value={this.props.auth.vehicleNumber} />
                    </View>
                    {/* add vehicle type */}
                    
                    <View style={styles.containerPickerStyle}>
                        <Picker
                            style={{ marginLeft: 10 }}
                            selectedValue={this.state.pickerSelectedValue}
                            onValueChange={(itemValue, itemIndex) => this.setState({ pickerSelectedValue: itemValue })}
                            mode='dropdown'>
                            <Picker.Item label="2-w" value="2-w" />
                            <Picker.Item label="3-w" value="3-w" />
                            <Picker.Item label="4-w" value="4-w" />
                        </Picker>
                    </View>

                </View>

                <Text style={styles.textstyle}>{This_field_is_optional}</Text>

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    mode={'datetime'}
                    is24Hour={this.state.is24Hours}
                    minimumDate={this.state.minimumDate}
                    //onDateChange={this._handleDatePicked}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker} />

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
                    {this.renderButton()}
                </View>

            </View>
        );
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.card}>

                    {this.renderVerifyFileds()}

                </View>
            </View>
        );
    }
}
//export default AddVisiorRequestNew;

const styles = {
    errorStyle: {
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 20,
        paddingTop: 5,
        color: 'red'
    },
    textstyle: {
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 20,
        paddingTop: 8,
        color: grey_light
    },
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


    // containerPickerStyle: {
    //     height: 50,
    //     width: '63%',
    //     flexDirection: 'row',
    //     borderRadius: 30,
    //     shadowRadius: 4,
    //     marginLeft: 35,
    //     //marginRight: 20,
    //     borderColor: grey_lighter,
    //     borderWidth: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    veicleNoStyle: {
        width: '90%',
        // marginLeft: 10
    },
    containerPickerStyle: {
        height: 50,
        marginRight: 20,
        borderRadius: 30,
        shadowRadius: 4,
        borderColor: grey_lighter,
        borderWidth: 1,
        width: '20%'
    },
    displayPickerStyle: {
        flexDirection: 'row',
        //marginTop: 10
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.addVisitor
    }
}
export default connect(mapStateToProps, { usernameChanged, vehicleNoChanged, phoneChanged, codeChanged, noOfPeopleChanged, dateChanged, VisitorRequest, noOfVehicleChanged })(AddVisiorRequestNew)