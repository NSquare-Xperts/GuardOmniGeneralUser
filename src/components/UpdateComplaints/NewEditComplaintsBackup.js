import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TouchableOpacity, PixelRatio, DeviceEventEmitter,ActivityIndicator, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Button from '../common/Button'
import { titleChanged, editCommentsChanged, editComplaint_ } from './EditComplaintActions'
import { white_Original, red_lighter, grey_lighter, grey_light, Add_Complaint, Save, pink } from '../common';
import TitleInput from './TitleInput'
import CommentsInput from './CommentsInput'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import { callPostApi } from '../Util/APIManager'
import Video from 'react-native-video'

class NewEditComplaints extends Component {

     state = {
          refreshing: true,
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

          opacity: 0,

          imageName: '',
          imageName1: '',
          imageName2: '',

          type: '',
          type1: '',
          type2: '',

          url1: '',
          url2: '',
          url3: '',

          isFile1: '0',
          isFile2: '0',
          isFile3: '0',

          complaintId: ''
     }

     selectPhotoTapped() {
          const options = {
               quality: 1.0,
               maxWidth: 500,
               maxHeight: 500,
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
               if (res.customButton) {
                    ImagePicker.launchCamera({
                         mediaType: res.customButton,
                         videoQuality: 'medium',
                         quality: 1,
                    }, (response) => {
                         let source;
                         source = { uri: response.uri };

                         if (res.customButton != "image") {
                              this.setState({
                                   uriToSend: response.uri,
                                   ImageSource: source,
                                   imageName: response.path,
                                   type: "video/mp4",
                                   isFile1: '1'
                              });
                         } else {
                              this.setState({
                                   uriToSend: response.uri,
                                   ImageSource: source,
                                   imageName2: response.fileName,
                                   type: response.type,
                                   isFile1: '1'
                              });
                         }
                    });
               } else {

                    console.log("responseon from gallery >> " + JSON.stringify(res))
                    const source = { uri: 'data:image/jpeg;base64,' + res.data };
                    console.log("source : " + JSON.stringify(source))
                    console.log("URI >> " + res.uri)
                    this.setState({
                         uriToSend: res.uri,
                         ImageSource: source,
                         imageName: res.fileName,
                         type: res.type,
                         isFile1: '1'
                    });
               }
          });

     }

     selectPhoto2Tapped() {
          const options = {
               quality: 1.0,
               maxWidth: 500,
               maxHeight: 500,
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
               if (res.customButton) {
                    ImagePicker.launchCamera({
                         mediaType: res.customButton,
                         videoQuality: 'medium',
                         quality: 1,
                    }, (response) => {

                         let source;
                         source = { uri: response.uri };

                         if (res.customButton != "image") {
                              this.setState({
                                   uriTo1Send: response.uri,
                                   ImageSource1: source,
                                   imageName1: response.path,
                                   type1: "video/mp4",
                                   isFile2: '1'
                              });
                         } else {
                              this.setState({
                                   uriTo1Send: response.uri,
                                   ImageSource1: source,
                                   imageName1: response.fileName,
                                   type2: response.type,
                                   isFile2: '1'
                              });
                         }
                    });
               } else {

                    console.log("responseon from gallery >> " + JSON.stringify(res))

                    const source = { uri: 'data:image/jpeg;base64,' + res.data };
                    console.log("source : " + JSON.stringify(source))
                    console.log("URI >> " + res.uri)
                    this.setState({
                         uriTo1Send: res.uri,
                         ImageSource1: source,
                         imageName1: res.fileName,
                         type1: res.type,
                         isFile2: '1'
                    });
               }
          });
     }

     selectPhoto3Tapped() {
          const options = {
               quality: 1.0,
               maxWidth: 500,
               maxHeight: 500,
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
               if (res.customButton) {
                    ImagePicker.launchCamera({
                         mediaType: res.customButton,
                         videoQuality: 'medium',
                         quality: 1,
                    }, (response) => {

                         let source;
                         source = { uri: response.uri };

                         if (res.customButton != "image") {
                              this.setState({
                                   uriTo2Send: response.uri,
                                   ImageSource2: source,
                                   imageName2: response.path,
                                   type2: "video/mp4",
                                   isFile3: '1'
                              });
                         } else {
                              this.setState({
                                   uriTo2Send: response.uri,
                                   ImageSource2: source,
                                   imageName2: response.fileName,
                                   type2: response.type,
                                   isFile3: '1'
                              });
                         }
                    });
               } else {

                    console.log("responseon from gallery >> " + JSON.stringify(res))

                    const source = { uri: 'data:image/jpeg;base64,' + res.data };
                    console.log("source : " + JSON.stringify(source))
                    console.log("URI >> " + res.uri)
                    this.setState({
                         uriTo2Send: res.uri,
                         ImageSource2: source,
                         imageName2: res.fileName,
                         type2: res.type,
                         isFile3: '1'
                    });
               }
          });
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

                              uri2 = this.state.uriTo1Send
                              type2 = this.state.type1
                              name2 = this.state.imageName1

                              uri3 = this.state.uriTo2Send
                              type3 = this.state.type2
                              name3 = this.state.imageName2

                              userId = this.state.userId
                              complaintId = this.state.complaintId

                              this.props.editComplaint_(title, comments, uri1, type1, name1, uri2, type2, name2, uri3, type3, name3, complaintId, this.state.isFile1, this.state.isFile2, this.state.isFile3, userId)
                         }
                    }}
               >{Save}
               </Button>
          );
     }
     //call async data
     renderUsersComplaints() {
          //pass complaintIs
          console.log("Complaint Edit: UserID:", this.state.userId, "Complaint ID: ", this.state.complaintId)

          callPostApi('http://guardomni.dutique.com:8000/api/complaintDetails?', {
               //"userId": this.state.userId,
               "userId": this.state.userId,
               "complaintId": this.state.complaintId
          })
               .then((response) => {
                    // Continue your code here...
                    res = JSON.parse(response)
                    console.log("data user COMPLAINTS : ", res.data[0], ",", res.data[0].complaint_title)
                    if (res.status == "200") {

                         this.props.auth.title = res.data[0].complaint_title
                         this.props.auth.comments = res.data[0].complaint_description

                         this.setState({
                              refreshing: false,
                              url1: res.data[0].complaint_image_1,
                              url2: res.data[0].complaint_image_2,
                              url3: res.data[0].complaint_image_3
                         })
                    } else {
                         this.setState({
                              refreshing: false
                         })
                    }
               });
     }

     async _getUserStorageValue() {

          var value = await AsyncStorage.getItem('propertyDetails')
          var data = JSON.parse(value);

          var valueUser = await AsyncStorage.getItem('userDetail')
          var dataUser = JSON.parse(valueUser);

          var complaintId = await AsyncStorage.getItem('complaintID')
          var dataComplaintID = JSON.parse(complaintId);
          console.log("***** complaintId", dataComplaintID)

          if (dataUser != '' || dataUser != null) {
               this.setState({
                    userId: dataUser.user_id,
                    complaintId: dataComplaintID
                    //flatId: data.flat_id,

               }, this.renderUsersComplaints())
          }
          this.renderUsersComplaints()
          // this.setState({ loadMore: true }, this.renderUsersList)
          //this.renderUsersList()
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
     //check url 3 first 
     _handlePhotoView = () => {
          //url3 if present : show all 3 url
          console.log("inside handlePhotoView")
          if (this.state.url3 != '') {
               return (                   
                    <View style={{ flexDirection: 'row' }}>
                         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                              {
                                   this.state.ImageSource === null ?
                                        <Image style={styles.imageStyle}
                                             source={{ uri: this.state.url1 }} />
                                        :
                                        <Image style={styles.imageStyle}
                                             source={this.state.ImageSource} />
                              }
                         </TouchableOpacity>

                         <TouchableOpacity onPress={this.selectPhoto2Tapped.bind(this)}>
                              {this.state.ImageSource1 === null ?
                                   <Image style={styles.imageStyle}
                                        source={{ uri: this.state.url2 }} />
                                   :
                                   <Image style={styles.imageStyle}
                                        source={this.state.ImageSource2}
                                   />
                              }
                         </TouchableOpacity>

                         <TouchableOpacity onPress={this.selectPhoto3Tapped.bind(this)}>
                              {this.state.ImageSource2 === null ?
                                   <Image style={styles.imageStyle}
                                        source={{ uri: this.state.url3 }} />
                                   :
                                   <Image style={styles.imageStyle}
                                        source={this.state.ImageSource2}
                                   />
                              }
                         </TouchableOpacity>
                    </View>
               )
          } else if (this.state.url2 != '') {
               console.log("inside url2 != empty"+this.state.ImageSource)
               console.log("inside url1 != empty"+this.state.url1) 
               console.log("inside url2 != empty"+this.state.url2) 
               return (
                    <View style={{ flexDirection: 'row' }}>
                         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                              {
                                   this.state.ImageSource === null ?
                                   this.state.url1.includes('mp4')?
                                   <View>
                                        <Video 
                                             style={styles.imageStyle}
                                             controls={false}
                                             source={{ uri: this.state.url1 }}
                                             ref={(ref) => {
                                                  this.player = ref
                                             }}
                                             onBuffer={this.onBuffer}
                                             onLoadStart={this.onLoadStart}
                                             onLoad={this.onLoad}
                                             onError={this.videoError}                       
                                          />
                                           <ActivityIndicator
                                                  animating
                                                  size="large"
                                                  color={grey_lighter}
                                                  style={[styles.activityIndicator, { opacity: this.state.opacity }]}/>
                                          </View>
                                        :                                        
                                        <Image style={styles.imageStyle}
                                             source={{ uri: this.state.url1 }} />
                                        :
                                       <View>
                                        <Image style={styles.imageStyle}
                                             source={this.state.ImageSource} />
                                       </View>
                              }
                         </TouchableOpacity>

                         <TouchableOpacity onPress={this.selectPhoto2Tapped.bind(this)}>
                              {
                                   this.state.ImageSource2 === null ?
                                   this.state.url2.includes('mp4')?
                                   <View>
                                        {console.log("*inclues-2*")}
                                        <Video 
                                             style={styles.imageStyle}
                                             controls={false}
                                             source={{ uri: this.state.url2 }}
                                             ref={(ref) => {
                                                  this.player = ref
                                             }}
                                             onBuffer={this.onBuffer}
                                             onLoadStart={this.onLoadStart}
                                             onLoad={this.onLoad}
                                             onError={this.videoError}                       
                                        />
                                      <ActivityIndicator
                                             animating
                                             size="large"
                                             color={grey_lighter}
                                             style={[styles.activityIndicator, { opacity: this.state.opacity }]}/>
                                     </View>
                                   :                                        
                                   <Image style={styles.imageStyle}
                                        source={{ uri: this.state.url2 }} />
                                   :
                                  <View>
                                   <Image style={styles.imageStyle}
                                        source={this.state.ImageSource2} />
                                  </View>
                              //      <Image style={styles.imageStyle}
                              //           source={{ uri: this.state.url2 }} />
                              //      :
                              //      <Image style={styles.imageStyle}
                              //           source={this.state.ImageSource2}
                              //      />
                               }
                         </TouchableOpacity>

                         < TouchableOpacity onPress={this.selectPhoto3Tapped.bind(this)}>
                              {this.state.ImageSource2 === null ?
                                   <ImageBackground
                                        style={styles.imageStyle}
                                        value={'value'}>
                                        <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                             <Image
                                                  source={require('../assets/Complaints/add_image_plus.png')}
                                                  style={{ height: 30, width: 30, }} />
                                             <Text style={styles.textStyle}>Image</Text>
                                        </View>
                                   </ImageBackground>
                                   :
                                   <Image style={styles.imageStyle}
                                        source={this.state.ImageSource2}/>
                              }
                         </TouchableOpacity>
                    </View>
               )
          } else if (this.state.url1 != '') {
               console.log("inside url1 != empty")
               return (
                    <View style={{ flexDirection: 'row' }}>
                         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                              {
                                   this.state.ImageSource === null ?
                                        <Image style={styles.imageStyle}
                                             source={{ uri: this.state.url1 }} />
                                        :
                                        <Image style={styles.imageStyle}
                                             source={this.state.ImageSource} />
                              }
                         </TouchableOpacity>

                         <TouchableOpacity onPress={this.selectPhoto2Tapped.bind(this)}>

                              {this.state.ImageSource1 === null ?
                                   <ImageBackground
                                        style={styles.imageStyle}
                                        value={'value'}>
                                        <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                             <Image
                                                  source={require('../assets/Complaints/add_image_plus.png')}
                                                  style={{ height: 30, width: 30, }} />
                                             <Text style={styles.textStyle}>Image</Text>
                                        </View>
                                   </ImageBackground>
                                   :
                                   <Image style={styles.imageStyle}
                                        source={this.state.ImageSource1}
                                   />
                              }
                         </TouchableOpacity>

                         {this.state.ImageSource1 != null ?
                              <TouchableOpacity onPress={this.selectPhoto3Tapped.bind(this)}>
                                   {this.state.ImageSource2 === null ?
                                        <ImageBackground
                                             style={styles.imageStyle}
                                             value={'value'}>
                                             <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                                  <Image
                                                       source={require('../assets/Complaints/add_image_plus.png')}
                                                       style={{ height: 30, width: 30, }} />
                                                  <Text style={styles.textStyle}>Image</Text>
                                             </View>
                                        </ImageBackground>
                                        :
                                        <Image style={styles.imageStyle}
                                             source={this.state.ImageSource2} />
                                   }

                              </TouchableOpacity>
                              :
                              null
                         }
                    </View>
               )
          }
     }

     _handlePhotoView_emptyURLs = () => {
          //all 3 views 
          if (this.state.ImageSource === null) {
               //only + View 1 
               return (
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                         {this.state.ImageSource === null ?
                              <ImageBackground
                                   style={styles.imageStyle}
                                   value={'value'}>
                                   <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                        <Image
                                             source={require('../assets/Complaints/add_image_plus.png')}
                                             style={{ height: 30, width: 30, }} />
                                        <Text style={styles.textStyle}>Image</Text>
                                   </View>
                              </ImageBackground>
                              :
                              <Image style={styles.imageStyle}
                                   source={this.state.ImageSource}
                              />
                         }
                    </TouchableOpacity>
               )
          } else if (this.state.ImageSource !== null && this.state.ImageSource1 === null) {
               //only 2 view : 1st and 2nd
               return (

                    <View style={{ flexDirection: 'row' }}>

                         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                              {this.state.ImageSource === null ?
                                   <ImageBackground
                                        style={styles.imageStyle}
                                        value={'value'}>
                                        <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                             <Image
                                                  source={require('../assets/Complaints/add_image_plus.png')}
                                                  style={{ height: 30, width: 30, }} />
                                             <Text style={styles.textStyle}>Image</Text>
                                        </View>
                                   </ImageBackground>
                                   :
                                   <Image style={styles.imageStyle}
                                        source={this.state.ImageSource}
                                   />
                              }
                         </TouchableOpacity>

                         <TouchableOpacity onPress={this.selectPhoto2Tapped.bind(this)}>

                              {this.state.ImageSource1 === null ?
                                   <ImageBackground
                                        style={styles.imageStyle}
                                        value={'value'}>
                                        <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                             <Image
                                                  source={require('../assets/Complaints/add_image_plus.png')}
                                                  style={{ height: 30, width: 30, }} />
                                             <Text style={styles.textStyle}>Image</Text>
                                        </View>
                                   </ImageBackground>
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
                    <View style={{ flexDirection: ' row' }}>
                         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                              {
                                   this.state.ImageSource === null ?
                                        <ImageBackground
                                             style={styles.imageStyle}
                                             value={'value'}>
                                             <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                                  <Image
                                                       source={require('../assets/Complaints/add_image_plus.png')}
                                                       style={{ height: 30, width: 30, }} />
                                                  <Text style={styles.textStyle}>Image</Text>
                                             </View>
                                        </ImageBackground>
                                        :
                                        <Image style={styles.imageStyle}
                                             source={this.state.ImageSource}
                                        />
                              }
                         </TouchableOpacity>

                         <TouchableOpacity onPress={this.selectPhoto2Tapped.bind(this)}>

                              {this.state.ImageSource === null ?
                                   <ImageBackground
                                        style={styles.imageStyle}
                                        value={'value'}>
                                        <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                             <Image
                                                  source={require('../assets/Complaints/add_image_plus.png')}
                                                  style={{ height: 30, width: 30, }} />
                                             <Text style={styles.textStyle}>Image</Text>
                                        </View>
                                   </ImageBackground>
                                   :
                                   <Image style={styles.imageStyle}
                                        source={this.state.ImageSource1}
                                   />
                              }
                         </TouchableOpacity>

                         <TouchableOpacity onPress={this.selectPhoto3Tapped.bind(this)}>
                              {this.state.ImageSource2 === null ?
                                   <ImageBackground
                                        style={styles.imageStyle}
                                        value={'value'}>
                                        <View style={{ alignSelf: 'center', flex: 1, margin: 5, padding: 10, marginTop: 14 }}>
                                             <Image
                                                  source={require('../assets/Complaints/add_image_plus.png')}

                                                  style={{ height: 30, width: 30, }} />
                                             <Text style={styles.textStyle}>Image</Text>
                                        </View>
                                   </ImageBackground>
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
          return (
               <View style={{ flex: 1 }}>

                    <TitleInput
                         titleChange={(text) => this.props.titleChanged(text)}
                         value={this.props.auth.title} />

                    <Text style={styles.errorStyle}>{this.state.errorTitle}</Text>

                    <CommentsInput
                         commentsChange={(text) => this.props.editCommentsChanged(text)}
                         value={this.props.auth.comments} />

                    <Text style={styles.errorStyle}>{this.state.errorComments}</Text>

                    <View style={{ flexDirection: 'row' }}>
                         {/* call image view  */}

                         {this.state.url1 == '' ?
                              this._handlePhotoView_emptyURLs()
                              :
                              this._handlePhotoView()
                         }
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
                         {this.renderButton()}
                    </View>

               </View>
          );
     }

     componentWillUnmount() {
          this.props.auth.title = ''
          this.props.auth.comments = ''
          //  AsyncStorage.removeItem('complaintID')
          //Actions.pop('Complaints');
          Actions.popTo('ComplaintDetail');
          //Actions.refresh()
          return true;
     }

     componentDidMount() {

          //this._getUserStorageValue()
          this._getUserStorageValue()
     }
     render() {
          return (
               <View style={styles.containerStyle}>
                    <View style={styles.card}>
                         {this.renderVerifyFileds()}
                    </View>
               </View>
          );
     }
}

//export default AddVisiorRequestNew;

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
          //justifyContent: 'center',
          alignSelf: 'center',
          flexDirection: 'column',
          /// marginLeft: 10,
          // marginRight: 10,
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
          width: 83,
          height: 83,
          borderRadius: 20,
          borderWidth: 2,
          marginTop: 15,
          marginLeft: 15,
          borderColor: grey_lighter,
     },
     activityIndicator: {
          position: 'absolute',
          marginTop:35,
          marginLeft: 10,
          justifyContent: 'center',
          alignSelf:'center',
          alignItems: 'center'
      }
}
const mapStateToProps = (state) => {
     return {
          auth: state.editComplaint
     }
}
export default connect(mapStateToProps, { titleChanged, editCommentsChanged, editComplaint_ })(NewEditComplaints)