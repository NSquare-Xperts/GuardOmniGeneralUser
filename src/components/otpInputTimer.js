import React, { Component } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import TimerCountdown from "react-native-timer-countdown";

class SplashScreen extends Component {

    state = {
        //need to clicked resend  
        resend: true
    }

    changeState() {

        this.setState({
            resend: true
        })

    }

    _calllTimer() {
        console.log("resend : ",this.state.resend)
        if (this.state.resend) {
            return (
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => {
                        //this.callTimer()
                        this.setState({
                            resend: false
                        })
                    }}>
                        <Text>RESEND</Text>
                    </TouchableWithoutFeedback>

                </View>
            )

        } else {
            return (
                <View style={styles.container} >
                    <TimerCountdown
                        initialMilliseconds={1000 * 60}
                        onTick={(milliseconds) => console.log("tick", milliseconds)}
                        onExpire={() => console.log("complete")}
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
                        style={{ fontSize: 20 }}
                    />
                </View>
            )

        }
    }


    render() {
        return (
            <View style={styles.container}>

                {this._calllTimer()}

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default SplashScreen;