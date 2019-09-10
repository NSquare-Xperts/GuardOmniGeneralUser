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
