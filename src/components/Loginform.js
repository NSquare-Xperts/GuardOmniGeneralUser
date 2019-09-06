import React, { Component } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import {Button ,Card, CardSection, Spinner, FloatingInput} from './common';
import axios from 'axios';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "./app.style";
import { FullScreenImage } from './common/FullScreenImage';


class Loginform extends Component {
state = 
{ 
   name: '', mobileno: '',visitorsNo: '',error: '', loading: false,
   isDateTimePickerVisible: false,
   selectedDate: ""
};

//  onEmailChange(text){
//       this.props.emailChanged(text);
//       console.log("inside on email changed")
//  }

onLoginSuccess(){
   // this.setState({
   //       email: '',
   //       password: '',
   //       loading: false,
   //       //error: ''
   // });
}

onLoginFailed(){
   //this.setState({ loading: false});
}

handleSubmit = event => {

   event.preventDefault();
   const user ={
      'name' : this.state.name,
      'salary': this.state.mobileno,
      'age': this.state.visitorsNo
   }

   axios.post('http://dummy.restapiexample.com/api/v1/create',user)
      .then(res => {
            console.log("response: ",res);
            console.log(res.data)
   });
}

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this._hideDateTimePicker();
  };


onButtonPress(){
   this.setState({ loading: false})
   //TODO: Add empty validations 
   if(this.state.name != null){
      onLoginFailed();
   }else{
      onLoginSuccess();
   }
}

renderButton(){
   if(this.state.loading){
      return <Spinner size="small" />;
   }
   return (
    <Button onPress={this.handleSubmit}>
            Submit
    </Button>
   );
}

render(){
  const { isDateTimePickerVisible, selectedDate } = this.state;

   return (
     <Card>         
          <CardSection>
            <FloatingInput
            placeholder="Enter your name"
            value={this.state.name}
            maxLength={30}
            onChangeText={name => this.setState({ name })}/>
         </CardSection>  
            
         <CardSection>    
          <FloatingInput
            placeholder="Enter mobile no "
            value={this.state.mobileno}
            maxLength={10}
            //secureTextEntry={true}
            onChangeText={mobileno => this.setState({ mobileno })}/>
         </CardSection>  

         <CardSection>    
          <FloatingInput
            placeholder="Enter No of visitors : "
            value={this.state.visitorsNo}
            maxLength={10}
            onChangeText={visitorsNo => this.setState({ visitorsNo })}/>
         </CardSection>
         
      <CardSection>
          <View style={styles.container}>
            <TouchableOpacity onPress={this._showDateTimePicker}>
               <View style={styles.button}>
                  <Text>Show DatePicker</Text>
               </View>
            </TouchableOpacity>

            <Text style={styles.text}>{selectedDate}</Text>

            <DateTimePicker
               isVisible={isDateTimePickerVisible}
               onConfirm={this._handleDatePicked}
               onCancel={this._hideDateTimePicker}
            />
      </View> 
      </CardSection>

         {/* <CardSection>
        
            <TouchableOpacity onPress={this._showDateTimePicker}>
               <View style={styles.button}>
                  <Text>Show DatePicker</Text>
               </View>
            </TouchableOpacity>

        <Text style={styles.text}>{selectedDate}</Text>

        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      
         </CardSection> */}

          {/* <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
           */}
          <CardSection>
              {this.renderButton()}
          </CardSection>      
     </Card>
    );
 }
}

// const styles1 = {
//    errorTextStyle: {
//          fontSize: 20,
//          alignSelf: 'center',
//          color: 'red'
//    }
// };

// const mapStateToProps = state  => {
// return {
//    email: state.auth.email
// };
// };
//export default connect(null, {emailChanged}) (Loginform);
export default Loginform;
