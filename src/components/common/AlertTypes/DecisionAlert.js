import React, { Component } from 'react'
import {
  View,
  Text, Alert,
  TouchableWithoutFeedback
} from 'react-native'


const DecisionAlert = (props) => {
  return (
    Alert.alert(
      props.title,
      props.value,
      [
        {
          text: 'No', onPress: () =>
            console.log('Ask me later pressed')
        },
        {
          text: 'Yes', onPress: () => {
            console.log('Ask me later pressed')
          }
        }
      ],
      { cancelable: true }
    )
  );
};
export { DecisionAlert }
// class AlertModal_Yes_No extends Component {
//   state = {
//     visible: true
//   }
//   render() {
//     return (
//       <TouchableWithoutFeedback onPress={() => {
//         Alert.alert(
//           'Are you sure to submit Time Sheet?',
//           ' After click on YES timesheet will get submitted permanently further modifications can not be made. ',
//           [
//             {
//               text: 'No', onPress: () => console.log('Ask me later pressed')
//             },
//             {
//               text: 'Yes', onPress: () => {
//                 console.log('Ask me later pressed')

//               }
//             }
//           ],
//           { cancelable: true }
//         )
//       }
//       }>

//         <View style={{ width: '83.33%', height: 46, backgroundColor: '#5C8EFE', marginLeft: 30, marginTop: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 40, marginBottom: 10 }}>
//           <Text style={{ color: 'white' }}>Submit Time Sheet</Text>
//         </View>
//       </TouchableWithoutFeedback>
//     )
//   }
//}
