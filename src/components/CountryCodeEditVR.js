import React, { Component } from 'react'
import { View, Text, ListView, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Code } from '../actions'
import { white_Original, red_lighter, grey, grey_lighter } from './common'
import Card from './card'
import {Actions} from 'react-native-router-flux'
import ListItemCountryCodeEditVR from './ListItemCountryCodeEditVR';

class CountryCodeEditVR extends Component {

    state = {
        query: '',
        hideResults: false,
        data: []
    }

    componentDidMount() {
        this.setState({
            data: this.props.codes
        })
    }

    componentWillUnmount(){
        Actions.popTo('countrycodeEditVR')
        return true;
    }

    renderRow(Codes) {
        return <ListItemCountryCodeEditVR
            code={Codes} />
    }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.dataSource = ds.cloneWithRows(this.state.data);
        var newData = []
        if (this.state.query == '' && this.state.query.length < 3) {
            this.state.data = this.props.codes
        }

        for (i in this.props.codes) {
            if (this.props.codes[i].name.includes(this.state.query)) {
                newData.push({
                    name: this.props.codes[i].name,
                    dial_code: this.props.codes[i].dial_code,
                    code: this.props.codes[i].code
                })
            }
        }
        this.state.data = newData
        return (
            <View style={{ flex: 1, backgroundColor: red_lighter,flexDirection: 'column' }}>
                <Card>
                    <View style={{
                        backgroundColor: white_Original,
                        borderRadius: 10, height: 35, width: '95%', marginLeft: '2.5%', marginTop: 25, justifyContent: 'center'
                    }}>
                        <TextInput
                            value={this.state.query}
                            onChangeText={text => {
                                this.setState({
                                    query: text
                                })
                            }}
                            style={{ borderWidth: 2, paddingLeft: 20, marginTop: 45, marginBottom: 15, height: 55, borderRadius: 40, backgroundColor: white_Original, borderColor: grey_lighter,
                                marginBottom: 15 }}
                            placeholder="   Enter to search"
                            underlineColorAndroid='#0000' />
                    </View>

                    <View style={{height: 0.6, width: '100%',backgroundColor: grey,marginTop: 50,marginBottom:10}} />

                    <ScrollView>
                        <ListView
                            backgroundColor={white_Original}
                            enableEmptySections={true}
                            dataSource={this.dataSource}
                            renderRow={this.renderRow}
                        />
                    </ScrollView>
                </Card>
            </View>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        codes: state.codes,
        auth: state.auth
    }

}
export default connect(mapStateToProps, { Code })(CountryCodeEditVR);




// import React, { Component } from 'react';
// import { View, Text, ListView, ScrollView, TextInput } from 'react-native';
// import { connect } from 'react-redux';
// import { Code } from '../actions';
// import ListItemCountryCode from './ListItemCountryCode';
// import { white_Original, red_lighter, grey, grey_lighter } from './common';
// import Card from './card';

// class CountryCode extends Component {

//     state = {
//         query: '',
//         hideResults: false,
//         data: []
//     }

//     componentDidMount() {
//         this.setState({
//             data: this.props.codes
//         })

//     }

//     renderRow(Codes) {
//         return <ListItemCountryCode
//             code={Codes} />
//     }

//     render() {
//         const ds = new ListView.DataSource({
//             rowHasChanged: (r1, r2) => r1 !== r2
//         })
//         this.dataSource = ds.cloneWithRows(this.state.data);
//         var newData = []
//         if (this.state.query == '' && this.state.query.length < 3) {
//             this.state.data = this.props.codes
//         }

//         for (i in this.props.codes) {
//             if (this.props.codes[i].name.includes(this.state.query)) {
//                 newData.push({
//                     name: this.props.codes[i].name,
//                     dial_code: this.props.codes[i].dial_code,
//                     code: this.props.codes[i].code
//                 })
//             }

//         }
//         this.state.data = newData

//         return (
//             <View style={{ flex: 1, backgroundColor: red_lighter }}>
//                 <Card>

//                     <View style={{
//                         backgroundColor: white_Original,
//                         borderRadius: 10, height: 60, width: '95%', marginLeft: '2.5%', marginTop: 25, justifyContent: 'center'
//                     }}>

//                         <TextInput
//                             value={this.state.query}
//                             onChangeText={text => {
//                                 this.setState({
//                                     query: text
//                                 })
//                             }}
//                             style={{ backgroundColor: white_Original,marginLeft: 17,marginRight: 17, padding: 10,marginTop: 10, marginBottom: 10, height: 50, 
//                                 borderRadius: 30,borderWidth: 1,borderColor: grey_lighter }}
//                             placeholder="   Enter to search"
//                             underlineColorAndroid='#0000' />
//                     </View>

//                     <View style={{height: 0.6, width: '100%',backgroundColor: grey,marginTop: 10,marginBottom: 10}}></View>
//                     <ScrollView>
//                         <ListView
//                             backgroundColor={white_Original}
//                             enableEmptySections={true}
//                             dataSource={this.dataSource}
//                             renderRow={this.renderRow}
//                         />
//                     </ScrollView>
//                 </Card>
//             </View>
//         )
//     }

// }

// const mapStateToProps = (state) => {

//     return {
//         codes: state.codes,
//         auth: state.auth
//     }

// }

// export default connect(mapStateToProps, { Code })(CountryCode);