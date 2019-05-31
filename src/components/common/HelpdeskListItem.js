import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { black, green } from './color';
import { Linking } from 'react-native'


const HelpdeskListItem = (props) => {
  const { gridRowStyle, textStyleTitle, textStyle } = styles;
  return (


    <View style={gridRowStyle}>
      <Text style={textStyle}>{props.help_desk_role}</Text>

      <TouchableWithoutFeedback onPress={() =>
        Linking.openURL(`tel:${props.help_desk_number}`)}>

        <Text style={textStyleTitle}>{props.help_desk_number}</Text>
      </TouchableWithoutFeedback>
    </View>

  );
};
const styles = {
  container: {
    backgroundColor: 'white',
    width: '95.55%',
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    justifyitems: 'center',
    elevation: 4,
    borderRadius: 2
  },
  gridRowStyle: {
    width: '95.55%',
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
    justifyContent: 'space-between'
  },
  textStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: black,
    alignSelf: 'flex-start',
    marginLeft: 15
  },
  textStyleTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: green,
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 2
  }
}

export default HelpdeskListItem;
