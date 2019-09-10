import React from 'react';
import { Text, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { white_Original } from './common';


const Confirm = ({  visible, onDecline, description }) => {
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
    <View style={{flex:1, justifyContent:'flex-end'}}>
      <View style={styles.containerStyle}>
          <View style={{flex:3, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 5}}>
            <Text style={styles.textStyle}> {description} </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 5}}>
                <TouchableWithoutFeedback onPress={onDecline}>
                   <Text style={styles.textButtonStyle}> DISMISS </Text> 
                </TouchableWithoutFeedback> 
          </View>
      </View>
      </View>
    </Modal>
  );
};

const styles = {
  containerStyle : {
    height: 56,
    width: '100%',
    backgroundColor: '#323232',
    position: 'absolute',
    flexDirection: 'row'
  },
  textButtonStyle: {
        color: '#FF7575'
  },

  textStyle: {
    fontSize: 12,
    color: white_Original
  }
};

export default Confirm;
