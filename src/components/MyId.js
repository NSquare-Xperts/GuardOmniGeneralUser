import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage,BackHandler } from 'react-native'
import { red_lighter, white_Original, black, close } from './common'
import Button from './common/Button';
import { Actions } from 'react-native-router-flux'
import ImageLoad from 'react-native-image-placeholder'

class MyId extends Component {
    state = {
        userName: 'NA',
        userId: 'NA',
        ImageSource: ''
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }
    componentDidMount() {
        this._getUserDetails()
    }

    getUserName() {
        AsyncStorage.multiGet(["LoginData"]).then((data) => {
            LoginData = data[0][1];
            var res = JSON.parse(LoginData)

            userId = res.data[0].user_details.user_id
            userName = res.data[0].user_details.user_name

            this.setState({
                userId: userId,
                userName: userName,
            })
        })
    }

    async  _getUserDetails() {

        var value = await AsyncStorage.getItem('propertyDetails')
        var data = JSON.parse(value);
        
        if (data != null) {
            this.setState({
                ImageSource: data.user_qr_code
            }, this.getUserName()
            )
        }
    }

    renderUserDetails() {
        return (
            <View style={styles.container}>
                <View style={{ height: '60%', justifyContent: 'center', alignSelf: 'center' }}>

                    {/* <Image style={styles.thumbnail_arrow}
                        source={{ uri: this.state.ImageSource }}
                    /> */}

                    <ImageLoad
                        style={styles.thumbnail_arrow}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.ImageSource }} />

                </View>

                <View style={{ height: '30%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                    <Text style={styles.textStyleTitle}> {this.state.userName}</Text>
                    <Text style={styles.textStyleMyId}> Your GuardOmni ID </Text>
                    <Text style={styles.textStyle} > *Show this QR to security person at entrance</Text>
                </View>

                <Button
                    onPress={() => {
                        Actions.pop()
                    }}>{close}</Button>
            </View >
        )
    }

    render() {        
        return (
            <View style={{ backgroundColor: red_lighter, flex: 1 }}>
                {this.renderUserDetails()}
            </View>
        )
    }

    handleBackPress() {
        
        if (Actions.currentScene == 'MyId') {
            Actions.pop()
        }
        return true;
    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        return true;
    }
}
export default MyId;

const styles = {
    container: {
        backgroundColor: white_Original,
        width: '95.55%',
        height: '96%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        justifyitems: 'center',
        elevation: 4,
        marginTop: 12,
        borderRadius: 2,
        alignSelf: 'center'
    },
    thumbnail_arrow: {
        height: 205,
        width: 205,
        elevation: 4,
        //alignSelf: 'flex-end',
        //justifyContent: 'flex-end',
        marginRight: 5,
        marginBottom: 5
    },
    textStyle: {
        fontFamily: 'OpenSans',
        fontSize: 12,
        color: black,
        //alignSelf: 'flex-start',
    },
    textStyleMyId: {
        fontFamily: 'OpenSans',
        fontSize: 14,
        color: black,
        marginBottom: 2
        //alignSelf: 'flex-start',
        //marginLeft: 1,
        //marginTop: 2
    },
    textStyleTitle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        color: black,
        //alignSelf: 'center',
        //marginLeft: 15,
        marginBottom: 7
    },


}