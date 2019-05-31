import React, { Component } from 'react'
import SwitchPropertyListItem from './common/SwitchPropertyListItem';
import { FlatList, Text, View, AsyncStorage, Dimensions } from 'react-native';
import Placeholder from 'rn-placeholder'
import { red_lighter, white_Original, grey, black } from './common';
import { ScrollView } from 'react-native-gesture-handler';
import { callPostApi } from './Util/APIManager';
import { Actions } from 'react-native-router-flux';

class SwitchProperty extends Component {
    state = {
        tempData: [],
        refreshing: true,
        propertyList: [],
        propertyListRevertInJson: [],
        user: [],
        userId: '',
        list: []
    }
    renderUsersList() {
        // this.setState({ refreshing: true });
        console.log('prop userId :: ', this.state.userId)
        callPostApi('http://guardomni.dutique.com:8000/api/propertyList?', {
            // "userId": this.state.userId
            "userId": this.state.userId
        })
            .then((response) => {
                // Continue your code here...
                res = JSON.parse(response)
                console.log("**** : " + res.data)

                 if (res.status == 200) {
                    this.setState({
                        propertyList: JSON.stringify(res.data),
                        //propertyListRevertInJson: res.data,
                        propertyListRevertInJson: res.data,
                        refreshing: false
                    })
                    console.log("inisde setState")
                }else if(res.status == 401) {

                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');
                    //SimpleToast.show(response.message)
                    Actions.reset('Login')
                  } else {
                    this.setState({
                        refreshing: false,
                    })
                    console.log("stop calling")
                }
            });
    }
    componentDidMount() {
        this._getUserStorageValue()
    }

    async _getUserStorageValue() {

        var valueUser = await AsyncStorage.getItem('userDetail')
        var dataUser = JSON.parse(valueUser);

        var value = await AsyncStorage.getItem('propertyDetails')
        var data = JSON.parse(value);
        //console.log("prop user data : ", dataUser.user_id)
        if (dataUser != '' || dataUser != null) {
            this.setState({
                userId: dataUser.user_id,
                flatId: data.flat_id,
            })
        }

        this.renderUsersList()
    }


    _handleRefresh = () => {
        this.setState({
            refreshing: false,
        },
            () => {
                this.renderUsersList();
            })
    }

    _emptyPropertyList = () => {
        //call for empty component or error
        if (this.state.refreshing) {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }} />
            )
        } else {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 2 }}>
                    <Text style={styles.textStyle}>No Properties added yet</Text>
                </View>
            )
        }
    }

    //move to next page  : clear session of property details only: 
    // async _getStorageValue(){
    //     var value = await AsyncStorage.getItem('propertyDetails')
    //     console.log("get storage value : ", value)
    //     return value
    //   }

    _sendData(item) {

        //property details [] need to change
        console.log("sendData : ", JSON.stringify(item))
        AsyncStorage.removeItem('propertyDetails');

        AsyncStorage.setItem('propertyDetails', JSON.stringify(item))
        Actions.homepage()
        // });
    }

    render() {
        if (this.state.refreshing) {
            return (
                <ScrollView>
                    <View style={{ backgroundColor: red_lighter, flex: 1 }}>
                        <FlatList
                            data={this.state.propertyListRevertInJson
                            }
                            ListEmptyComponent={this._emptyPropertyList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={({ item, index }) =>
                                <Placeholder.Paragraph>
                                    <SwitchPropertyListItem
                                        sendData={(item) => this._sendData(item)}
                                        propertyId={item}
                                        index={index}
                                        propertyObject={index}
                                        site_name={item.site_name}
                                        flat_no={item.flat_no}
                                        site_image={item.site_image}
                                        role_name={item.role_name} />
                                </Placeholder.Paragraph>
                            }
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                        />
                    </View>

                </ScrollView>
            )
        }
        else {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
                    <FlatList
                        data={this.state.propertyListRevertInJson}
                        ListEmptyComponent={this._emptyPropertyList}
                        renderItem={({ item, index }) =>
                            <SwitchPropertyListItem
                                sendData={(item) => this._sendData(item)}
                                propertyId={item}
                                index={index}
                                site_image={item.site_image}
                                site_name={item.site_name}
                                flat_no={item.flat_no}
                                role_name={item.role_name} />}
                        refreshing={this.state.refreshing}
                        scrollEnabled={true}
                        onRefresh={this._handleRefresh} />
                </View>
            )
        }
    }
}
export default SwitchProperty;

const styles = {
    container: {
        backgroundColor: white_Original,
        width: '95.55%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
        marginLeft: 10,
        justifyitems: 'center',
        elevation: 4,
        marginTop: 12,
        borderRadius: 2
    },
    thumbnail_arrow: {
        height: 55,
        width: 55,
        elevation: 4,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
        marginRight: 5,
        marginBottom: 5,
    },
    textStyle: {
        fontSize: 14,
        color: black,
        fontFamilty: 'OpenSans-Regular',
        alignSelf: 'center'
    }

}