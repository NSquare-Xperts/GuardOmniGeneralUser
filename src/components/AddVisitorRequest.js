import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddVisiorRequestInput from './AddVisitorRequestInput';
import { ScrollView } from 'react-native-gesture-handler';

class AddVisiorRequest extends Component {

     
     render() {
          return (
               // <AddVisiorRequestInput/>
               // <ScrollView style={{display:'flex' , flex: 1,height: '100%'}}>
                   <AddVisiorRequestInput />
                     
               // </ScrollView>
          )
     }
}
export default AddVisiorRequest;

