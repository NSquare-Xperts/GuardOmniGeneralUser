import React, { Component } from 'react';
import {  Text, View, Image } from 'react-native';

class ApartmentListItem extends Component {
    render() {
         return (
            <View 
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 8 }} >
                
                <View style={styles.containerStyle}>
                <View>
                    <Text style={styles.DateStyle}>11</Text>
                <Text style={styles.DayStyle}>22</Text>
                </View>
                
                <View style={{paddingLeft: 180, paddingTop: 20}}>
                    <View style={styles.numberStyle}>
                        <Text style={styles.numberTextStyle}>33</Text>
                    </View>
                </View>

                <View>
                    <View style={{ paddingTop: 24, paddingLeft: 14}}>
                         <Image
                             style={{height: 16, width: 16, display: 'flex' , alignSelf: 'center', alignContent: 'flex-start' }}
                            //  source={require('./components/LoginAssets/icon.png')}
                             />
                    </View>
                </View>
                </View>
            </View>
        )
    }
}

let styles = {

    DateStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        paddingLeft: 12,
        paddingTop:14
    },

    DayStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        paddingLeft: 12,
        paddingTop: 5
    },

    numberStyle: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    numberTextStyle: {
       color: '#5C8EFE',
       fontWeight: 'bold'
    },
    
containerStyle: {
            height: 150,
            width: '96%',
            backgroundColor: '#ffffff',
            flexDirection: 'row'
        }
}

export default ApartmentListItem;