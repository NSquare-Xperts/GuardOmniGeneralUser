
import React, { Component } from 'react';
import { TimePickerAndroid, StyleSheet, Text, TouchableWithoutFeedback,View } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';

export default class TimePicker extends Component {
    state = {
        isDateTimePickerVisible: false,
    };

    getInitialState() {
        // Text, Hour and *Minute are set by successCallback -- this updates the text with the time
        // picked by the user and makes it so the next time they open it the hour and minute they picked
        // before is displayed.
        return {
            isoFormatText: 'pick a time (24-hour format)',
            presetHour: 4,
            presetMinute: 4,
            presetText: 'pick a time, default: 4:04AM',
            simpleText: 'pick a time',
        };
    }

    async showPicker(stateKey, options) {
        try {
            const { action, minute, hour } = await TimePickerAndroid.open(options);
            var newState = {};
            if (action === TimePickerAndroid.timeSetAction) {
                newState[stateKey + 'Text'] = _formatTime(hour, minute);
                newState[stateKey + 'Hour'] = hour;
                newState[stateKey + 'Minute'] = minute;
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            }
            this.setState(newState);
        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback
                    onPress={this.showPicker.bind(this, 'isoFormat', {
                        hour: this.state.isoFormatHour,
                        minute: this.state.isoFormatMinute,
                        is24Hour: true,
                    })}>
                    <Text style={styles.text}>{this.state.isoFormatText}</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }

}

function _formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

var styles = StyleSheet.create({
    text: {
        color: 'black',
    },
});