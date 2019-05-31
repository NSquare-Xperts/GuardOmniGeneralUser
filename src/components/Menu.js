import React, { Component } from 'react';
import { Text, View, Image, Alert, Platform, AsyncStorage } from 'react-native';
import { Content, List, ListItem, Drawer, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios' 
import { Dialog } from 'react-native-simple-dialogs';
import { SInput } from './common/SInput';
import { Home, SwitchProperty, Logout, AboutGuardOmni, Notifications, red_lighter, App_Name, App_Version, black } from './common';
import SimpleToast from 'react-native-simple-toast';

class Menu extends Component {
    state = {
        isVisible: true
    }
    renderDialog() {
        return (
            <Dialog
                visible={true}
                title="Custom Dialog"
                onTouchOutside={() => this.setState({ isVisible: false })} >
                <SInput isVisible={this.state.isVisible}
                    value={"HIII"}
                    label={"byeee"} />
            </Dialog>
        );
    }
    render() {
        return (
            <View style={styles.drawerStyle}>
                <View style={{ flex: 2 }}>
                    <Content>
                        <List>
                            <ListItem onPress={() =>
                                 {Actions.drawerClose(),
                                Actions.homepage()}}
                                //Actions.reset('homepage')}
                                noBorder={true}>
                                <Image style={styles.thumbnail}
                                    source={require('./assets/Drawer/home_icn.png')} />
                                <Text style={styles.drawerText}>{Home}</Text>
                            </ListItem>

                            <ListItem onPress={() => 
                           { Actions.drawerClose(), Actions.SwitchProperty()}
                        }
                                noBorder={true}>

                                <Image style={styles.thumbnail}
                                    source={require('./assets/Drawer/switch_icn.png')} />
                                <Text style={styles.drawerText}>{SwitchProperty}</Text>
                            </ListItem>

                            <ListItem onPress={() => 
                            { Actions.drawerClose(),Actions.notification()}
                            }
                                noBorder={true}>
                                <Image style={styles.thumbnail}
                                    source={require('./assets/Drawer/dnotification_icn.png')} />
                                <Text style={styles.drawerText}>{Notifications}</Text>
                            </ListItem>

                            <ListItem onPress={() => { Actions.drawerClose(),Actions.Aboutus()}}
                                noBorder={true} >
                                <Image style={styles.thumbnail}
                                    source={require('./assets/Drawer/dinformation_icn.png')} />
                                <Text style={styles.drawerText}>{AboutGuardOmni}</Text>
                            </ListItem>

                            {/* logout alert */}
                            <ListItem onPress={() => {
                                Alert.alert(
                                    'Logout ?',
                                    'You will no longer access to GuardOmni',
                                    [
                                        {
                                            text: 'No', onPress: () =>
                                                {console.log('Cancel Pressed'),
                                                Actions.drawerClose()}
                                        },
                                        {
                                            text: 'Yes', onPress: () => {
                                                //clear session data 
                                                //Actions.reset('Login')
                                                



                                                AsyncStorage.multiGet(["LoginData"]).then((data) => {
                                                    LoginData = data[0][1];
                                                    var res = JSON.parse(LoginData)

                                                axios.post('http://guardomni.dutique.com:8000/api/logoutUser',
                                                {
                                                    "userId": res.data[0].user_details.user_id
                                                })
                                                .then((response) => {
                                    
                                                       console.log("response: "+response)
                                                })
                                                .catch(error => {
                                                    console.log("error : ", error.response.message)
                                                });
                                              
                                                AsyncStorage.removeItem('propertyDetails');
                                                AsyncStorage.removeItem('userDetail');
                                                AsyncStorage.removeItem('LoginData');
                                                SimpleToast.show("Logout successfully")
                                                Actions.reset('Login')
                                            });
                                            }

                                        }
                                    ],
                                    { cancelable: true }
                                )
                            }}
                                noBorder={true}>
                                <Image style={styles.thumbnail}
                                    source={require('./assets/Drawer/logout_icn.png')} />
                                <Text style={styles.drawerText}>{Logout}</Text>
                            </ListItem>
                        </List>
                    </Content>

                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', height: 83, position: 'absolute', bottom: 0, justifyContent: 'flex-start', backgroundColor: red_lighter }}>
                        <Image style={styles.thumbnailIcon}
                            source={require('./assets/Drawer/guard_drawer.png')} />

                        <Text style={styles.drawerAppText}>{App_Name}</Text>
                        <Text style={styles.drawerAppVersionText}>{App_Version}</Text>

                    </View>

                </View>
            </View >
        );
    }
}
export default Menu;

const styles = {
    thumbnail: {
        height: 25,
        width: 25,
    },
    thumbnailIcon: {
        height: 35,
        width: 35,
        marginLeft: 10
    },
    drawerText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        color: 'black',
        marginLeft: 15
    },
    drawerSelectedText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 15
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        color: "#000066"
    },
    welcomePress: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        color: "#ffffff"
    },
    button: {
        borderColor: "#000066",
        borderWidth: 1,
        borderRadius: 10
    },
    buttonPress: {
        borderColor: "#000066",
        backgroundColor: "#000066",
        borderWidth: 1,
        borderRadius: 10
    },
    drawerAppText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        color: black,
        marginLeft: 7
    },
    drawerAppVersionText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 12,
        color: black,
        marginLeft: 7,
        alignSelf: 'center'
    },
    drawerStyle: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 30 : 15

    }

}



{/* <TouchableHighlight 
                        // onPress= {Actions.drawerItemOne()}
                        // style={
                        //         this.state.pressStatus
                        //             ? styles.buttonPress
                        //             : styles.button
                        //     }
                        //     onHideUnderlay={this._onHideUnderlay.bind(this)}
                        //     onShowUnderlay={this._onShowUnderlay.bind(this)}>
                        >
                        <ListItem>
                                <Image style={styles.thumbnail}
                                            source={require('./assets/fullscreen.jpg')}/>  
                                    
                                <Text   style={
                                        this.state.pressStatus
                                        ? styles.welcomePress
                                        : styles.welcome }> Item 1 </Text> 
                        </ListItem>
                  </TouchableHighlight> */}

{/* <ListItem onPress={() =>Actions.drawerItemOne()}>
                      <Image style={styles.thumbnail}
                               source={require('./assets/fullscreen.jpg')}/>  
                      <Text style={styles.drawerText}>Item 1 </Text> 
                </ListItem>  */}


    // constructor(props) {
    //     super(props);
    //     this.state = { pressStatus: false };
    // }

    // _onHideUnderlay() {
    //     this.setState({ pressStatus: false });
    // }
    // _onShowUnderlay() {
    //     this.setState({ pressStatus: true });
    // }
