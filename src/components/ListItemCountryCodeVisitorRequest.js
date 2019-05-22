import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Code } from '../actions'

class ListItemCountryCodeVisitorRequest extends Component {
    render(){
        return(
            <TouchableOpacity
                onPress = {()=>{
                    this.props.Code(this.props.code.dial_code)
                    Actions.visitorRequest1();
                   // Actions.popTo('visitorRequest1')
                }}> 
                    <View>
                        <View style={{flexDirection: 'row', height: 46.5, width: '100%', alignItems: 'center'}}>
                            <Text style={{paddingLeft: 17, color: 'rgba(0, 0, 0, 0.8)', fontSize: 14}}>{this.props.code.dial_code}</Text>
                            <Text style={{paddingLeft: 5, color: 'rgba(0, 0, 0, 0.8)', fontSize: 14}}>{this.props.code.name}</Text>
                        </View>
                        <View style={{borderBottomWidth: 0.5, marginLeft: 6 , borderBottomColor: '#C8C7CC', marginTop: 7.5, width: '95.55%'}}/>
                    </View>
                </TouchableOpacity>
        )
    }
}
export default connect(null, { Code })(ListItemCountryCodeVisitorRequest);
