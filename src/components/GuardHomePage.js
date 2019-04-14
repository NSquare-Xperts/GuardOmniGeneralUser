import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import HomeListItems from './common/HomeListItems';
import {red_lighter} from './common/color'
import PropertyDetails from './PropertyDetails';
import HomePropertyDetailItem from './common/HomePropertyDetailItem';
import GuardAdvancedSearch from './common/GuardAdvancedSearch';
import GuardPunchIn from './common/GuardPunchIn';

class GuardHomepage extends Component {
  render(){
    return(
    <View style={{ display: 'flex', flex: 1,justifyContent: 'flex-start', backgroundColor: {red_lighter}}}>
        <HomePropertyDetailItem/>
        <GuardAdvancedSearch />
        <GuardPunchIn/>
        <GuardPunchIn/>
    </View>);
  }
}
export default GuardHomepage;
const styles = {

  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: 170,
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight:8,
    marginTop: 10,
    elevation: 4,
     

  },
  headerContentStyle: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center'
  }, 
  thumbnail: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginLeft:25,
  },
  thumbnail_info: {
    height: 30,
    width: 30,
    marginRight: 20,
    marginBottom: 20,
    alignSelf: 'flex-end'
  },
 
  gridRowStyle: {
     flexDirection: 'row', 
  },
  gridColStyle: {
    flexDirection: 'column', 
 },
  card: {
    backgroundColor: 'white',
    width: (Dimensions.get('window').width / 2) - 15,
    height: 200,
    marginLeft: 8,
    marginRight:3,
    marginTop: 10,
    elevation: 4
  },
  textStyle: {
      fontSize: 14,
      color: 'black',
      alignItems: 'center',
      alignSelf: 'center'
  }
}