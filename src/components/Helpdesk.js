import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator, AsyncStorage, Text, Dimensions, Linking,BackHandler } from 'react-native'
import Placeholder from 'rn-placeholder'
import { red_lighter, grey_lighter, white_Original, grey, Helpline, SiteContacts, black } from './common'
import { callPostApi } from './Util/APIManager'
import HelpdeskListItem from './common/HelpdeskListItem'
import HomeNumberOfHelpdesk from './common/HomeNumberOfHelpdesk'
import SimpleToast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux'

class Helpdesk extends Component {
    state = {
        refreshing: false,
        user: [],
        notices: [],
        loadMore: false,
        res: '',
        page: 0,
        status: '',
        month_count: '',
        userId: ''
    }
    renderUsersList() {

        AsyncStorage.multiGet(["LoginData"]).then((data) => {
            LoginData = data[0][1];
            var res = JSON.parse(LoginData)

            this.setState({ userId: res.data[0].user_details.user_id 
               
            
            })
            console.log('userId :: ', this.state.userId,this.state.flatId)

            callPostApi('http://guardomni.dutique.com:8000/api/helpdeskList', {
                "userId": this.state.userId,
                "flatId": this.state.flatId
            })
                .then((response) => {
                    // Continue your code here...
                    res = JSON.parse(response)
                    //console.log("Helpdesk : ", res.Helpdesk)
                    //console.log("Helpdesk : ", res.Helpdesk)

                    if (res.status == 200) {
                        this.setState({
                            notices: res.Helpdesk, loadMore: false, refreshing: false, totalRecords: res.totalRecords, month_count: res.month_count,
                            status: res.status
                        })
                    }else if (res.status == 401) {

                        AsyncStorage.removeItem('propertyDetails');
                        AsyncStorage.removeItem('userDetail');
                        AsyncStorage.removeItem('LoginData');
                        //SimpleToast.show(response.message)
                        Actions.reset('Login')
                      } else {
                        SimpleToast.show(res.message)
                        this.setState({
                            refreshing: false,
                            loadMore: false
                        })
                        //console.log("stop calling")
                    }
                });
        });
    }

    componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
        this._getUserStorageValue()
    }
    handleBackPress() {
        console.log("---scene---" + Actions.currentScene)
        if (Actions.currentScene == 'Helpdesk') {
            Actions.pop()
        }
        return true;
    }

    async _getUserStorageValue() {

        var value = await AsyncStorage.getItem('propertyDetails')
        var data = JSON.parse(value);

        if (data != '' || data != null) {
            this.setState({
                flatId: data.flat_id
            })
        }
    }

    componentDidMount() {
        this.setState({ loadMore: true }, this.renderUsersList)
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

      
        if (this.state.loadMore || this.state.refreshing) {
            return (
                <View style={styles.loader}>
                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 6, marginBottom: Dimensions.get('window').height / 6 }}>
                    <Text style={styles.textStyle}>No Contacts Added Yet</Text>
                </View>
            )
        }
    }

    render() {
        if (this.state.refreshing) {
            return (
                <View style={{ backgroundColor: red_lighter, flex: 1, marginBottom: 5 }}>
                    <HomeNumberOfHelpdesk />
                    <View style={styles.container}>
                        <Text style={styles.textStyle}> {Helpline}</Text>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            data={this.state.notices.helplines}
                            nestedScrollEnabled={true}
                            renderItem={({ item, index }) =>
                                <Placeholder.Paragraph>
                                    <HelpdeskListItem
                                        help_desk_role={item.help_desk_role}
                                        help_desk_number={item.help_desk_number}
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

                    <View style={styles.container}>
                        <Text style={styles.textStyle}> {SiteContacts}</Text>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            data={this.state.notices.site_contact}
                            nestedScrollEnabled={true}
                            renderItem={({ item, index }) =>
                                <Placeholder.Paragraph>
                                    <HelpdeskListItem
                                        help_desk_role={item.help_desk_role}
                                        help_desk_number={item.help_desk_number}
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

                    <ScrollView>

                    <HomeNumberOfHelpdesk />

                    <View style={styles.container}>
                        <Text style={styles.textStyle}> {Helpline}</Text>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            nestedScrollEnabled={true}
                            data={this.state.notices.helplines}
                            renderItem={({ item }) =>
                                <HelpdeskListItem
                                    help_desk_role={item.help_desk_role}
                                    help_desk_number={item.help_desk_number}
                                />}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            ListFooterComponent={this.renderFooter}
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.textStyle}> {SiteContacts}</Text>
                        <FlatList
                            ListEmptyComponent={this._emptyPropertyList}
                            nestedScrollEnabled={true}
                            data={this.state.notices.site_contact}
                            renderItem={({ item }) =>
                                <HelpdeskListItem
                                    help_desk_role={item.help_desk_role}
                                    help_desk_number={item.help_desk_number}
                                />}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            ListFooterComponent={this.renderFooter}
                        />
                    </View>
                    </ScrollView>
                </View>
            );
        }
    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        return true;
    }
}


// import React, { Component } from 'react'
// import { FlatList ,Text,View} from 'react-native'
// import Placeholder from 'rn-placeholder'
// import { red_lighter, white_Original, grey, Helpline, SiteContacts, black } from './common'
// //import { Actions } from 'react-native-router-flux'
// import HomeNumberOfHelpdesk from './common/HomeNumberOfHelpdesk'
// import HelpdeskListItem from './common/HelpdeskListItem';


// class Helpdesk extends Component {
// state = {
//     refreshing: false,
//     user:[
//         {
//           "id": 1,
//           "name": "Leanne Graham",
//           "username": "Bret",
//           "email": "Sincere@april.biz",
//           "address": {
//             "street": "Kulas Light",
//             "suite": "Apt. 556",
//             "city": "Gwenborough",
//             "zipcode": "92998-3874",
//             "geo": {
//               "lat": "-37.3159",
//               "lng": "81.1496"
//             }
//           },
//           "phone": "1-770-736-8031 x56442",
//           "website": "hildegard.org",
//           "company": {
//             "name": "Romaguera-Crona",
//             "catchPhrase": "Multi-layered client-server neural-net",
//             "bs": "harness real-time e-markets"
//           }
//         },
//         {
//           "id": 2,
//           "name": "Ervin Howell",
//           "username": "Antonette",
//           "email": "Shanna@melissa.tv",
//           "address": {
//             "street": "Victor Plains",
//             "suite": "Suite 879",
//             "city": "Wisokyburgh",
//             "zipcode": "90566-7771",
//             "geo": {
//               "lat": "-43.9509",
//               "lng": "-34.4618"
//             }
//           },
//           "phone": "010-692-6593 x09125",
//           "website": "anastasia.net",
//           "company": {
//             "name": "Deckow-Crist",
//             "catchPhrase": "Proactive didactic contingency",
//             "bs": "synergize scalable supply-chains"
//           }
//         },
//         {
//           "id": 3,
//           "name": "Clementine Bauch",
//           "username": "Samantha",
//           "email": "Nathan@yesenia.net",
//           "address": {
//             "street": "Douglas Extension",
//             "suite": "Suite 847",
//             "city": "McKenziehaven",
//             "zipcode": "59590-4157",
//             "geo": {
//               "lat": "-68.6102",
//               "lng": "-47.0653"
//             }
//           },
//           "phone": "1-463-123-4447",
//           "website": "ramiro.info",
//           "company": {
//             "name": "Romaguera-Jacobson",
//             "catchPhrase": "Face to face bifurcated interface",
//             "bs": "e-enable strategic applications"
//           }
//         }    
//     ]
// }
// renderUsersList() {
//     //   this.setState({refreshing: true});
//     //   axios.get('https://jsonplaceholder.typicode.com/users')
//     //   .then(response => {
//     //       this.setState({ user: response.data, refreshing: false}),
//     //       console.log("hi ",response.data)
//     //   }
//     // ).catch((error) =>{
//     //               console.log(error)
//     //               this.setState({
//     //                       refreshing: false,
//     //     })
//     //   }); 
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
//           height: 0.3,
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
//              <HomeNumberOfHelpdesk/>
//                 <View style={styles.container}>
//                 <Text style={styles.textStyle}> {Helpline}</Text>               
//                     <FlatList            
//                         data= {this.state.user}
//                         //ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                         renderItem={({item}) => 
//                             <Placeholder.Paragraph
//                                 lineSpacing={10}
//                                 firstLineWidth={'50%'}
//                                 animate='fade'
//                                 color={'grey'}
//                                 lastLineWidth="30%"
//                                 //onReady={this.state.refreshing}>
//                                 // onReady={true}>  
//                                 >
//                                 <HelpdeskListItem/>
//                                 {/* <Text style={{padding: 10, justifyContent:'center', fontSize: 14}}> {item.name} </Text> */}
//                                     <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>
//                                     </Placeholder.Paragraph>
//                                 }
//                                 refreshing={this.state.refreshing}
//                                 onRefresh={this._handleRefresh}/>
//                     </View>

//                     <View style= {styles.container}>
//                     <Text style={styles.textStyle}> {SiteContacts}</Text>               
//                     <FlatList            
//                         data= {this.state.user}
//                         //ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                         renderItem={({item}) => 
//                             <Placeholder.Paragraph
//                                 lineSpacing={10}
//                                 firstLineWidth={'50%'}
//                                 animate='fade'
//                                 color={'grey'}
//                                 lastLineWidth="30%"
//                                 //onReady={this.state.refreshing}>
//                                 // onReady={true}>  
//                                 >
//                                 <HelpdeskListItem/>
//                                 {/* <Text style={{padding: 10, justifyContent:'center', fontSize: 14}}> {item.name} </Text> */}
//                                     <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>
//                                     </Placeholder.Paragraph>
//                                 }
//                                 refreshing={this.state.refreshing}
//                                 onRefresh={this._handleRefresh}/>


//                     </View>

//         </View>
//             )
//     }
// else{
//     return(
//         <View style={{backgroundColor: red_lighter,flex: 1,marginBottom: 5}}>
//             <HomeNumberOfHelpdesk/>
//             <View style={styles.container}>
//             <Text style={styles.textStyle}> {Helpline}</Text>               
//                 <FlatList   
//                     //ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                     data= {this.state.user}
//                     renderItem={({item}) => 
//                  <HelpdeskListItem/>}
//                     // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
//                     refreshing={this.state.refreshing}
//                     onRefresh={this._handleRefresh}/>
//             </View>

//             <View style={styles.container}>
//             <Text style={styles.textStyle}> {SiteContacts}</Text>               
//                 <FlatList   
//                     //ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                     data= {this.state.user}
//                     renderItem={({item}) => 
//                  <HelpdeskListItem/>}
//                     // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
//                     refreshing={this.state.refreshing}
//                     onRefresh={this._handleRefresh}/>
//             </View>


//         </View>
//     )
//    }
// }
// }
export default Helpdesk;

const styles = {
    container: {
        backgroundColor: white_Original,
        width: '95.55%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
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
        //justifyContent: 'flex-end',
        marginRight: 5,
        marginBottom: 5,
    },
    textStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: black,
        //alignSelf: 'flex-start',
        //marginLeft: 15
    }
}