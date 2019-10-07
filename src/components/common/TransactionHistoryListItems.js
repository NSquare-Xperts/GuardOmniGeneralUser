import React from 'react';
import {Text, View, Image} from 'react-native';
import {  black } from './color';

//make component 
const TransactionHistoryListItems = (props) => {
    const {gridRowStyle,gridColStyle,textStyle} = styles;
    return(
      <View>
      <View style={gridRowStyle}>
        <View style={gridColStyle}>
          <Text style={textStyle}>{props.paidAmount} </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyleTime}> {'Transaction ID : ' +props.transactionId } </Text>
          </View>
        </View>
        <Text style={styles.textStyleTime}>{props.transactionDate}</Text>
      </View>
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
    marginLeft: 0,
    justifyitems: 'center',
    elevation: 4,
    borderRadius: 2
  },
  thumbnail: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginLeft: 0,
  },
  gridRowStyle: {
    width: '95.55%',
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
    justifyContent: 'space-between'
  },
  gridColStyle: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textStyle: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: black,
    alignSelf: 'flex-start',
  },
  textStylePopup: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: black,
    alignSelf: 'center',
  },
  textStyleBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    color: black,
    alignSelf: 'center',
  },
  textStyleTime: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: black,
    alignSelf: 'flex-start',
  },
  rightSideButtonStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  dialogTextTitle: {
    fontSize: 16,
    justifyContent: 'center',
    flexDirection: 'column',

  },
  thumbnail_popup: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  }
}
export default TransactionHistoryListItems;

