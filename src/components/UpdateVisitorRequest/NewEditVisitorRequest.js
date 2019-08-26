import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TouchableOpacity, DeviceEventEmitter, AsyncStorage, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import Button from '../common/Button'
import { Picker } from 'native-base'
import { usernameChanged, phoneChanged, codeChanged, noOfPeopleChanged, VisitorRequest, noOfVehicleChanged, vehicleNoChanged, dateChanged } from './EditVisitorRequestActions'
import { editVisitorRequest_ } from './EditVisitorRequestActions'
import { white_Original, red_lighter, grey_lighter, grey_light, Save, This_field_is_optional, Vehicle_Type, grey } from '../common';
import { Actions } from 'react-native-router-flux'
import { callPostApi } from '../Util/APIManager'
import UsernameInput from './UsernameInput'
import MobileNumberInput from './MobileNumberInput';
import DateTimeInput from './DateTimeInput';
import NoOfPeopleInput from './NoOfPeopleInput';
import VehicleNoInput from './VehicleNoInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CountryCode from '../CountryCode';

class NewEditVisitorRequest extends Component {
     constructor(props) {
          super(props)
          this.state = {
               visitorRequestId: props.visitorRequestId,
               isClicked: '',
               refreshing: true,
               errorName: '',
               errorPassword: '',
               errornoOfPeople: '',
               errornDate: '',
               isDateTimePickerVisible: false,
               selectedDate: '',
               userId: '',
               flatId: '',
               pickerSelectedValue: '',
          }
     }

     renderButton() {
          return (
               <Button
                    onPress={() => {

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
                                   errorDate: '* Please Select Date & Time.'
                              })
                         } else {

                              console.log(" pickerSelectedValue : ", this.state.pickerSelectedValue)
                              visitorName = this.props.auth.name
                              visitorMobileNumber = this.props.auth.code + '-' + this.props.auth.phone

                              requestDateTime = this.state.selectedDate
                              noOfVisitors = this.props.auth.noOfPeople

                              vehicleType = this.state.pickerSelectedValue

                              vehicleNumber = this.props.auth.vehicleNumber
                              visitorRequestId = this.state.visitorRequestId

                              userId = this.state.userId
                              flatId = this.state.flatId

                              this.props.editVisitorRequest_(userId, visitorName, visitorMobileNumber, requestDateTime, noOfVisitors, vehicleType, vehicleNumber, visitorRequestId, flatId)
                         }
                    }}
               >{Save}
               </Button>
          );
     }
     //call async data
     renderVisitorDetails() {
          //pass complaintIs
          // console.log("inside com edit", this.state.userId)
          callPostApi('http://192.168.0.32:8000/api/getVisitorDetailsAdmin?', {
               "userId": this.state.userId,
               "visitorId": this.state.visitorRequestId,
               "flatId": this.state.flatId
          })
               .then((response) => {
                    // Continue your code here...
                    res = JSON.parse(response)
                    console.log("data visitors : ", res.data[0], ",")

                    if (res.status == 200) {

                         this.props.auth.name = res.data[0].visitor_name

                         //split mobile number 
                         var countyCode = res.data[0].visitor_mobile_number.split('-')

                         this.props.auth.code = countyCode[0]
                         this.props.auth.phone = countyCode[1]

                         console.log("country code ", this.props.auth.code, ",", this.props.auth.phone)

                         this.props.auth.noOfPeople = res.data[0].no_of_visitors + ""
                         this.props.auth.vehicleNumber = res.data[0].vehicle_number + ""

                         this.setState({
                              refreshing: false,
                              selectedDate: res.data[0].request_date_time,
                              pickerSelectedValue: res.data[0].vehicle_type,
                         })
                    } else {
                         this.setState({
                              refreshing: false
                         })
                    }
               });
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

          console.log("print date : ", dateTime)

          this.setState({ selectedDate: dateTime });
          this._hideDateTimePicker();
     };

     async _getUserStorageValue() {

          var value = await AsyncStorage.getItem('propertyDetails')
          var data = JSON.parse(value);

          var valueUser = await AsyncStorage.getItem('userDetail')
          var dataUser = JSON.parse(valueUser);

          var complaintId = await AsyncStorage.getItem('complaintID')
          console.log("***** complaintId", complaintId)

          if (dataUser != '' || dataUser != null) {
               this.setState({
                    userId: dataUser.user_id,
                    flatId: data.flat_id,

               }, this.renderVisitorDetails())
          }
          this.renderVisitorDetails()
          // this.setState({ loadMore: true }, this.renderUsersList)
          //this.renderUsersList()
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

                    <View style={{ flexDirection: 'row', marginLeft: 25, justifyContent: 'space-around' }}>

                         <VehicleNoInput
                              vehicleChange={(text) => this.props.noOfVehicleChanged(text)}
                              value={this.props.auth.vehicleNumber} />

                         {/* add vehicle type */}

                         <View style={styles.displayPickerStyle}>
                              <View style={styles.containerPickerStyle}>
                                   <Picker
                                        placeholder={Vehicle_Type}
                                        placeholderStyle={{ fontSize: 14, textAlign: 'left', color: grey }}
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
                    </View>

                    <Text style={styles.textstyle}>{This_field_is_optional}</Text>

                    <DateTimePicker
                         isVisible={this.state.isDateTimePickerVisible}
                         mode={'datetime'}
                         is24Hour={false}
                         minimumDate={Date.now()}
                         onConfirm={this._handleDatePicked}
                         onCancel={this._hideDateTimePicker} />

                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
                         {this.renderButton()}
                    </View>

               </View>
          );
     }

     componentWillUnmount() {

          this.props.auth.name = ''
          this.props.auth.phone = ''
          this.props.auth.noOfPeople = ''
          this.state.pickerSelectedValue = ''
          this.props.auth.vehicleNumber = ''
          //AsyncStorage.removeItem('complaintID')
          //Actions.pop('Complaints');
          //Actions.popTo('ComplaintDetail');
          //Actions.refresh()
          return true;
     }

     componentDidMount() {

          //this._getUserStorageValue()
          this._getUserStorageValue()

     }

     render() {
          return (
               <KeyboardAvoidingView style={styles.containerStyle} behavior="padding">
                    <View style={styles.card}>
                         {this.renderVerifyFileds()}
                    </View>
               </KeyboardAvoidingView>
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
     imageStyle: {
          width: 83,
          height: 83,
          borderRadius: 20,
          borderWidth: 2,
          marginTop: 15,
          marginLeft: 15,
          borderColor: grey_lighter,
     },
     containerPickerStyle: {
          height: 50,
          width: '63%',
          flexDirection: 'row',
          borderRadius: 30,
          shadowRadius: 4,
          marginLeft: 35,
          //marginRight: 20,
          borderColor: grey_lighter,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center'
     },
     displayPickerStyle: {
          flexDirection: 'row',
          //marginTop: 10
     }
}

const mapStateToProps = (state) => {
     return {
          auth: state.editVisitorRequest
     }
}
export default connect(mapStateToProps, { usernameChanged, vehicleNoChanged, phoneChanged, codeChanged, noOfPeopleChanged, dateChanged, VisitorRequest, noOfVehicleChanged, editVisitorRequest_ })(NewEditVisitorRequest)