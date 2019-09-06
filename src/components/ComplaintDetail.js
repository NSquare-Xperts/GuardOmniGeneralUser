import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage, DeviceEventEmitter, BackHandler,Dimensions,TouchableHighlight ,TouchableWithoutFeedback, ActivityIndicator, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'
import { red_lighter, white_Original, grey, black, grey_lighter, pink } from './common'
import { ScrollView } from 'react-native-gesture-handler';
import { callPostApi } from './Util/APIManager';
import ImageLoad from 'react-native-image-placeholder'
import Dialog from "react-native-dialog";
import HTML from 'react-native-render-html';
import ActionSheet from 'react-native-action-sheet';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video'


// http://192.168.0.32:8000
//1 : resolved 
//0 : not
var BUTTONSiOS = [
    'Edit',
    'Delete',
    'Cancel'
];

var BUTTONSandroid = [
    'Edit',
    'Delete',
];

var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;


class ComplaintDetail extends Component {
    constructor(props) {
        super(props)
        this.handleBackPress = this.handleBackPress.bind(this)
        this.renderUrl = this.renderUrl.bind(this)


        this.state = {
            complaintId: props.complaintID,
            refreshing: true,
            isVisibleImg1: false,
            isVisibleImg2: false,
            isVisibleImg3: false,
            dialogVisible: false,
            userId: '',
            urlToSend: '',
            opacity: 0,
            errorComment: '',
            newComment: '',

            text: '',
            complaintsCommentArray: [
                {
                    "comment": "NA",
                    "complaint_comment_id": "",
                    "updated_at": "NA",
                    "user_id": ""
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

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: <TouchableOpacity onPress={() => params.handleSave()}>
                <Image
                    source={require('../components/assets/Complaints/more_options.png')}
                    style={styles.iconNotification} />
            </TouchableOpacity>
        };
    };

    _saveDetails() {
        ActionSheet.showActionSheetWithOptions({
            options: (Platform.OS == 'ios') ? BUTTONSiOS : BUTTONSandroid,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'blue'
        },
            (buttonIndex) => {
                console.log('button clicked :', buttonIndex);
                switch (buttonIndex) {
                    case 0:
                        console.log("Edit Button Pressed")
                        Actions.newedit()
                        break;
                    case 1:
                        console.log("Delete Button Pressed")
                        Alert.alert(
                            'Want to Delete this complaint ?',
                            'Complaint will be deleted permantly',
                            [
                                {
                                    text: 'No', onPress: () =>
                                        console.log('Cancel Pressed')

                                },
                                {
                                    text: 'Yes', onPress: () => {

                                        AsyncStorage.multiGet(["LoginData"]).then((data) => {
                                            LoginData = data[0][1];
                                            var res = JSON.parse(LoginData)
                                            AsyncStorage.getItem('complaintID').then((data) => {
                                                var complaintID = JSON.parse(data)
                                                callPostApi('http://18.188.253.46:8000/api/complaintDelete', {
                                                    "userId": res.data[0].user_details.user_id,
                                                    "complaintId": complaintID,
                                                })
                                                    .then((response) => {
                                                        // Continue your code here...
                                                        res = JSON.parse(response)
                                                        //console.log("response : ", res)
                                                        if (res.status == 200) {
                                                            AsyncStorage.removeItem('complaintID')
                                                            AsyncStorage.removeItem('userID')
                                                            //Actions.pop('Complaints');
                                                            DeviceEventEmitter.emit('eventDeletedComplaint', { isDeletedSuccessFully: true });
                                                            Actions.popTo('Complaints');

                                                            SimpleToast.show(res.message)
                                                        } else {
                                                            SimpleToast.show(res.message)
                                                        }
                                                    });

                                            });
                                        });
                                    }
                                }
                            ],
                            { cancelable: true }
                        )
                        break;
                    default:
                }
            });
    }
   
    renderComplaintDetails() {

        console.log("list complaint details")
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
                    console.log("---------detail res :---------")
                    res = JSON.parse(response)
                    console.log("detail res : " + JSON.stringify(res))
                    if (res.status == 200) {
                        this.setState({
                            details: res.data, refreshing: false, complaintsCommentArray: res.complaint_comments
                        })
                    } else if (res.status == 401) {

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

        this.props.navigation.setParams({ handleSave: this._saveDetails });

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

    onLoadStart = () => {
        this.setState({ opacity: 1 });
    }

    onLoad = () => {
        this.setState({ opacity: 0 });
    }

    onBuffer = ({ isBuffering }) => {
        this.setState({ opacity: isBuffering ? 1 : 0 });
    }


    //MOVE TO FULL SCREEN ON VIDEO CLICK 
    renderUrl = () => {
        console.log("************* ----url : "+this.state.urlToSend)
        //Actions.temp({ videoUrl: url })
    }

    videoPressed(url) {
        console.log("Video pressed"+url);
        Actions.fullscreen({ url: url })
      }

    _hideShowImageView() {

        if (this.state.details[0].complaint_image_1 != "" && this.state.details[0].complaint_image_2 != "" && this.state.details[0].complaint_image_3 != "") {
            return (
                <View>
                    {this.state.details[0].complaint_image_1.includes('mp4')
                        ?
                        <View>
                             <TouchableHighlight
                                    onPress={() => this.videoPressed(this.state.details[0].complaint_image_1 )}>
                            {/* <Video
                                style={styles.thumbnail}
                                source={{ uri: this.state.details[0].complaint_image_1 }}
                                ref={(ref) => {
                                    this.player = ref
                                }}                                      // Store reference
                                onBuffer={this.onBuffer}
                                onLoadStart={this.onLoadStart}
                                onLoad={this.onLoad}
                                onError={this.videoError}
                            /> */}
                             <Image
                                            style={styles.thumbnail}
                                            loadingStyle={{ size: 'large', color: 'blue' }}
                                            source={require('../components/assets/Common/video_play_button.png')}
                                            //source={{ uri: this.state.details[0].complaint_image_1 }}
                                        />
                            </TouchableHighlight>
                            {/* <ActivityIndicator
                                animating
                                size="large"
                                color={pink}
                                style={[styles.activityIndicator, { opacity: this.state.opacity }]}
                            /> */}
                        </View>
                        :
                        <ImageLoad
                            style={styles.thumbnail}
                            loadingStyle={{ size: 'large', color: pink }}
                            source={{ uri: this.state.details[0].complaint_image_1 }}
                        />
                    }

                    {this.state.details[0].complaint_image_2.includes('mp4')
                        ?
                        <View>
                             <TouchableHighlight
                                    onPress={() => this.videoPressed(this.state.details[0].complaint_image_2)}>
                            {/* <Video
                                style={styles.thumbnail}
                                source={{ uri: this.state.details[0].complaint_image_2 }}
                                ref={(ref) => {
                                    this.player = ref
                                }}  
                                fullscreen={true}
                                resizeMode={"none"}                                    
                                onBuffer={this.onBuffer}
                                onLoadStart={this.onLoadStart}
                                onLoad={this.onLoad}
                                onError={this.videoError}
                            /> */}
                             <Image
                                            style={styles.thumbnail}
                                            loadingStyle={{ size: 'large', color: 'blue' }}
                                            source={require('../components/assets/Common/video_play_button.png')}
                                            //source={{ uri: this.state.details[0].complaint_image_1 }}
                                        />
                            </TouchableHighlight>
                            {/* <ActivityIndicator
                                animating
                                size="large"
                                color={pink}
                                style={[styles.activityIndicator, { opacity: this.state.opacity }]}
                            /> */}
                        </View>
                        :
                        <ImageLoad
                            style={styles.thumbnail}
                            loadingStyle={{ size: 'large', color: pink }}
                            source={{ uri: this.state.details[0].complaint_image_2 }}
                        />
                    }
                    {this.state.details[0].complaint_image_3.includes('mp4')
                        ?
                        <View>
                             <TouchableHighlight
                                    onPress={() => this.videoPressed(this.state.details[0].complaint_image_3 )}>
                            {/* <Video
                                style={styles.thumbnail}
                                source={{ uri: this.state.details[0].complaint_image_3 }}
                                ref={(ref) => {
                                    this.player = ref
                                }}                                      // Store reference
                                onBuffer={this.onBuffer}
                                onLoadStart={this.onLoadStart}
                                onLoad={this.onLoad}
                                onError={this.videoError}
                            /> */}
                             <Image
                                  style={styles.thumbnail}
                                  loadingStyle={{ size: 'large', color: 'blue' }}
                                  source={require('../components/assets/Common/video_play_button.png')}
                                  //source={{ uri: this.state.details[0].complaint_image_1 }}
                            />
                            </TouchableHighlight>
                            {/* <ActivityIndicator
                                animating
                                size="large"
                                color={pink}
                                style={[styles.activityIndicator, { opacity: this.state.opacity }]}
                            /> */}
                        </View>
                        :
                        <ImageLoad
                            style={styles.thumbnail}
                            loadingStyle={{ size: 'large', color: pink }}
                            source={{ uri: this.state.details[0].complaint_image_3 }}
                        />
                    }
                </View>
            )
        } else if (this.state.details[0].complaint_image_1 != "" && this.state.details[0].complaint_image_2 != "") {
            return (
                <View>
                    {this.state.details[0].complaint_image_1.includes('mp4')
                        ?
                        <View>
                            <TouchableHighlight
                                    onPress={() => this.videoPressed(this.state.details[0].complaint_image_1 )}
                                >
                                {/* <Video
                                    style={styles.thumbnail}
                                    controls={true}
                                    source={{ uri: this.state.details[0].complaint_image_1 }}
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    presentFullscreenPlayer
                                    resizeMode={'cover'}     
                                    onBuffer={this.onBuffer}
                                    onLoadStart={this.onLoadStart}
                                    onLoad={this.onLoad}
                                    onError={this.videoError}/> */}
                                  <Image
                                            style={styles.thumbnail}
                                            loadingStyle={{ size: 'large', color: 'blue' }}
                                            source={require('../components/assets/Common/video_play_button.png')}
                                            //source={{ uri: this.state.details[0].complaint_image_1 }}
                                 />
                            </TouchableHighlight>
                            {/* <ActivityIndicator
                                animating
                                size="large"
                                color={pink}
                                style={[styles.activityIndicator, { opacity: this.state.opacity }]} />                           */}
                         </View>
                        :
                        <ImageLoad
                            style={styles.thumbnail}
                            loadingStyle={{ size: 'large', color: 'blue' }}
                            source={{ uri: this.state.details[0].complaint_image_1 }} />
                    }
                    {this.state.details[0].complaint_image_2.includes('mp4')
                        ?
                        <View>
                             <TouchableHighlight
                                    onPress={() => this.videoPressed(this.state.details[0].complaint_image_2)}>
                            {/* <Video
                                style={styles.thumbnail}
                                controls={true}
                                fullscreen={true} 
                                resizeMode={'cover'}   
                                source={{ uri: this.state.details[0].complaint_image_2 }}
                                ref={(ref) => {
                                    this.player = ref
                                }}                                      
                                onBuffer={this.onBuffer}
                                onLoadStart={this.onLoadStart}
                                onLoad={this.onLoad}
                                onError={this.videoError}
                            /> */}
                             <Image
                                            style={styles.thumbnail}
                                            loadingStyle={{ size: 'large', color: 'blue' }}
                                            source={require('../components/assets/Common/video_play_button.png')}
                                            //source={{ uri: this.state.details[0].complaint_image_1 }}
                                        />
                            </TouchableHighlight>
                            {/* <ActivityIndicator
                                animating
                                size="large"
                                color={pink}
                                style={[styles.activityIndicator, { opacity: this.state.opacity }]}
                            /> */}
                        </View>
                        :
                        <ImageLoad
                            style={styles.thumbnail}
                            loadingStyle={{ size: 'large', color: 'blue' }}
                            source={{ uri: this.state.details[0].complaint_image_2 }}
                        />
                    }
                </View>
            )
        } else if (this.state.details[0].complaint_image_1 != "") {
            return (
                <View>
                    {this.state.details[0].complaint_image_1.includes('mp4')
                        ?
                        <View>
                             <TouchableHighlight
                                    onPress={() => this.videoPressed(this.state.details[0].complaint_image_1 )}>
                                    {/* <Video
                                        style={styles.thumbnail}
                                        //onVideoLoad={{ size: 'large', color: 'blue' }}
                                        source={{ uri: this.state.details[0].complaint_image_1 }}
                                        ref={(ref) => {
                                            this.player = ref
                                        }}
                                        onBuffer={this.onBuffer}
                                        onLoadStart={this.onLoadStart}
                                        onLoad={this.onLoad}
                                        onError={this.videoError}  /> */}
                                    <Image
                                            style={styles.thumbnail}
                                            loadingStyle={{ size: 'large', color: 'blue' }}
                                            source={require('../components/assets/Common/video_play_button.png')}
                                            //source={{ uri: this.state.details[0].complaint_image_1 }}
                                        />

                             </TouchableHighlight>
                           
                            {/* <ActivityIndicator
                                animating
                                size="large"
                                color={pink}
                                style={[styles.activityIndicator, { opacity: this.state.opacity }]}
                            />
                       */}
                        </View>
                        :
                        <ImageLoad
                            style={styles.thumbnail}
                            loadingStyle={{ size: 'large', color: 'blue' }}
                            source={{ uri: this.state.details[0].complaint_image_1 }}
                        />
                    }
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

                    {/* Comment section  */}
                    <Text style={styles.commentTitleStyle}>Comments :</Text>
                    <FlatList style={styles.flatListStyle}
                        data={this.state.complaintsCommentArray}
                        // ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            // < Text style={styles.textDetailStyle}>{item.comment}</Text>                                
                            <HTML html={item.comment + ', Date : ' + item.updated_at} />
                        } />
                </ScrollView>

                <TouchableWithoutFeedback onPress={() =>
                    this.showDialog()}>
                    <Image style={styles.thumbnail_arrow}
                        source={require('./assets/Visitor/add_fab_click.png')} />
                </TouchableWithoutFeedback>

                <Dialog.Container
                    visible={this.state.dialogVisible}>
                    <Dialog.Title>Add New Comment</Dialog.Title>
                    <Dialog.Input
                        height={100}
                        width={215}
                        style={styles.inputStyleComment}
                        //={styles.textDetailStyle}
                        value={this.state.newComment}
                        numberOfLines={5}
                        multiline={true}
                        onChangeText={comment => this.setState({
                            errorComment: '',
                            newComment: comment
                        })}
                    >
                    </Dialog.Input>
                    <Text style={{ color: 'red' }}> {this.state.errorComment}</Text>
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
        console.log("New Comment: ", this.state.newComment)
        if (this.state.newComment.length > 0) {
            this.setState({ dialogVisible: false });
            this.setState({ newComment: '' })
            console.log("UserID: ", this.state.userId, "ComplaintID:", this.state.complaintId, "Comment: ", this.state.newComment)
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
                    //this.renderComplaintDetails()
                    this._handleRefresh()
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
        } else {
            this.setState({
                errorComment: 'Please add comment first'
            })
        }

    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }
    componentWillUnmount() {
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
    iconNotification: {
        height: 23,
        width: 23,
        marginTop: 5,
        alignSelf: 'center',
        marginRight: 8
    },
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
        justifyContent: 'flex-end',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 8
    },
    thumbnail: {
        height: 155,
        width: '100%',
        marginTop: 10,
        backgroundColor:grey_lighter,
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
    commentTitleStyle: {
        fontFamily: 'OpenSans-Bold.ttf',
        fontSize: 15,
        color: black,
        padding: 3,
        marginLeft: 5,
        marginTop: 10

    },
    textDetailStyle: {
        fontFamily: 'OpenSans',
        fontSize: 13,
        color: black,
        padding: 3,
        marginLeft: 5
    },
    flatListStyle: {
        fontFamily: 'OpenSans.ttf',
        fontSize: 13,
        color: black,
        padding: 3,
        marginLeft: 5

    },
    inputStyleComment: {
        textAlignVertical: 'top',
        width: '95%',
        color: black,
        multiline: true,
        backgroundColor: white_Original,
        borderRadius: 10,
        alignSelf: 'flex-start',
        shadowRadius: 4,
        borderColor: grey_lighter,
        borderWidth: 1,
        marginTop: 2,
        marginLeft: 1,
        fontFamily: 'OpenSans',
        fontSize: 14,
        color: black
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 5,
        marginLeft: 5,
        borderBottomColor: '#000',
        margin: 5,
        marginRight: 5,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    activityIndicator: {
        position: 'absolute',
        top: 70,
        left: 70,
        right: 70,
        height: 50
    }
}

