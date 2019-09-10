import React from 'react';
import { Text, View, Image } from "react-native";
import { Dialog } from 'react-native-simple-dialogs';
import { SInput } from "../SInput";

export function openAlertOK() {
    state = {
         isVisible: true
     }
    return (
        <Dialog
            visible={true}
            title="Custom Dialog"
            onTouchOutside={() => this.setState({ isVisible: true })} >
            <SInput isVisible={this.state.isVisible}
                value={"HIII"}
                label={"byeee"} />
        </Dialog>

    );
}


