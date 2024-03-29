import React, { Component } from 'react'
import { BackHandler, Platform, StatusBar, Image, AsyncStorage } from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'
import SplashScreen from './components/SplashScreen'
import SwiperFlatList_, { width } from './components/SwiperFlatList_'
import Login from './components/Login'
import Menu from './components/Menu'
import Homepage from './components/Homepage'
import DrawerItemOne from './components/DrawerItemOne'
import CountryCode from './components/CountryCode'
import CountryCodeVisitorRequest from './components/CountryCodeVisitorRequest'
import Visitors from './components/Visitors'
import AlbumList from './components/AlbumList'
import { Icon } from 'native-base'
import RequestList from './components/RequestList'
import FlatListForVisitors from './components/FlatListForVisitors'
import FlatListForVisitorsHistory from './components/FlatListForVisitorsHistory'
import Camera from './components/Camera'
import AddVisitorRequest from './components/AddVisitorRequest'
import EditProfile from './components/EditProfile'
import AddComplaint from './components/AddComplaint'
import PropertyDetails from './components/PropertyDetails'
import Complaints from './components/Complaints'
import Notices from './components/Notices'
import Helpdesk from './components/Helpdesk'
import ComplaintDetail from './components/ComplaintDetail'
import OptionsMenu from 'react-native-options-menu'
import Notifications from './components/Notifications'
import MyId from './components/MyId'
import AlertOK from './components/common/AlertTypes/AlertOK'
import SwitchProperty from './components/SwitchProperty'
import NoticeDetail from './components/NoticeDetail'
import GuardHomepage from './components/GuardHomePage'
import GuardScanQR from './components/GuardScanQR'
import GuardPropertyDetails from './components/GuardPropertyDetails'
import GuardAddVisitorRequest from './components/GuardAddVisitorRequest'
import ReportedInOutDetails from './components/ReportedInOutDetails'
import GuardManualOut from './components/GuardManualOut'
import GuardAdvancedSearch0 from './components/GuardAdvancedSearch0'
import GuardDetails from './components/GuardDetails'
import GuardManualOut1 from './components/GuardManualOut1'
import Notification from './components/common/Notification'
import OptionMenu from './components/common/OptionMenu'
import OptionMenuDelete from './components/common/OptionMenuDelete'
import PaginationLoadMore from './components/PaginationLoadMore'
import AddVisiorRequest from './components/AddVisitorRequest'
import AddVisiorRequestNew from './components/VisitorRequest/AddVisitorRequestNew'
import DateTimePickerTester from './components/DateTimePickerTester'
import AddComplaintNew from './components/AddComplaints/AddComplaintNew'
import otpInputTimer from './components/otpInputTimer'
import SplashScreenNoLogin from './components/SplashScreenNoLogin'
import Aboutus from './components/Aboutus'

import NewEditProfile from './components/UpdateProfile/NewEditProfile';
import NewEditComplaints from './components/UpdateComplaints/NewEditComplaints';
import NewEditVisitorRequest from './components/UpdateVisitorRequest/NewEditVisitorRequest';
import CountrycodeEditVR from './components/CountryCodeEditVR'
import TimePicker from './components/TimePicker'

const MoreIcon = require('./components/assets/Complaints/more_options.png');
// import { Right } from 'native-base';
class RouterComponent extends Component {

    componentDidMount() {
        console.log("...componentWillMount...")
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (Actions.currentScene == 'Login') {
                //Actions.refresh({ key: Math.random() })
                BackHandler.exitApp()
            }
            else if (Actions.currentScene == 'splash') {
                BackHandler.exitApp()
            } else if (Actions.currentScene == '_homepage') {
                BackHandler.exitApp()
            }

            return true;
        });

        AsyncStorage.multiGet(['LoginData']).then((data) => {
            LoginData = data[0][1];
            this.setState({
                Login: LoginData
            })
            //console.log("...check logindata ...", LoginData);
            if (LoginData == null) {
                //Actions.splash()
                Actions.reset('splash')
            } else {
                //console.log("...login...", LoginData);
                //Actions.homepage()
                Actions.reset('drawer')
            }
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener()
    }

    render() {
        // const headerStyle = {
        //     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        //     height: 56 + Platform.select({ 'android': StatusBar.currentHeight, 'ios': 110 }),
        // }

        return (
            <Router>
                <Scene key="root">

                    {/* <Scene title="splash" key="flat" component={FlatListSample}  /> */}
                    <Scene title="Splash" key="splashome" component={SplashScreenNoLogin} left={() => null} hideNavBar />

                    <Scene title="Login" key="Login" component={Login} hideNavBar />

                    <Scene title="Splash" key="splash" component={SplashScreen} left={() => null} hideNavBar />

                    <Scene title="ViewPager" key="viewPager" component={SwiperFlatList_} />

                    <Scene title="Edit Profile" key="edit" component={NewEditProfile} />
                    <Scene title="Edit Complaint" key="newedit" component={NewEditComplaints} />

                    <Scene title="dateTime" key="dateTime" component={DateTimePickerTester} />

                    {/* <Scene title="Login" key="NewLogin" component={NewLogin} hideNavBar /> */}

                    <Scene title="Select Country Code" key="countrycode" component={CountryCode}
                        leftButtonIconStyle={{ height: 24, width: 24 }}
                        leftButtonStyle={{ marginLeft: 16 }} />

                    <Scene title="Select Country Code" key="countrycodeEditVR" component={CountrycodeEditVR}
                        leftButtonIconStyle={{ height: 24, width: 24 }}
                        leftButtonStyle={{ marginLeft: 16 }} />


                    <Scene title="Select Country Code" key="countrycodeVR" component={CountryCodeVisitorRequest}
                        leftButtonIconStyle={{ height: 24, width: 24 }}
                        leftButtonStyle={{ marginLeft: 16 }} />

                    <Scene title="Visitors" key="visitors" component={Visitors} />
                    <Scene title="Add Visitor" key="visitorRequest1" component={AddVisiorRequestNew} />
                    <Scene title="Add Visitor" key="visitorRequest" component={AddVisiorRequest} />

                    <Scene title="Profile Details" key="profileDetails" component={EditProfile} />
                    <Scene title="Property Details" key="PropertyDetails" component={PropertyDetails} />
                    <Scene title="Complaints" key="Complaints" component={Complaints} />
                    <Scene title="Helpdesk" key="Helpdesk" component={Helpdesk} />
                    <Scene title="Complaint Detail" key="ComplaintDetail" component={ComplaintDetail} renderRightButton={OptionMenu} />
                    <Scene title="Complaint Detail" key="ComplaintDetailDelete" component={ComplaintDetail} renderRightButton={OptionMenuDelete} />
                    
                    <Scene title="Notifications" key="Notifications" component={Notifications} />

                    <Scene title="Homepage" key="GuardHomepage" component={GuardHomepage} />
                    <Scene title="Time" key="Guar" component={TimePicker} />

                    <Scene title="Manual Out" key="ManualOut" component={GuardManualOut1} />

                    <Scene title="OTP" key="OTP" component={otpInputTimer} />

                    <Scene title="Add Complaint" key="AddComplaint" component={AddComplaint} />
                    <Scene title="Add Complaint" key="AddComplaintNew" component={AddComplaintNew} />

                    <Scene title="Add Visitor Request" key="addVisitorRequest" component={GuardAddVisitorRequest} />

                    <Scene title="Edit Visitor Request" key="editVR" component={NewEditVisitorRequest} />

                    <Scene title="AlbumList" key="AlbumList" component={AlbumList} />
                    <Scene title="OUT" key="GuardManualOut" component={GuardManualOut} />

                    <Scene title="My ID" key="MyId" component={MyId} />

                    {/* <Scene title="Modal" key="modal" component={AlertOK} initial /> */}

                    <Scene title="Notices" key="Notices" component={Notices} />

                    {/* <Scene title="Switch Property" key="SwitchProperty" component={SwitchProperty}/> */}
                    <Scene title="Details" key="GuardDetails" component={GuardDetails} />

                    <Scene title="Notice Detail" key="NoticeDetail" component={NoticeDetail} />

                    <Scene title="Scan QR" key="GuardScanQR" component={GuardScanQR} />
                    <Scene title="Advanced Search" key="GuardAdvancedSearch0" component={GuardAdvancedSearch0} />

                    <Scene title="Property Details" key="GuardPropertyDetails" component={GuardPropertyDetails} />
                    <Scene title="Details" key="ReportedInOutDetails" component={ReportedInOutDetails} />

                    <Scene title="RequestList" key="RequestList" component={RequestList} />
                    <Scene title="FlatListForVisitors" key="flatListForVisitors" component={FlatListForVisitors} />
                    <Scene title="FlatListForVisitorsHistory" key="flatListForVisitorsHistory" component={FlatListForVisitorsHistory} />

                    <Scene title="LoadMore" key="Hii" component={PaginationLoadMore} />

                    <Scene title="Camera" key="camera" component={Camera} />

                    {/* <Scene title="SwitchProperty" key="SwitchProperty" component={SwitchProperty}  /> */}

                    <Scene
                        key="drawer"
                        drawer={true}
                        drawerPosition={'left'}
                        renderRightButton={Notification}
                        rightButtonImage={require('./components/assets/guard/home/notification_icn.png')}
                        drawerIcon={<Icon name='menu' size={30} style={{ height: 30, width: 30, alignSelf: 'center' }} />}
                        contentComponent={Menu}
                        drawerWidth={260}
                        Scene={Homepage}
                        hideNavBar>

                        <Scene title="GuardOmni" key="homepage" component={Homepage} />
                        <Scene title="Notifications" key="notification" component={Notifications} />
                        <Scene title="Switch Property" key="SwitchProperty" component={SwitchProperty} />
                        <Scene title="About Us" key="Aboutus" component={Aboutus} />

                    </Scene>
                </Scene>
            </Router>
        );
    }
}
export default RouterComponent;

