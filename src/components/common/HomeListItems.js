import React from 'react';
import { TouchableWithoutFeedback, Text, View, Image } from 'react-native';
import { red_lighter, white_Original, black } from './color'
import { Actions } from 'react-native-router-flux'
import ImageLoad from 'react-native-image-placeholder'

//make component 
const HomeListItems = (props) => {
  const { gridRowStyle, container, thumbnail, gridColStyle, textStyle, textBoldStyle } = styles;
 
  return (
    <TouchableWithoutFeedback onPress={() => Actions.PropertyDetails()}>
      <View style={container}>
        <View style={gridRowStyle}>

          {/* <Image style={thumbnail}
            source={require('../assets/Home/default_home_tile_icn.png')} /> */}

          <Image style={thumbnail}
            source={{ uri: props.image}} /> 
      
                {/* <ImageLoad
                  style={thumbnail}
                  loadingStyle={{ size: 'large', color: 'blue' }}
                  source={{ uri: props.image}} />  */}


          <View style={gridColStyle}>

            <Text style={textBoldStyle} >
              {props.site_name}</Text>

            <Text style={textStyle}>
              {props.flat_no}</Text>

            <Text style={textStyle}>
              {props.role_name}</Text>
          </View>

        </View>

        <Image
          style={styles.thumbnail_info}
          source={require('../assets/Home/information_icn.png')} />
        {/* <Image
          style={styles.thumbnail_info}
          source={{ uri: props.image }} /> */}

      </View>
    </TouchableWithoutFeedback>

  );
};


const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    borderRadius: 3,
    borderWidth: 0.1,
    //width: Dimensions.get('window').width,
    height: 130,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    elevation: 4,
  },
  thumbnail: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginLeft: 25,
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
    justifyContent: 'flex-start'
  },
  gridColStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'OpenSans-Regular',
    color: black,
    fontSize: 12,
    flexWrap: 'wrap',
    maxWidth: 200,
    numberOfLines: 1,
    alignSelf: 'flex-start',
    marginLeft: 15,
    flexShrink: 1,
    ellipsizeMode: 'tail'
  },
  textBoldStyle: {
    fontFamily: 'OpenSans-Bold',
    color: black,
    flexWrap: 'wrap',
    maxWidth: 200,
    numberOfLines: 1,
    alignSelf: 'flex-start',
    marginLeft: 15,
    flexShrink: 1,
    fontSize: 16,
    ellipsizeMode: 'tail'
  }
}

export default HomeListItems;
