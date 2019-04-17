import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator, AsyncStorage, Text, Dimensions } from 'react-native'
import Placeholder from 'rn-placeholder'
import { red_lighter, white_Original, grey } from './common'
import HomeNumberOfNotices from './common/HomeNumberOfNotices';
import NoticeListItem from './common/NoticeListItem'
import { callPostApi } from './Util/APIManager'
import { Actions } from 'react-native-router-flux';

class Notices extends Component {
    state = {
        refreshing: false,
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

        // AsyncStorage.multiGet(["LoginData"]).then((data) => {
        //     LoginData = data[0][1];
        //     var res = JSON.parse(LoginData)

        //     this.setState({ userId: res.data[0].user_details.user_id })
        console.log('userId :: ', this.state.userId, this.state.flatId)

        callPostApi('http://18.188.253.46:8000/api/noticeList', {
            "userId": this.state.userId,
            "pageNumber": this.state.page,
            "flatId": this.state.flatId
        })
            .then((response) => {
                // Continue your code here...
                res = JSON.parse(response)
                console.log("response : ", res)
                if (res.status == 200) {
                    this.setState({
                        notices: this.state.notices.concat(res.data), loadMore: false, refreshing: false, totalRecords: res.totalRecords, month_count: res.month_count,
                        status: res.status
                    })
                } else {
                    this.setState({
                        refreshing: false,
                        loadMore: false
                    })
                    //console.log("stop calling")
                }
            });
        // });
    }


    async _getUserStorageValue() {

        var value = await AsyncStorage.getItem('propertyDetails')
        var data = JSON.parse(value);


        var valueUser = await AsyncStorage.getItem('userDetail')
        var dataUser = JSON.parse(valueUser);

        console.log("data :::: " + data.flat_id)

        if (dataUser != '' || dataUser != null) {
            this.setState({
                flatId: data.flat_id,
                userId: dataUser.user_id,
                loadMore: true

            })
            this.renderUsersList()
            //  this.setState({ loadMore: true }, this.renderUsersList)
        }
    }

   componentWillMount() {

        this._getUserStorageValue()

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
        console.warn('handleLoadMore');
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
        if (this.state.refreshing || this.state.loadMore) {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }} />
            )
        } else {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>
                    <Text style={styles.textStyle}>No Notices Added Yet</Text>
                </View>
            )
        }
    }

    _sendId(item) {
        console.log("data : ", item)
        Actions.NoticeDetail({ noticeID: item })


    }

    render() {
        if (this.state.refreshing) {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
                    <HomeNumberOfNotices
                        month_count={this.state.month_count} />

                    <View style={styles.container}>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            data={this.state.notices}
                            nestedScrollEnabled={true}
                            renderItem={({ item, index }) =>
                                <Placeholder.Paragraph>
                                    <NoticeListItem
                                        //notice_image={'1'}
                                        sendData={(item) => this._sendId(item)}
                                        index={item.index}
                                        noticeId={item.id}
                                        created_at={item.created_at}
                                        notice_title={item.notice_title}
                                        notice_description={item.notice_description}
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
                </View>
            );
        } else {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
                    <HomeNumberOfNotices
                        month_count={this.state.month_count} />

                    <View style={styles.container}>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            nestedScrollEnabled={true}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            data={this.state.notices}
                            renderItem={({ item }) =>
                                <NoticeListItem
                                    //notice_image={'1'}
                                    sendData={(item) => this._sendId(item)}
                                    index={item.index}
                                    noticeId={item.id}
                                    created_at={item.created_at}
                                    notice_title={item.notice_title}
                                    notice_description={item.notice_description}
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
                </View>
            );
        }
    }
}
// class Notices extends Component {
// state = {
//     refreshing: true,
//     user: [],
// }
// renderUsersList() {
//       this.setState({refreshing: true});
//       axios.get('https://jsonplaceholder.typicode.com/users')
//       .then(response => {
//           this.setState({ user: response.data, refreshing: false}),
//           console.log("hi ",response.data)
//       }
//     ).catch((error) =>{
//                   console.log(error)
//                   this.setState({
//                           refreshing: false,
//         })
//       }); 
// }
// componentWillMount(){
//     this.renderUsersList()
// }

// _handleRefresh = () => {
//     this.setState({
//         refreshing: false,
//     },
//     () => {
//         this.renderUsersList();
//     })
// }

// FlatListItemSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 0.4,
//           width: "95%",
//           backgroundColor: grey,
//           marginLeft: 10, 
//           marginRight: 10,
//         }}
//       />
//     );
//   }
// render() {
//     if(this.state.refreshing){
//         return(
//             <View style={{backgroundColor: red_lighter, flex: 1}}>
//              <HomeNumberOfNotices/>
//                 <View style={styles.container}>
//                     <FlatList            
//                         data= {this.state.user}
//                         ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                         renderItem={({item}) => 
//                             <Placeholder.Paragraph
//                                 //lineSpacing={10}
//                                 //firstLineWidth={'50%'}
//                                 //animate='fade'
//                                 //color={'grey'}
//                                 //lastLineWidth="30%"
//                                 //onReady={this.state.refreshing}>
//                                 // onReady={true}>  
//                                 >
//                                 <NoticeListItem/>
//                                 {/* <Text style={{padding: 10, justifyContent:'center', fontSize: 14}}> {item.name} </Text> */}
//                                     <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>
//                                     </Placeholder.Paragraph>
//                                 }
//                                 refreshing={this.state.refreshing}
//                                 onRefresh={this._handleRefresh}/>
//                     </View>

//         {/* <TouchableWithoutFeedback onPress={()=> Actions.AddComplaint()}>
//              <Image style={styles.thumbnail_arrow}
//                             source={require('./assets/Visitor/add_fab_click.png')}/> 
//         </TouchableWithoutFeedback>
//                      */}
//     </View>
//             )
//     }
// else{
//     return(
//         <View style={{backgroundColor: red_lighter,flex: 1,marginBottom: 5}}>
//             <HomeNumberOfNotices/>
//             <View style={styles.container}>
//                 <FlatList   
//                     ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                     data= {this.state.user}
//                     renderItem={({item}) => 
//                  <NoticeListItem/>}

//                     // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
//                     refreshing={this.state.refreshing}
//                     onRefresh={this._handleRefresh}/>


//             </View>
//             {/* <TouchableWithoutFeedback onPress={()=> Actions.AddComplaint()}>
//                             <Image style={styles.thumbnail_arrow}
//                             source={require('./assets/Visitor/add_fab_click.png')}/> 
//             </TouchableWithoutFeedback> */}

//         </View>
//     )
//    }
// }

// }
export default Notices;

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