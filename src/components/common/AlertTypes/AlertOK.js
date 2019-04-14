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


// export default class AlertOK extends React.Component {
//     state = {
//         isVisible: true
//     }
//     renderResults = () => {
//         this.setState({
//             isVisible: !this.state.isVisible
//         })
//     }
//     renderDialog() {
//         return (
//             <Dialog
//                 visible={true}
//                 title="Custom Dialog"
//                 onTouchOutside={() => this.setState({ isVisible: false })} >
//                 <SInput isVisible={this.state.isVisible}
//                     value={"HIII"}
//                     label={"byeee"} />
//             </Dialog>
//         );
//     }
//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 {this.state.isVisible ? this.renderDialog() : null}

//                 {this.renderResults}
//                 {/* <Button onPress={this.renderResults}
//                     title="Search!"
//                     color="#841584" >BUtton</Button> */}
//             </View>

//             //     <View style={{flex: 1}}>

//             //       <TouchableWithoutFeedback onPress= {this.renderDialog()}>
//             //         <Button>HIIIIIIIIIIIIII</Button>   

//             //         </TouchableWithoutFeedback> 

//             //     </View >

//             //   //  this.renderDialog()

//         );
//     }
// }