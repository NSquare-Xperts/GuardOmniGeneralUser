import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage, DeviceEventEmitter } from 'react-native'
import { red_lighter, white_Original, grey, black } from './common'
import { ScrollView } from 'react-native-gesture-handler';
import { callPostApi } from './Util/APIManager';
import ImageLoad from 'react-native-image-placeholder'
import Video from 'react-native-video'

//1 : resolved 
//0 : not
class ComplaintDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            complaintId: props.complaintID,
            refreshing: true,
            isVisibleImg1: false,
            isVisibleImg2: false,
            isVisibleImg3: false,
            text: '',
            details: [
                {
                    "complaint_title": "NA",
                    "complaint_status": "NA",
                    "user_name": "NA",
                    "media1": '',
                    "media2": '',
                    "media3": '',
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

            callPostApi('http://192.168.0.32:8000/api/complaintDetails', {
                "userId": this.state.userId,
                "complaintId": this.state.complaintId
            })
                .then((response) => {
                    // Continue your code here...
                    res = JSON.parse(response)
                    console.log("details : ", res)
                    if (res.status == "200") {
                        this.setState({
                            details: res.data, refreshing: false
                        })
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

        if (this.state.details[0].media1 != "" && this.state.details[0].media2 != "" && this.state.details[0].media3 != "") {
            return (
                <View>
                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].media1 }} />

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].media2 }} />

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].media3 }} />
                </View>
            )
        } else if (this.state.details[0].media1 != "" && this.state.details[0].media2 != "") {
            return (
                <View>
                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].media1 }} />

                    <ImageLoad
                        style={styles.thumbnail}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: this.state.details[0].media2 }}
                    />
                </View>
            )
        } else if (this.state.details[0].media1 != "") {
            return (
                <View>
                    {this.state.details[0].includes('mp4')
                        ? <Video
                            style={styles.thumbnail}
                            controls={true}
                            source={{ uri: 'http://techslides.com/demos/sample-videos/small.mp4' }}
                            ref={(ref) => {
                                this.player = ref
                            }}                                      // Store reference
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onError={this.videoError}

                        />
                        :
                        <ImageLoad
                            style={styles.thumbnail}
                            loadingStyle={{ size: 'large', color: 'blue' }}
                            source={{ uri: this.state.details[0].media1 }}
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

                </ScrollView>
            </View>
        )
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
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
        color: black,
        padding: 3,
        marginLeft: 5
    }

}