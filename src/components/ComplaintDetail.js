import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage, DeviceEventEmitter,BackHandler,TouchableWithoutFeedback } from 'react-native'
import { red_lighter, white_Original, grey, black } from './common'
import { ScrollView } from 'react-native-gesture-handler';
import { callPostApi } from './Util/APIManager';
import ImageLoad from 'react-native-image-placeholder'
import Dialog from "react-native-dialog";

//1 : resolved 
//0 : not
class ComplaintDetail extends Component {
    constructor(props) {
        super(props)
        this.handleBackPress = this.handleBackPress.bind(this)
        this.state = {
            complaintId: props.complaintID,
            refreshing: true,
            isVisibleImg1: false,
            isVisibleImg2: false,
            isVisibleImg3: false,
            dialogVisible: false,
            userId:'',
            newComment:'',
            text: '',
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

            callPostApi('http://guardomni.dutique.com:8000/api/complaintDetails', {
                "userId": this.state.userId,
                "complaintId": this.state.complaintId
            })
                .then((response) => {
                    // Continue your code here...
                    res = JSON.parse(response)
                    console.log("Complaint Details : ", res)                    
                    if (res.status == "200") {
                        this.setState({
                            details: res.data, refreshing: false
                        })

                    }else if (res.status == 401) {

                        AsyncStorage.removeItem('propertyDetails');
                        AsyncStorage.removeItem('userDetail');
                        AsyncStorage.removeItem('LoginData');
                        //SimpleToast.show(response.message)
                        Actions.reset('Login')
                      } else {
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

                </ScrollView>
                <TouchableWithoutFeedback onPress={() =>
                        this.showDialog()}>
                        <Image style={styles.thumbnail_arrow}
                            source={require('./assets/Visitor/add_fab_click.png')} />
                </TouchableWithoutFeedback>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Add New Comment</Dialog.Title>                        
                        <Dialog.Input  style={styles.textInput}
                            value={this.state.newComment}
                            onChangeText={comment => this.setState({ newComment:comment })}                            
                            >
                        </Dialog.Input>
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                        <Dialog.Button label="Add" onPress={this.handleAddComment} />
                </Dialog.Container>
            </View>
        )
    }
    
      showDialog = () => {
        this.setState({ dialogVisible: true });
      };
    
      handleCancel = () => {
        this.setState({ dialogVisible: false });
      };
    
      handleAddComment = () => {        
        console.log("New Comment: ",this.state.newComment)
        this.setState({ dialogVisible: false });
        this.setState({ newComment:'' })
        if (this.state.newComment.length > 0) {
            console.log("UserID: ",this.state.userId,"ComplaintID:",this.state.complaintId,"Comment: ", this.state.newComment)
        callPostApi('http://18.188.253.46:8000/api/addComplaintComment', {
                "userId": this.state.userId,
                "complaintId": this.state.complaintId,
                "comment": this.state.newComment
            })
                .then((response) => {
                    
                    res = JSON.parse(response)
                    console.log("details : ", res)
                    // if (res.status == "200") {
                    //     this.setState({
                    //         details: res.data, refreshing: false
                    //     })
                    // this.renderComplaintDetails()

                    // }else if (res.status == 401) {

                    //     AsyncStorage.removeItem('propertyDetails');
                    //     AsyncStorage.removeItem('userDetail');
                    //     AsyncStorage.removeItem('LoginData');
                    //     //SimpleToast.show(response.message)
                    //     Actions.reset('Login')
                    //   } else {
                    //     console.log("stop calling")
                    // }

                });
        }
        
      };
      

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }
    componentWillUnmount(){
        this.editComplaintListener.remove()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    }

    handleBackPress() {        
        this.props.navigation.goBack(null);
        return true;
    }

}
export default ComplaintDetail;

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
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 5,
        marginLeft: 5,
        borderBottomColor:'#000',
        margin:5,
        marginRight:5,
    
        borderBottomColor: '#000', // Add this to specify bottom border color
        borderBottomWidth: 1     // Add this to specify bottom border thickness
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