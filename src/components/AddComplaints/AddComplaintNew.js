import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TouchableOpacity, Platform, PixelRatio, AsyncStorage, BackHandler, TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import Button from '../common/Button'
import { titleChanged, commentsChanged, addComplaint_ } from './ComplaintsActions'
import { white_Original, red_lighter, grey_lighter, grey_light, Add_Complaint, pink, black, blue } from '../common';
import TitleInput from './TitleInput'
import CommentsInput from './CommentsInput'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import { ScrollView } from 'react-native-gesture-handler'
import SimpleToast from 'react-native-simple-toast'

class AddComplaintNew extends Component {

  constructor(props) {
    super(props);
    this.handleBackPress = this.handleBackPress.bind(this)
  }

  state = {
    loader: false,
    errorTitle: '',
    errorComments: '',
    ImageSource: null,
    ImageSource1: null,
    ImageSource2: null,
    isView1Visible: false,
    isView2Visible: false,

    userId: '',
    flatId: '',

    uriToSend: '',
    uriTo1Send: '',
    uriTo2Send: '',

    imageName: '',
    imageName1: '',
    imageName2: '',

    type: '',
    type1: '',
    type2: ''
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      durationLimit: 2,
      title: 'Choose Image or Video',
      customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
      //smediaType: "mixed",
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker({
      title: 'Choose Image or Video',
      customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
      chooseFromLibraryButtonTitle: null,
      takePhotoButtonTitle: null,
    }, (res) => {
      if (res.customButton == 'library' && Platform.OS == 'ios') {
        ImagePicker.launchImageLibrary({
          //---------------start
          title: 'Choose Image or Video',
          customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
          chooseFromLibraryButtonTitle: null,
          takePhotoButtonTitle: null,
        }, (res) => {
          if (res.customButton) {
            console.log("responseon  >> " + JSON.stringify(res))
            ImagePicker.launchCamera({
              mediaType: res.customButton,
              videoQuality: 'medium',
              //durationLimit: 60,
              quality: 1,
            }, (response) => {

              let source;
              source = { uri: response.uri };

              SimpleToast.show("res : " + JSON.stringify(response))
              console.log("response > " + JSON.stringify(response))
              if (res.customButton != "image") {

                if (Platform.OS == 'ios') {
                  this.setState({
                    uriToSend: response.uri,
                    ImageSource: source,
                    imageName: 'video_ios_1',
                    type: "video/mp4"
                  });
                } else {
                  this.setState({
                    uriToSend: response.uri,
                    ImageSource: source,
                    imageName: response.uri,
                    type: "video/mp4"
                  });
                }
              } else {
                if (Platform.OS == 'ios') {
                  this.setState({
                    uriToSend: response.uri,
                    ImageSource: source,
                    imageName: response.fileSize + "",
                    type: response.type
                  });
                } else {
                  this.setState({
                    uriToSend: response.uri,
                    ImageSource: source,
                    imageName: response.fileName,
                    type: response.type
                  });
                }
              }
            });
          } else if (!res.didCancel) {
            const source = { uri: 'data:image/jpeg;base64,' + res.data };
            this.setState({
              uriToSend: res.uri,
              ImageSource: source,
              imageName: res.fileName,
              type: res.type
            });
          }
        })
      } else {
        if (res.customButton) {
          ImagePicker.launchCamera({
            mediaType: res.customButton,
            videoQuality: 'medium',
            //durationLimit: 60,
            quality: 1,
          }, (response) => {

            let source;
            source = { uri: response.uri };

            if (res.customButton != "image") {
              if (Platform.OS == 'ios') {
                if (JSON.stringify(source) != '{}') {
                  this.setState({
                    uriToSend: response.uri,
                    ImageSource: source,
                    imageName: 'video_ios_1',
                    type: "video/mp4"
                  });
                }
              } else {
                if (JSON.stringify(source) != '{}') {
                this.setState({
                  uriToSend: response.uri,
                  ImageSource: source,
                  imageName: response.uri,
                  type: "video/mp4"
                });
              }
              }
            } else {
              if (Platform.OS == 'ios') {
                if (JSON.stringify(source) != '{}') {
                  this.setState({
                    uriToSend: response.uri,
                    ImageSource: source,
                    imageName: response.fileSize + "",
                    type: response.type
                  });
                }
              } else {
                //android 
                if (JSON.stringify(source) != '{}') {
                this.setState({
                  uriToSend: response.uri,
                  ImageSource: source,
                  imageName: response.fileName,
                  type: response.type
                });
              }
              }
            }
          });
        } else if (!res.didCancel) {

          const source = { uri: 'data:image/jpeg;base64,' + res.data };

          this.setState({
            uriToSend: res.uri,
            ImageSource: source,
            imageName: res.fileName,
            type: res.type
          });
        }
      }
    });
  }

  selectPhoto2Tapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      durationLimit: 2,
      title: 'Choose Image or Video',
      customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker({
      title: 'Choose Image or Video',
      customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
      chooseFromLibraryButtonTitle: null,
      takePhotoButtonTitle: null,
    }, (res) => {

      if (res.customButton == 'library' && Platform.OS == 'ios') {
        ImagePicker.launchImageLibrary({

          title: 'Choose Image or Video',
          customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
          chooseFromLibraryButtonTitle: null,
          takePhotoButtonTitle: null,
        }, (res) => {
          if (res.customButton) {
            ImagePicker.launchCamera({
              mediaType: res.customButton,
              videoQuality: 'medium',
              //durationLimit: 60,
              quality: 1,
            }, (response) => {

              let source;
              source = { uri: response.uri };

              if (res.customButton != "image") {

                if (Platform.OS == 'ios') {
                  this.setState({
                    uriTo1Send: response.uri,
                    ImageSource1: source,
                    imageName1: 'video_ios_2',
                    type1: "video/mp4"
                  });
                } else {
                  this.setState({
                    uriTo1Send: response.uri,
                    ImageSource1: source,
                    imageName1: response.path,
                    type1: "video/mp4"
                  });
                }

              } else {

                if (Platform.OS == 'ios') {
                  this.setState({
                    uriTo1Send: response.uri,
                    ImageSource1: source,
                    imageName1: response.fileSize + "",
                    type1: response.type
                  });

                } else {
                  this.setState({
                    uriTo1Send: response.uri,
                    ImageSource1: source,
                    imageName1: response.fileName,
                    type1: response.type
                  });
                }
              }
            });
          } else if (!res.didCancel) {
            console.log("responseon from gallery >> " + JSON.stringify(res))

            const source = { uri: 'data:image/jpeg;base64,' + res.data };
            // console.log("source : " + JSON.stringify(source))
            //console.log("source uri : " + JSON.stringify(source.uri))
            console.log("URI >> " + res.uri)
            this.setState({
              uriTo1Send: res.uri,
              ImageSource1: source,
              imageName1: res.fileName,
              type1: res.type
            });
          }
        }
        )
      } else {
        if (res.customButton) {
          ImagePicker.launchCamera({
            mediaType: res.customButton,
            videoQuality: 'medium',
            //durationLimit: 60,
            quality: 1,
          }, (response) => {

            let source;
            source = { uri: response.uri };

            if (res.customButton != "image") {
              //for video                
              if (Platform.OS == 'ios') {
                if (JSON.stringify(source) != '{}') {
                  this.setState({
                    uriTo1Send: response.uri,
                    ImageSource1: source,
                    imageName1: 'video_ios_2',
                    type1: "video/mp4"
                  });
                }
              } else {
                if (JSON.stringify(source) != '{}') {
                this.setState({
                  uriTo1Send: response.uri,
                  ImageSource1: source,
                  imageName1: response.path,
                  type1: "video/mp4"
                });
              }
              }
            } else {
              //for image
              if (Platform.OS == 'ios') {
                if (JSON.stringify(source) != '{}') {
                  this.setState({
                    uriTo1Send: response.uri,
                    ImageSource1: source,
                    imageName1: response.fileSize + "",
                    type1: response.type
                  });
                }
              } else {
                if (JSON.stringify(source) != '{}') {
                this.setState({
                  uriTo1Send: response.uri,
                  ImageSource1: source,
                  imageName1: response.fileName,
                  type1: response.type
                });
              }
              }
            }
          });
        } else if (!res.didCancel) {
          console.log("responseon from gallery >> " + JSON.stringify(res))

          const source = { uri: 'data:image/jpeg;base64,' + res.data };
          // console.log("source : " + JSON.stringify(source))
          //console.log("source uri : " + JSON.stringify(source.uri))
          console.log("URI >> " + res.uri)
          this.setState({
            uriTo1Send: res.uri,
            ImageSource1: source,
            imageName1: res.fileName,
            type1: res.type
          });
        }
      }
    })
  }

  selectPhoto3Tapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      durationLimit: 2,
      customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker({
      title: 'Choose Image or Video',
      customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
      chooseFromLibraryButtonTitle: null,
      takePhotoButtonTitle: null,
    }, (res) => {

      if (res.customButton == 'library' && Platform.OS == 'ios') {
        ImagePicker.launchImageLibrary({
          //---------------start
          title: 'Choose Image or Video',
          customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }, { name: 'library', title: 'Choose from Library' }],
          chooseFromLibraryButtonTitle: null,
          takePhotoButtonTitle: null,
        }, (res) => {
          if (res.customButton) {
            ImagePicker.launchCamera({
              mediaType: res.customButton,
              videoQuality: 'medium',
              //durationLimit: 60,
              quality: 1,
            }, (response) => {

              let source;
              source = { uri: response.uri };

              if (res.customButton != "image") {
                //for video
                if (Platform.OS == 'ios') {

                  this.setState({
                    uriTo2Send: response.uri,
                    ImageSource2: source,
                    imageName2: 'video_ios_3',
                    type2: "video/mp4"
                  });

                } else {
                  this.setState({
                    uriTo2Send: response.uri,
                    ImageSource2: source,
                    imageName2: response.path,
                    type2: "video/mp4"
                  });
                }
              } else {
                //for image
                if (Platform.OS == 'ios') {

                  this.setState({
                    uriTo2Send: response.uri,
                    ImageSource2: source,
                    imageName2: response.fileSize + "",
                    type2: response.type
                  });

                } else {
                  this.setState({
                    uriTo2Send: response.uri,
                    ImageSource2: source,
                    imageName2: response.fileName,
                    type2: response.type
                  });
                }
              }
            });
          } else if (!res.didCancel) {
            const source = { uri: 'data:image/jpeg;base64,' + res.data };

            this.setState({
              uriTo2Send: res.uri,
              ImageSource2: source,
              imageName2: res.fileName,
              type2: res.type
            });
          }
        }
        )
      } else {
        if (res.customButton) {
          ImagePicker.launchCamera({
            mediaType: res.customButton,
            videoQuality: 'medium',
            //durationLimit: 60,
            quality: 1,
          }, (response) => {

            let source;
            source = { uri: response.uri };

            if (res.customButton != "image") {
              if (Platform.OS == 'ios') {
                if (JSON.stringify(source) != '{}') {
                  this.setState({
                    uriTo2Send: response.uri,
                    ImageSource2: source,
                    imageName2: 'video_ios_3',
                    type2: "video/mp4"
                  });
                }
              } else {
                if (JSON.stringify(source) != '{}') {
                this.setState({
                  uriTo2Send: response.uri,
                  ImageSource2: source,
                  imageName2: response.path,
                  type2: "video/mp4"
                });
              }
              }
            } else {
              //image 
              if (Platform.OS == 'ios') {
                if (JSON.stringify(source) != '{}') {
                  this.setState({
                    uriTo2Send: response.uri,
                    ImageSource2: source,
                    imageName2: response.fileSize + "",
                    type2: response.type
                  });
                }
              } else {
                if (JSON.stringify(source) != '{}') {
                this.setState({
                  uriTo2Send: response.uri,
                  ImageSource2: source,
                  imageName2: response.fileName,
                  type2: response.type
                });
              }
              }
            }
          });
        } else if (!res.didCancel) {
          console.log("responseon from gallery >> " + JSON.stringify(res))

          const source = { uri: 'data:image/jpeg;base64,' + res.data };
          console.log("source : " + JSON.stringify(source))
          console.log("URI >> " + res.uri)
          this.setState({
            uriTo2Send: res.uri,
            ImageSource2: source,
            imageName2: res.fileName,
            type2: res.type
          });
        }
      }
    })
  }

  componentWillMount() {
    this.props.auth.title = ''
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  renderButton() {
    return (
      <Button
        onPress={() => {

          if (this.props.auth.title.length <= 0) {
            this.setState({
              errorTitle: '* Please Enter title .'
            })
          } else if (this.props.auth.comments.length <= 0) {
            this.setState({
              errorComments: '* Please Enter comment.'
            })
          } else {

            title = this.props.auth.title
            comments = this.props.auth.comments
            uri1 = this.state.uriToSend
            type1 = this.state.type
            name1 = this.state.imageName

            uri2 = this.state.uriTo1Send,
              type2 = this.state.type1,
              name2 = this.state.imageName1

            uri3 = this.state.uriTo2Send,
              type3 = this.state.type2,
              name3 = this.state.imageName2

            userId = this.state.userId
            flatId = this.state.flatId

            //this.props.addComplaint_(title, comments,uri1,type1,name1)
            this.setState({
              loader: true
            })
            this.props.addComplaint_(title, comments, uri1, type1, name1, uri2, type2, name2, uri3, type3, name3, flatId, userId)

          }
        }}
      >{Add_Complaint}
      </Button>
    );
  }
  //call async data
  async _getUserStorageValue() {

    var value = await AsyncStorage.getItem('propertyDetails')
    var data = JSON.parse(value);

    var valueUser = await AsyncStorage.getItem('userDetail')
    var dataUser = JSON.parse(valueUser);

    if (dataUser != '' || dataUser != null) {
      this.setState({
        userId: dataUser.user_id,
        flatId: data.flat_id,

      })
    }
  }

  _handlePhotoView = () => {
    //all 3 views 
    if (this.state.ImageSource === null) {
      //only + View 1 
      return (
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          {this.state.ImageSource === null ?

            <View style={styles.imageStyle}>
              <Image
                source={require('../assets/Complaints/add_image_plus.png')}
                style={{ height: 30, width: 30, alignSelf: 'center' }} />
              <Text style={{
                fontSize: 14,
                alignSelf: 'center',
                color: grey_light

              }}>Image</Text>
            </View>
            :
            <Image style={styles.imageStyle}
              source={this.state.ImageSource} />
          }
        </TouchableOpacity>
      )
    } else if (this.state.ImageSource !== null && this.state.ImageSource1 === null) {
      //only 2 view : 1st and 2nd
      //SimpleToast.show("show 2 views::   "+ JSON.stringify(this.state.ImageSource))
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

            {this.state.ImageSource === null ?
              // <ImageBackground
              //   style={styles.imageStyle}
              //   value={'value'}>
              <View style={styles.imageStyle}>
                <Image
                  source={require('../assets/Complaints/add_image_plus.png')}
                  style={{ height: 30, width: 30, alignSelf: 'center' }} />
                <Text style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  // marginLeft: 20,
                  // paddingTop: 8,
                  color: grey_light
                }}>Image</Text>
              </View>
              // </ImageBackground>
              :
              <Image style={styles.imageStyle}
                source={this.state.ImageSource}
              />
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={this.selectPhoto2Tapped.bind(this)}>

            {this.state.ImageSource1 === null ?
              // <ImageBackground
              //   style={styles.imageStyle}
              //   value={'value'}>
              <View style={styles.imageStyle}>
                <Image
                  source={require('../assets/Complaints/add_image_plus.png')}
                  style={{ height: 30, width: 30, }} />
                <Text style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  // marginLeft: 20,
                  // paddingTop: 8,
                  color: grey_light
                }}>Image</Text>
              </View>
              // </ImageBackground>
              :
              <Image style={styles.imageStyle}
                source={this.state.ImageSource1}
              />
            }
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.ImageSource !== null && this.state.ImageSource1 !== null) {
      //only 3 view : 1st , 2nd , 3rd 
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            {
              this.state.ImageSource === null ?
                // <ImageBackground
                //   style={styles.imageStyle}
                //   value={'value'}>
                <View style={styles.imageStyle}>
                  <Image
                    source={require('../assets/Complaints/add_image_plus.png')}
                    style={{ height: 30, width: 30, }} />
                  <Text style={{
                    fontSize: 14,
                    alignSelf: 'center',
                    // marginLeft: 20,
                    // paddingTop: 8,
                    color: grey_light
                  }}>Image</Text>
                </View>
                // </ImageBackground>
                :
                <Image style={styles.imageStyle}
                  source={this.state.ImageSource}
                />
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={this.selectPhoto2Tapped.bind(this)}>

            {this.state.ImageSource === null ?
              // <ImageBackground
              //   style={styles.imageStyle}
              //   value={'value'}>
              <View style={styles.imageStyle}>
                <Image
                  source={require('../assets/Complaints/add_image_plus.png')}
                  style={{ height: 30, width: 30, }} />
                <Text style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  // marginLeft: 20,
                  // paddingTop: 8,
                  color: grey_light
                }}>Image</Text>
              </View>
              // </ImageBackground>
              :
              <Image style={styles.imageStyle}
                source={this.state.ImageSource1}
              />
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={this.selectPhoto3Tapped.bind(this)}>
            {this.state.ImageSource2 === null ?
              // <ImageBackground
              //   style={styles.imageStyle}
              //   value={'value'}>
              <View style={styles.imageStyle}>
                <Image
                  source={require('../assets/Complaints/add_image_plus.png')}
                  style={{ height: 30, width: 30, }} />
                <Text style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  // marginLeft: 20,
                  // paddingTop: 8,
                  color: grey_light
                }}>Image</Text>
              </View>
              // </ImageBackground>
              :
              <Image style={styles.imageStyle}
                source={this.state.ImageSource2}
              />
            }
          </TouchableOpacity>
        </View>
      )
    }
  }

  _handlePhotoViews1 = () => {
    return (
      this.setState({
        isView1Visible: false,
        isView2Visible: false
      })
    )
  }

  _handlePhotoViews2 = () => {
    this.setState({
      isView2Visible: true
    })
  }

  renderVerifyFileds() {
    if (this.state.loader) {
      return (
       <View style={{flexDirection:'column',alignContent:'center',height:'100%',width:'100%'}}>
            <ActivityIndicator
              style={{ marginTop: '55.55%' }}
              size="large" color={pink}
              animating />
            <Text style={{color: black,marginTop:15,alignSelf:'center',justifyContent:'center'}}>Please Wait While Uploading Data..</Text>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>

          <TitleInput
            titleChange={(text) => this.props.titleChanged(text)}
            value={this.props.auth.title} />

          <Text style={styles.errorStyle}>{this.state.errorTitle}</Text>

          <CommentsInput
            commentsChange={(text) => this.props.commentsChanged(text)}
            value={this.props.auth.comments} />

          <Text style={styles.errorStyle}>{this.state.errorComments}</Text>

          <View style={{ flexDirection: 'row' }}>
            {/* call image view  */}
            {this._handlePhotoView()}
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
            {this.renderButton()}
          </View>
        </View>
      );
    }
  }

  componentWillUnmount() {
    this.props.auth.title = ''
    this.props.auth.comments = ''

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    return true;
  }

  handleBackPress() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentDidMount() {
    this._getUserStorageValue()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={styles.containerStyle}>
          <View style={styles.card}>
            {this.renderVerifyFileds()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 20,
    paddingTop: 5,
    color: 'red'
  },
  textstyle: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 20,
    paddingTop: 8,
    color: grey_light
  },
  card: {
    backgroundColor: white_Original,
    width: '98%',
    height: '100%',
    display: 'flex',
    flex: 1,
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    elevation: 4,
    borderRadius: 3
  },
  containerStyle: {
    display: 'flex',
    flex: 1,
    padding: 12,
    backgroundColor: red_lighter
  },
  imageStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    margin: 5,
    padding: 10,
    marginTop: 14,
    borderColor: grey_lighter,
    borderRadius: 20,
    borderWidth: 2,
    height: 83,
    width: 83
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.addComplaint
  }
}
export default connect(mapStateToProps, { titleChanged, commentsChanged, addComplaint_ })(AddComplaintNew)