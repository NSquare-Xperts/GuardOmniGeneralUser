
import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator, DeviceEventEmitter, TouchableWithoutFeedback, Image, AsyncStorage, Text,BackHandler, Dimensions } from 'react-native'
import Placeholder from 'rn-placeholder'
import { red_lighter, white_Original, grey } from './common'
import { callPostApi } from './Util/APIManager'
import ComplaintListItems from './common/ComplaintListItem';
import HomeNumberOfComplaints from './common/HomeNumberOfComplaints'
import { Actions } from 'react-native-router-flux';

class Complaints extends Component {
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
        //isReload: this.props.home
    }

    renderUsersList() {
        //callPostApi('http://guardomni.dutique.com:8000/api/complaintList', {
            callPostApi('http://guardomni.dutique.com:8000/api/complaintList', {  
            "userId": this.state.userId,
            "pageNumber": this.state.page,
            "flatId": this.state.flatId
        }).then((response) => {            
            res = JSON.parse(response)
            
            if (res.status == 200) {
                this.setState({
                    notices: this.state.notices.concat(res.data), loadMore: false, refreshing: false, totalRecords: res.totalRecords, month_count: res.month_count,
                    status: res.status,
                })
            } else if (res.status == 400) {
                this.setState({
                    refreshing: false,
                    loadMore: false,
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


    handleBackPress() {        
        if (Actions.currentScene == 'Complaints') {
            Actions.pop()
        }
        return true;
      }
  
      
    componentWillMount() {        
            this._getUserStorageValue()
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
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
        this.addComplaintListener =
            DeviceEventEmitter.addListener('eventNewComplaintAdded', (e) => {
                if (e) {
                    this.setState({
                        refreshing: true,
                        loadMore: false,
                        page: 0,
                        notices: [],
                        isReload: false
                    })                    
                    this._getUserStorageValue()
                }
            });

        this.deleteComplaintListener =
            DeviceEventEmitter.addListener('eventDeletedComplaint', (e) => {
                if (e) {
                    this.setState({
                        refreshing: true,
                        loadMore: false,
                        page: 0,
                        notices: [],
                        isReload: false
                    }),                    
                    this._getUserStorageValue()
                    Actions.refresh()
                }
            });
    }

    componentWillUnmount() {       
       
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        Actions.popTo('drawer');
        this.setState({
            notices: []
        })
        this.addComplaintListener.remove()
        this.deleteComplaintListener.remove()        
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
                    height: 0.3,
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
                    <Text style={styles.textStyle}>No Complaints Added Yet</Text>
                </View>
            )
        }
    }
    //pass id on click 
    _sendData(item, status) {

        AsyncStorage.removeItem('complaintID')
        AsyncStorage.removeItem('complaintStatus')
        var id = item;
        sendID = "" + id + ""

        // AsyncStorage.setItem('complaintID', sendID)
        // AsyncStorage.setItem('userID', this.state.userId)
        
        AsyncStorage.setItem('complaintID', JSON.stringify(sendID))
        AsyncStorage.setItem('userID', JSON.stringify(this.state.userId))

        if (status == 0) {
            Actions.ComplaintDetail({ complaintID: item })
        } else {
            Actions.ComplaintDetailDelete({ complaintID: item })
        }
    }

    render() {
        if (this.state.refreshing) {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
                    <HomeNumberOfComplaints
                        month_count={this.state.month_count} />

                    <View style={styles.container}>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            data={this.state.notices}
                            nestedScrollEnabled={true}
                            renderItem={({ item }) =>
                                <Placeholder.Paragraph>
                                    <ComplaintListItems
                                        //notice_image={'1'}
                                        //index={item.index}
                                        sendData={(item, status) => this._sendData(item, status)}
                                        complaintId={item.id}
                                        complaint_title={item.complaint_title}
                                        complaint_description={item.complaint_description}
                                        complaint_status={item.complaint_status}
                                        complaint_status_img={item.complaint_status_image}
                                    //out_date_time={item.out_date_time}
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
                    <TouchableWithoutFeedback onPress={() => Actions.AddComplaintNew()}>
                        <Image style={styles.thumbnail_arrow}
                            source={require('./assets/Visitor/add_fab_click.png')} />
                    </TouchableWithoutFeedback>
                </View>
            );
        } else {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
                    <HomeNumberOfComplaints
                        month_count={this.state.month_count} />

                    <View style={styles.container}>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            nestedScrollEnabled={true}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            data={this.state.notices}
                            renderItem={({ item }) =>
                                <ComplaintListItems
                                    //notice_image={'1'}
                                    //index={item.index}
                                    sendData={(item, status) => this._sendData(item, status)}
                                    complaintId={item.id}
                                    complaint_title={item.complaint_title}
                                    complaint_description={item.complaint_description}
                                    complaint_status={item.complaint_status}
                                    complaint_status_img={item.complaint_status_image}
                                //out_date_time={item.out_date_time}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            ListFooterComponent={this.renderFooter}
                        />
                    </View>

                    <TouchableWithoutFeedback onPress={() =>
                        Actions.AddComplaintNew()}>
                        <Image style={styles.thumbnail_arrow}
                            source={require('./assets/Visitor/add_fab_click.png')} />
                    </TouchableWithoutFeedback>
                </View>
            );
        }
    }
}
export default Complaints;

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
    // thumbnail_arrow: {
    //     height: 55,
    //     width: 55,
    //     elevation: 4,
    //     position: 'absolute',
    //     bottom: 0,
    //     alignSelf: 'flex-end',
    //     marginRight: 5,
    //     marginBottom: 5,
    // },
    thumbnail_arrow: {
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