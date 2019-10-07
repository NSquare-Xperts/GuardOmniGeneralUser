import HistoryListItems from './common/HistoryListItems'
import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator, AsyncStorage, Text, Dimensions, DeviceEventEmitter } from 'react-native'
import Placeholder from 'rn-placeholder'
import { red_lighter, white_Original, grey } from './common'
import { callPostApi } from './Util/APIManager'

class FlatListForVisitorsHistory extends Component {
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
        flatId: '',
        image: '',
        uri: '',
        // isReported: false
    }

    renderUsersList() {

        callPostApi('http://guardomni.dutique.com:8000/api/visitorHistory', {
            "userId": this.state.userId,
            "pageNumber": this.state.page,
            "flatId": this.state.flatId
        })
            .then((response) => {                
                res = JSON.parse(response)                
                if (res.status == "200") {
                    this.setState({
                        notices: this.state.notices.concat(res.data), loadMore: false, refreshing: false, totalRecords: res.totalRecords, month_count: res.month_count,
                        status: res.status
                    })
                } else if (res.status == 401) {
                    AsyncStorage.removeItem('propertyDetails');
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.removeItem('LoginData');                    
                    Actions.reset('Login')
                } else {
                    this.setState({
                        refreshing: false,
                    })                    
                }
            });

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
                loadMore: false
            }, this.renderUsersList)
        }
    }

    componentDidMount() {
        this.eventReportedListener =
            DeviceEventEmitter.addListener('eventReported', (e) => {
                if (e) {
                    this.setState({
                        refreshing: true,
                        loadMore: false,
                        page: 0,
                        notices: []
                    })
                    this._getUserStorageValue()
                }

            }, this._getUserStorageValue());
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

    //check image 
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
                    <Text style={styles.textStyle}>No History Added Yet</Text>
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
                            renderItem={({ item, index }) =>
                                <Placeholder.Paragraph>
                                    <HistoryListItems
                                        userId={this.state.userId}
                                        flag_reported_image={item.reported_status_image}
                                        id={item.id}
                                        status={item.reported_status}
                                        visitor_name={item.visitor_name}
                                        in_date_time={item.in_date_time}
                                        out_date_time={item.out_date_time}
                                    />
                                </Placeholder.Paragraph>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            ListFooterComponent={this.renderFooter}
                        />
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
                                <HistoryListItems
                                    userId={this.state.userId}
                                    flag_reported_image={item.reported_status_image}
                                    id={item.id}
                                    status={item.reported_status}
                                    visitor_name={item.visitor_name}
                                    in_date_time={item.in_date_time}
                                    out_date_time={item.out_date_time}
                                />}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            ListFooterComponent={this.renderFooter}
                        />
                    </View>
                </View>
            );
        }
    }

    componentWillUnmount() {
        this.setState({
            notices: []
        })
    }
}

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
    loader: {
        marginTop: 20,
        alignItems: 'center'
    }
}


export default FlatListForVisitorsHistory




