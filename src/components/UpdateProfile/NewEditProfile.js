import React, { Component } from 'react'
import { red_lighter, grey_lighter, white_Original, red, Save } from '../common'
import { View, Image, Text, Platform, AsyncStorage, ImageBackground, TouchableOpacity } from 'react-native'
import UsernameInput from './UsernameInput'
import { connect } from 'react-redux'
import EmailInput from './EmailInput'
import { editProfile_ } from './EditActions'
//import { EDIT_PROFILE } from '../../actions/types'
import { nameChanged, emailChanged } from './EditActions'
import Button from '../common/Button'
import ImagePicker from 'react-native-image-picker'
import { callPostApi } from '../Util/APIManager'
import MobileInput from './MobileInput'
import ImageLoad from 'react-native-image-placeholder'


class NewEditProfile extends Component {
     state = {
          erroruserName: '',
          errorEmail: '',
          userId: '',
          flatId: '',
          countryCode: '',
          mobileNoWithOutCountryCode: '',
          mobileNo: '',
          uriToSend: '',
          imageName: '',
          type: '',

          userDetail: '',
          ImageSource: null,
          url: '',
          isFile: '0'
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
               })
               this.renderUsersList()
          }
     }

     componentDidMount() {
          this._getUserStorageValue()
     }

     renderUsersList() {

          console.log("user ID : "+this.state.userId)
          callPostApi('http://guardomni.dutique.com:8000/api/profileDetails?', {
               "userId": this.state.userId
          })
               .then((response) => {
                    // Continue your code here...
                    res = JSON.parse(response)
                    console.log("data user details : ", res.data[0])
                    if (res.status == 200) {

                         this.props.auth.username = res.data[0].user_name
                         this.props.auth.email = res.data[0].user_email_id

                         var countyCode = res.data[0].user_mobile.split('-')

                         this.props.auth.code = countyCode[0]
                         this.props.auth.phone = countyCode[1]

                         this.setState({
                              userDetail: res.data[0], refreshing: false,
                              url: res.data[0].user_profile_image,
                              // countryCode: res.data[0].countryCode,
                              countryCode: countyCode[0],
                              mobileNoWithOutCountryCode: countyCode[1],
                              mobileNo: res.data[0].user_mobile

                         })
                    } else {
                         this.setState({
                              refreshing: false,
                         })
                    }
               });
     }

     selectPhotoTapped() {
          const options = {
               quality: 1.0,
               maxWidth: 500,
               maxHeight: 500,
               storageOptions: {
                    skipBackup: true
               }
          };

          ImagePicker.showImagePicker(options, (response) => {
               console.log('Response = ', response);

               if (response.didCancel) {
                    console.log('User cancelled photo picker');
               }
               else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
               }
               else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
               }
               else {
                    let source = { uri: response.uri };
                    // You can also display the image using data:
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                    console.log("uri  :: ", source)
                    this.setState({
                         uriToSend: response.uri,
                         ImageSource: source,
                         imageName: response.fileName,
                         type: response.type,
                         isFile: '1'
                    });
               }
          });
     }
     _handlePhotoView = () => {
          console.log(" --url-- ", this.state.url)
          if (this.state.url != null && this.state.url != '' ) {
               return (
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                         {this.state.ImageSource === null ?

                              // <Image style={{ height: 95, width: 95, alignSelf: 'center', borderRadius: Platform.OS === 'ios' ? 95 / 2 : 60 }}
                              //      source={{ uri: this.state.url }} />

                              <ImageLoad
                                   borderRadius = {Platform.OS === 'ios' ? 95 / 2 : 60 }
                                   style={{ height: 95, width: 95, alignSelf: 'center', borderRadius: Platform.OS === 'ios' ? 95 / 2 : 60 }}
                                   loadingStyle={{ size: 'large', color: 'blue' }}
                                   source={{ uri: this.state.url }}
                              />

                              :

                              // <Image style={{ height: 95, width: 95, alignSelf: 'center', borderRadius: Platform.OS === 'ios' ? 95 / 2 : 60 }}
                              //      source={this.state.ImageSource} />
                              <ImageLoad
                                   borderRadius = {Platform.OS === 'ios' ? 95 / 2 : 60 }
                                   style={{ height: 95, width: 95, alignSelf: 'center', borderRadius: Platform.OS === 'ios' ? 95 / 2 : 60 }}
                                   loadingStyle={{ size: 'large', color: 'blue' }}
                                   source={this.state.ImageSource}
                              />
                         }
                    </TouchableOpacity>
               )
          } else {
               return (
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                         {this.state.ImageSource === null ?

                              <Image source={require('../assets/fullscreen.jpg')}
                                   style={{ height: 95, width: 95, alignSelf: 'center', borderRadius: Platform.OS === 'ios' ? 95 / 2 : 60 }} />
                              :

                              <Image style={{ height: 95, width: 95, alignSelf: 'center', borderRadius: Platform.OS === 'ios' ? 95 / 2 : 60 }}
                                   source={this.state.ImageSource}
                              />
                         }
                    </TouchableOpacity>
               )
          }
     }

     renderButton() {
          return (
               <Button
                    onPress={() => {

                         if (this.props.auth.username.length <= 0) {
                              this.setState({
                                   erroruserName: '* Please Enter Username .'
                              })
                              // } else if (this.props.auth.email.length <= 0) {
                              //      this.setState({
                              //           errorEmail: '* Please Enter Email.'
                              //      })
                         } else {
                              username = this.props.auth.username
                              email = this.props.auth.email
                              flatId = this.state.flatId
                              userId = this.state.userId

                              uri1 = this.state.uriToSend
                              type1 = this.state.type
                              name1 = this.state.imageName

                              mobileNo = this.state.mobileNo
                              //countryCode = '91'
                              //url = this.state.url

                              this.props.editProfile_(username, email, flatId, userId, uri1, type1, name1, mobileNo, this.state.isFile)
                         }
                    }}
               >{Save}
               </Button>
          );
     }

     renderVerifyFileds() {
          return (
               <View style={{ flex: 1 }}>

                    <View style={{ height: '20%', justifyContent: 'center' }}>
                         {/* <Image source={require('../assets/fullscreen.jpg')}
                                   style={{ height: 95, width: 95, alignSelf: 'center', borderRadius: Platform.OS === 'ios' ? 95 / 2 : 60 }} /> */}
                         
                         {this._handlePhotoView()}

                    </View>

                    <View style={styles.card}>

                         <UsernameInput
                              usernameChange={(text) => this.props.nameChanged(text)}
                              value={this.props.auth.username}></UsernameInput>

                         <Text style={styles.errorStyle}>{this.state.erroruserName}</Text>

                         <EmailInput
                              emailChange={(text) => this.props.emailChanged(text)}
                              value={this.props.auth.email}></EmailInput>

                         <Text style={styles.errorStyle}></Text>

                         <MobileInput
                              countryCode={this.state.countryCode}
                              mobileNo={this.state.mobileNoWithOutCountryCode} />

                         <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 }}>
                              {this.renderButton()}
                         </View>
                    </View>
               </View>
          )
     }

     render() {
          return (
               <View style={styles.containerStyle}>

                    {this.renderVerifyFileds()}

               </View>
          );

     }
}

const styles = {
     errorStyle: {
          fontSize: 14,
          alignSelf: 'flex-start',
          marginLeft: 20,
          paddingTop: 5,
          color: red

     },
     textstyle: {
          fontSize: 14,
          alignSelf: 'flex-start',
          marginLeft: 20,
          paddingTop: 8,
          color: grey_lighter
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
          width: 83,
          height: 83,
          borderRadius: 20,
          borderWidth: 2,
          marginTop: 15,
          marginLeft: 15,
          borderColor: grey_lighter,
     }
}

const mapStateToProps = (state) => {
     return {
          auth: state.editProfile
     }
}

export default connect(mapStateToProps, { nameChanged, emailChanged, editProfile_ })(NewEditProfile)
//export default NewEditProfile;