import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage, DeviceEventEmitter,FlatList } from 'react-native'
import { red_lighter, white_Original, grey, black } from './common'
import { ScrollView } from 'react-native-gesture-handler';
import { callPostApi } from './Util/APIManager';
import ImageLoad from 'react-native-image-placeholder'
import HTML from 'react-native-render-html'

//1 : resolved 
//0 : not
class ComplaintDetailDoNotEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            complaintId: props.complaintID,
            refreshing: true,
            isVisibleImg1: false,
            isVisibleImg2: false,
            isVisibleImg3: false,
            text: '',
            complaintsCommentArray:[
                {
                    "comment": "NA",
                    "complaint_comment_id": "",
                    "updated_at":"NA",
                    "user_id":""
                }
            ],
            details: [
                {
                    "complaint_title": "NA",
                    "complaint_status": "NA",
                    "user_name": "NA",
                    "complaint_image_1": '',
                    "complaint_image_2": '',
                    "complaint_image_3": '',
                    "complaint_description": "NA"
                }
            ]
        }
    }

    renderComplaintDetails() {

        AsyncStorage.multiGet(["LoginData"]).then((data) => {
            LoginData = data[0][1];
            var res = JSON.parse(LoginData)

            this.setState({ userId: res.data[0].user_details.user_id })

            callPostApi('http://18.188.253.46:8000/api/complaintDetails', {
                "userId": this.state.userId,
                "complaintId": this.state.complaintId
            })
                .then((response) => {
                    // Continue your code here...
                    res = JSON.parse(response)
                    console.log("details : ", res)
                    if (res.status == "200") {
                        this.setState({
                            details: res.data, refreshing: false,complaintsCommentArray:res.complaint_comments
                        })
                    } else if (res.status == 401) {

                        AsyncStorage.removeItem('propertyDetails');
                        AsyncStorage.removeItem('userDetail');
                        AsyncStorage.removeItem('LoginData');
                        //SimpleToast.show(response.message)
                        Actions.reset('Login')
                      }else {
                        console.log("stop calling")
                    }

                });
        });
    }

    componentDidMount() {

        this.editComplaintListener =
            DeviceEventEmitter.addListener('eventEditedComplaint', (e) => {

                DeviceEventEmitter.emit('eventNewComplaintAdded', { isAddeddSuccessFully: true });
                this.setState({
                    refreshing: true,

                }),
                    this.renderComplaintDetails()
            });
        this.renderComplaintDetails()

    }

    _handleRefresh = () => {
        this.setState({
            refreshing: false,
        },
            () => {
                this.renderComplaintDetails();
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
        );
    }

    _hideShowImageView() {

        if (this.state.details[0].complaint_image_1 != "" && this.state.details[0].complaint_image_2 != "" && this.state.details[0].complaint_image_3 != "") {
            return (
                <View>

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].complaint_image_1 }}
                    />

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].complaint_image_2}}
                    />

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].complaint_image_3}}
                    />
                    {/* <Image
                        style={styles.thumbnail}
                        source={{ uri: this.state.details[0].complaint_image_1 }} />


                    <Image style={styles.thumbnail}
                        source={{ uri: this.state.details[0].complaint_image_2 }} />

                    <Image style={styles.thumbnail}
                        source={{ uri: this.state.details[0].complaint_image_3 }} /> */}
                </View>

            )
        } else if (this.state.details[0].complaint_image_1 != "" && this.state.details[0].complaint_image_2 != "") {
            return (
                <View>

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].complaint_image_1 }}
                    />

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].complaint_image_2 }}
                    />
                    {/* <Image
                        style={styles.thumbnail}
                        source={{ uri: this.state.details[0].complaint_image_1 }} />

                    <Image style={styles.thumbnail}
                        source={{ uri: this.state.details[0].complaint_image_2 }} /> */}
                </View>
            )
        } else if (this.state.details[0].complaint_image_1 != "") {
            return (
                <View>
                    {/* <Image
                        style={styles.thumbnail}
                        source={{ uri: this.state.details[0].complaint_image_1 }} /> */}

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].complaint_image_1 }}
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: red_lighter, flex: 1 }}>
                <ScrollView style={styles.container}>

                    <Text style={styles.textTitleStyle}>{this.state.details[0].complaint_title}</Text>

                    <View style={styles.gridRowStyle}>
                        <Text style={styles.textTitleStyle}>Status :</Text>
                        <Text style={styles.textDetailStyle}>{this.state.details[0].complaint_status}</Text>
                    </View>

                    <View style={styles.gridRowStyle}>
                        <Text style={styles.textTitleStyle}>By        :</Text>
                        <Text style={styles.textDetailStyle}> {this.state.details[0].user_name}</Text>
                    </View>

                    {/* show images if available  */}
                    {this._hideShowImageView()}

                    <Text style={styles.textDetailStyle}>{this.state.details[0].complaint_description} </Text>

                    <Text style={styles.commentTitleStyle }>Comments :</Text>
                    <FlatList style={styles.flatListStyle} 
                            data={this.state.complaintsCommentArray}
                            // ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={({ item }) =>                                                                
                                    // < Text style={styles.textDetailStyle}>{item.comment}</Text>                                
                                    <HTML html={item.comment +', Date : '+item.updated_at} />
                            } />
                </ScrollView>
            </View>
        )
    }
}
export default ComplaintDetailDoNotEdit;

const styles = {
    container: {
        backgroundColor: white_Original,
        width: '95.55%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        justifyitems: 'center',
        elevation: 4,
        marginTop: 12,
        borderRadius: 2,
        marginBottom: 5
    },
    thumbnail: {
        height: 155,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    gridRowStyle: {
        flexDirection: 'row',

    },
    gridColStyle: {
        flexDirection: 'column'
    },
    textTitleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 15,
        color: black,
        padding: 3,
        marginLeft: 5

    },
    textDetailStyle: {
        fontFamily: 'OpenSans',
        fontSize: 13,
        color: black,
        padding: 3,
        marginLeft: 5
    }

}




// class ComplaintDetail extends Component {
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
//     return(
//             // <ToolbarAndroid
//             //     logo={require('./assets/Complaints/more_options.png')}
//             //     title="AwesomeApp"
//             //     actions={[{title: 'Settings', icon: require('./assets/Complaints/more_options.png'), show: 'always'}]}
//             //     onActionSelected={this.onActionSelected} />

//             <View style={{backgroundColor: red_lighter, flex: 1}}>
//                     <ScrollView style={styles.container}>

//                         <Text style={styles.textTitleStyle}>Need more cleaning in parking</Text>

//                         <View style={styles.gridRowStyle}>
//                         <Text style={styles.textTitleStyle}>Status :</Text>
//                         <Text style={styles.textDetailStyle}>It is a long established fact that a reader.</Text>
//                         </View>

//                         <View style={styles.gridRowStyle}>
//                         <Text style={styles.textTitleStyle}>By        :</Text>
//                         <Text style={styles.textDetailStyle}> It is a long established fact that a reader.</Text>
//                         </View>


//                         <Image  style={styles.thumbnail}
//                         source={require('./assets/fullscreen.jpg')}/>
//                         <Text style={styles.textDetailStyle}> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English,
//                         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
//                         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
//                         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
//                         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
//                         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
//                         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
//                         making it look like readable English it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable EnglishIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
//                         </Text>

//                     </ScrollView>
//             </View>
//             )

// }
// }
// export default ComplaintDetail;

// const styles = {
//     container: {
//         backgroundColor: white_Original,
//         width: '95.55%',
//         height: '100%',
//         display: 'flex',
//         //justifyContent: 'space-between',
//         flexDirection: 'column',
//         //padding:7,
//         marginLeft: 10,
//         justifyitems: 'center',
//         elevation: 4,
//         marginTop: 12,
//         borderRadius: 2,
//         marginBottom: 5
//     },
//     thumbnail: {
//         height: 155,
//         width: '100%',
//         //alignSelf: 'flex-end',
//         //justifyContent: 'flex-end',
//         marginTop: 10,
//         marginBottom: 10,
//       },
//       gridRowStyle: {
//         flexDirection: 'row',

//       },
//       gridColStyle: {
//         flexDirection: 'column'
//       },
//       textTitleStyle: {
//         fontFamily: 'OpenSans-Bold',
//         fontSize: 15,
//         color: black,
//         padding: 3,
//         marginLeft: 5

//       },
//       textDetailStyle: {
//         fontFamily: 'OpenSans',
//         fontSize: 13,
//         color: black,
//         padding: 3,
//         marginLeft: 5
//       }

// }