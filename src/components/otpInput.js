import React, { Component } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import timer from 'react-native-timer';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { Enter_Otp, Resend } from './common';
import { black, grey_lighter, white_Original } from './common/color'
import TimerCountdown from "react-native-timer-countdown";

class OtpInput extends Component {
        state = {
            resend: true,
            time: '1'
        };

    changeState() {
        this.setState({
            resend: true,
            time: '2'
        })

    }

    renderResend() {
        console.log("resend : ", this.state.resend)
        if (this.state.resend) {
            return (
                <TouchableWithoutFeedback onPress={() => {
                  //  if(this.state.time == '2'){
                    this.setState({
                        resend:false
                    })
               // }
                    this.props.loginUser(this.props.auth.code + "-" + this.props.auth.phone)
                }}>
                    <View>
                        <Text style={{ color: black, fontFamily: 'OpenSans.ttf', paddingTop: 8, marginTop: 7, paddingLeft: 4, justifyContent: 'flex-end', alignSelf: 'center' }}>Resend?</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <TimerCountdown
                        initialMilliseconds={3000 * 60}
                        onTick={(milliseconds) => console.log("tick", milliseconds)}
                        formatMilliseconds={(milliseconds) => {
                            const remainingSec = Math.round(milliseconds / 1000);
                            const seconds = parseInt((remainingSec % 60).toString(), 10);
                            const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
                            const hours = parseInt((remainingSec / 3600).toString(), 10);
                            const s = seconds < 10 ? '0' + seconds : seconds;
                            const m = minutes < 10 ? '0' + minutes : minutes;
                            let h = hours < 10 ? '0' + hours : hours;
                            h = h === '00' ? '' : h + ':';
                            
                            return h + m + ':' + s;
                        }}
                        onExpire={() => this.changeState()}
                        allowFontScaling={true}
                        style={{ marginLeft: 5, color: white_Original, fontFamily: 'OpenSans.ttf', fontSize: 14 }}
                    />
                </View>
            )

        }
    }
    render() {
        return (
            <View style={{ ...styles.displayStyle, marginTop: 10 }}>
                <View style={styles.containerStyle}>

                    <TextInput
                        placeholder={Enter_Otp}
                        style={{ height: 50, width: '70%', marginLeft: 23, justifyContent: 'center' }}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={this.props.otpChange}
                        value={this.props.value}
                        maxLength={6}
                        keyboardType='numeric' />
                    {this.renderResend()}
                </View>
            </View>
        );
    }
};

const styles = {
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    containerStyle: {
        height: 50,
        width: '91%',
        flexDirection: 'row',
        borderRadius: 30,
        shadowRadius: 4,
        borderColor: grey_lighter,
        borderWidth: 1
    },
    displayStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { loginUser })(OtpInput);