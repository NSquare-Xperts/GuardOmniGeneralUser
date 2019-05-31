import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator, Image, TouchableWithoutFeedback, DeviceEventEmitter, AsyncStorage, Text, Dimensions } from 'react-native'
import Placeholder from 'rn-placeholder'
import { red_lighter, white_Original, grey } from './common'
import { callPostApi } from './Util/APIManager'
import RequestListItems from './common/RequestListItems'
import { Actions } from 'react-native-router-flux'

class FlatListForVisitors extends Component {
    state = {
        refreshing: true,
        user: [],
        notices: [],
        loadMore: false,
        res: '',
        page: 0,
        status: '',
        month_count: '',
        userId: '',
        flatId: ''
    }

    renderUsersList() {

        callPostApi('http://guardomni.dutique.com:8000/api/visitorList', {
            "userId": this.state.userId,
            "pageNumber": this.state.page,
            "flatId": this.state.flatId
        })
            .then((response) => {
                // Continue your code here...
                res = JSON.parse(response)
                console.log("response : ", res.month_count)
                if (res.status == 200) {
                    this.setState({
                        notices: this.state.notices.concat(res.data), loadMore: false, refreshing: false, totalRecords: res.totalRecords, month_count: res.month_count,
                        status: res.status
                    })
                } else if (res.status == 401) {

                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');
                    //SimpleToast.show(response.message)
                    Actions.reset('Login')
                  }else {
                    this.setState({
                        refreshing: false,
                    })
                }
            });
    }

    //call async
    async _getUserStorageValue() {

        var value = await AsyncStorage.getItem('propertyDetails')
        var data = JSON.parse(value);

        var valueUser = await AsyncStorage.getItem('userDetail')
        var dataUser = JSON.parse(valueUser);

        if (dataUser != '' || dataUser != null) {
            this.setState({
                userId: dataUser.user_id,
                flatId: data.flat_id,
                loadMore: false,

            })
        }
        this.renderUsersList()
    }


    componentDidMount() {

        this.editRequestListener =
            DeviceEventEmitter.addListener('eventVisitorRequestEdited', (e) => {
                if (e) {
                    this.setState({
                        refreshing: true,
                        loadMore: false,
                        page: 0,
                        swipeEnabled: true,
                        notices: []
                    })
                    this._getUserStorageValue()
                }

            })

        this.addRequestListener =
            DeviceEventEmitter.addListener('eventVisitorRequestAdded', (e) => {
                if (e) {
                    this.setState({
                        refreshing: true,
                        loadMore: false,
                        page: 0,
                        swipeEnabled: true,
                        notices: []
                    })
                    this._getUserStorageValue()
                }

            }, this._getUserStorageValue());

            this.deleteRequestListener =
            DeviceEventEmitter.addListener('eventVisitorDeleted', (e) => {
                if (e) {
                    this.setState({
                        refreshing: true,
                        loadMore: false,
                        page: 0,
                        swipeEnabled: true,
                        notices: []
                    })
                    this._getUserStorageValue()
                }
            });

    }
    componentWillUnmount() {

        this.setState({
            notices: []
        })
        this.editRequestListener.remove()
        this.addRequestListener.remove()
        this.deleteRequestListener.remove()
        
        Actions.pop()
        return true;
    }

    _handleRefresh = () => {
        this.setState({
            refreshing: true,
            loadMore: false,
            page: 0,
            notices: []
        },
            () => {
                this.renderUsersList();
            })
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.4,
                    width: "95%",
                    backgroundColor: grey,
                    marginLeft: 10,
                    marginRight: 10,
                }}
            />
        )
    }
    handleLoadMore = () => {
        //console.warn('handleLoadMore');
        this.setState(
            { page: this.state.page + 1, loadMore: true },
            this.renderUsersList
        )

    }
    renderFooter = () => {
        return (
            this.state.loadMore ?
                <View style={styles.loader}>
                    <ActivityIndicator
                        size="large" />
                </View> : null
        )
    }

    _emptyPropertyList = () => {
        //call for empty component or error
        if (this.state.loadMore || this.state.refreshing) {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>

                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>
                    <Text style={styles.textStyle}>No Request Added Yet</Text>
                </View>
            )
        }
    }

    render() {
        if (this.state.refreshing) {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>

                    <View style={styles.container}>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            data={this.state.notices}
                            nestedScrollEnabled={true}
                            renderItem={({ item }) =>
                                <Placeholder.Paragraph>
                                    <RequestListItems
                                        //flag_reported={'1'}
                                        userId={this.state.userId}
                                        id={item.id}
                                        visitor_name={item.visitor_name}
                                        request_date_time={item.request_date_time}
                                    //out_date_time={item.out_date_time}
                                    />}
                                </Placeholder.Paragraph>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            ListFooterComponent={this.renderFooter}
                        />

                        <TouchableWithoutFeedback onPress={() => Actions.visitorRequest1()}>
                            <Image style={styles.thumbnail_arrow_fab}
                                source={require('./assets/Visitor/add_fab_click.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
                    <View style={styles.container}>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            nestedScrollEnabled={true}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            data={this.state.notices}
                            renderItem={({ item }) =>
                                <RequestListItems
                                    //flag_reported={'1'}
                                    userId={this.state.userId}
                                    id={item.id}
                                    visitor_name={item.visitor_name}
                                    request_date_time={item.request_date_time}
                                //out_date_time={item.out_date_time}
                                />}

                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            ListFooterComponent={this.renderFooter}
                        />

                        <TouchableWithoutFeedback onPress={() => Actions.visitorRequest1()}>
                            <Image style={styles.thumbnail_arrow_fab}
                                source={require('./assets/Visitor/add_fab_click.png')} />
                        </TouchableWithoutFeedback>

                    </View>
                </View>
            );
        }
    }
}



export default FlatListForVisitors;

const styles = {
    container: {

        backgroundColor: white_Original,
        width: '95.55%',
        height: '100%',
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
        scrollEnabled: true,
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
    thumbnail_arrow_fab: {
        height: 55,
        width: 55,
        elevation: 4,
        position: 'absolute',
        bottom: 0,
        right: 0,
        //padding: 20,
        //flex: 1,
        justifyContent: 'flex-end',
        //alignItems: 'flex-end',
        marginRight: 10,
        //alignSelf: 'flex-end',
        marginLeft: 10,
        marginBottom: 8
    },
    loader: {
        marginTop: 20,
        alignItems: 'center'
    }
}





// import React, { Component } from 'react'
// import { FlatList, Text, View ,ActivityIndicator} from 'react-native'
// import axios from 'axios'
// import Placeholder from 'rn-placeholder'
// import { red_lighter, white_Original, grey, black } from './common'
// import RequestListItems from './common/RequestListItems'


// import { callPostApi } from './Util/APIManager'

// class FlatListForVisitors extends Component {

//     state = {
//         user: [],
//         loadMore: true,
//         res: '',
//         page: 0,
//         status: ''
//     }

//     renderUsersList() {
//         callPostApi('http://guardomni.dutique.com:8000/api/visitorList', {
//             "userId": '2',
//             "pageNumber": this.state.page,
//             "flatId": '1'
//         })
//             .then((response) => {
//                 // Continue your code here...
//                 res = JSON.parse(response)
//                 if (res.status == "200") {
//                     this.setState({
//                         user: this.state.user.concat(res.data), loadMore: false, refreshing: false, totalRecords: res.totalRecords,
//                         status: res.status
//                     })
//                 } else {
//                     console.log("stop calling")
//                 }
//             });
//     }

//     componentDidMount() {
//         this.setState({ loadMore: true }, this.renderUsersList)
//     }

//     _handleRefresh = () => {
//         this.setState({
//             loadMore: false,
//             page: 0
//         },
//             () => {
//                 this.renderUsersList();
//             })
//     }

//     FlatListItemSeparator = () => {
//         return (
//             <View
//                 style={{
//                     height: 0.4,
//                     width: "95%",
//                     backgroundColor: grey,
//                     marginLeft: 10,
//                     marginRight: 10,
//                 }}
//             />
//         )
//     }

//     handleLoadMore = () => {
//         console.warn('handleLoadMore');
//         this.setState(
//             { page: this.state.page + 1, loadMore: true },
//             this.renderUsersList
//         )

//     }

//     renderFooter = () => {
//         return (
//             this.state.loadMore ?
//                 <View style={styles.loader}>
//                     <ActivityIndicator
//                         size="large" />
//                 </View> : null
//         )
//     }

//     render() {
//         return (
//             <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
//                 <View style={styles.container}>
//                     <FlatList
//                         ItemSeparatorComponent={this.FlatListItemSeparator}
//                         data={this.state.user}
//                         renderItem={({ item }) =>
//                             <RequestListItems
//                                 //flag_reported={'1'}
//                                 visitor_name={item.visitor_name}
//                                 request_date_time={item.request_date_time}
//                                 //out_date_time={item.out_date_time}
//                             />}
//                         keyExtractor={(item, index) => index.toString()}
//                         onEndReached={this.handleLoadMore}
//                         ListFooterComponent={this.renderFooter}
//                     />
//                 </View>
//             </View>
//         );
//     }
// }
// export default FlatListForVisitors

// const styles = {
//     container: {
//         backgroundColor: white_Original,
//         width: '95.55%',
//         height: '100%',
//         display: 'flex',
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         padding: 5,
//         marginLeft: 10,
//         justifyitems: 'center',
//         elevation: 4,
//         marginTop: 12,
//         borderRadius: 2
//     },
//     loader: {
//         marginTop: 20,
//         alignItems: 'center'
//     }

// }



