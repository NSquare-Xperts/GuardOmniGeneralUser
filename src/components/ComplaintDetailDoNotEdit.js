import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage, DeviceEventEmitter,TouchableHighlight,ActivityIndicator,FlatList } from 'react-native'
import { red_lighter, white_Original, grey, black, pink } from './common'
import { ScrollView } from 'react-native-gesture-handler'
import { callPostApi } from './Util/APIManager'
import ImageLoad from 'react-native-image-placeholder'
import HTML from 'react-native-render-html'
import Video from 'react-native-video'
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

            callPostApi('http://guardomni.dutique.com:8000/api/complaintDetails', {
                "userId": this.state.userId,
                "complaintId": this.state.complaintId
            })
                .then((response) => {                    
                    res = JSON.parse(response)                    
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
                        // stop calling
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

    //With video support
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
                                controls={true}
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
                                controls={true}
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
                                controls={true}
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
                            loadingStyle={{ size: 'large', color: pink }}
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
                            loadingStyle={{ size: 'large', color: pink }}
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
                                onVideoLoad={{ size: 'large', color: 'blue' }}
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
                            /> */}
                      
                        </View>
                        :
                        <ImageLoad
                            style={styles.thumbnail}
                            loadingStyle={{ size: 'large', color: pink }}
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

                    <Text style={styles.commentTitleStyle }>Comments :</Text>
                    <FlatList style={styles.flatListStyle} 
                            data={this.state.complaintsCommentArray}
                            // ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={({ item }) =>                                                                
                                                               
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
