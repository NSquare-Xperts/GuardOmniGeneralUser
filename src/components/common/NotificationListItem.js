import React from 'react'
import { Text, View, TouchableWithoutFeedback,AsyncStorage } from 'react-native'
import { black, white_Original } from './color'
import Swipeout from 'react-native-swipeout'

//make component 
const NotificationListItem = (props) => {
  const { gridRowStyle, textStyleTitle, gridColStyle, textStyle, textStyleDate } = styles;
  let right = [{ text: 'delete', type: 'delete' }];
  let swipeBtns = [{
    text: 'Delete',
    backgroundColor: 'red',
    //underlayColor: 'rgba(0, 0, 1, 0.6)',
    underlayColor: 'pink',
    onPress: (index) => {
      props.dataDelete(props.objNotification)}
        // AsyncStorage.multiGet(['LoginData']).then((data) => {
        //     LoginData = data[0][1];
        //     var LoginObj = JSON.parse(LoginData)
        //     this.deleteNote(props.id, index)
        // })
    
  }];
  return (
    <View>

      <Swipeout
        // close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
        // left={}
        key={props}
        right={swipeBtns}
        backgroundColor={white_Original}
      // rowID={props.id}
      //sectionID={sectionID}
      //  autoClose={props.autoClose}
      //  backgroundColor={props.backgroundColor}
      // onOpen={(sectionID, rowID) => {
      //   this.setState({
      //     sectionID,
      //     rowID,
      //   })
      // }}
      // onClose={() => console.log('===close')}
      // scroll={event => console.log('scroll event')
      >
        <TouchableWithoutFeedback onPress={() => props.sendData(props.objNotification)}>
        <View style={gridRowStyle}>
          <View style={gridColStyle}>
            <Text style={textStyle}>{props.title}</Text>
            <Text style={textStyleTitle}>{props.description} </Text>
          </View>
        </View>
        {/* </Swipeout> */}
        </TouchableWithoutFeedback>

      </Swipeout>
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
  thumbnail: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginLeft: 25,
  },
  thumbnail_arrow: {
    height: 18,
    width: 18,
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-start'
  },
  gridRowStyle: {
    width: '95.55%',
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  gridColStyle: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textStyle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: black,
    alignSelf: 'flex-start',
    marginLeft: 15
  },
  textStyleDate: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: black,
    alignSelf: 'flex-start',
    marginLeft: 1,
    marginTop: 2
  },
  textStyleTitle: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: black,
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 2
  },
  rightSideButtonStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    marginRight: 10
  }

}
export default NotificationListItem;
