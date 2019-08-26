import React from 'react';
import { Text, View } from 'react-native';
import { black } from './color';

const HistoryListItem = (props) => {

  const { gridRowStyle,gridColStyle, textStyle, textStyleDate } = styles;
  return (
      <View>
        <View style={gridRowStyle}>
          <View style={gridColStyle}>
            <Text
              style={textStyle}>$10000</Text>
            <Text
              style={textStyleDate}>Transaction ID : 1234567876</Text>
          </View>

          <View style={styles.rightSideButtonStyles}>
          <Text
              style={textStyle}>27-09-2019</Text>
          </View>
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
    justifyContent: 'space-between'
  },
  gridColStyle: {
    width: '85%',
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
    marginLeft: 15,
    marginTop: 2
  },
  rightSideButtonStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignSelf: 'flex-start'
  }

}

export default HistoryListItem;
