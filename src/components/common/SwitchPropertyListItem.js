import React from 'react'
import { TouchableWithoutFeedback, Text, AsyncStorage, View, Image } from 'react-native'
import { white_Original, black } from './color'
import { Actions } from 'react-native-router-flux'
import ImageLoad from 'react-native-image-placeholder'

const SwitchPropertyListItem = (props) => {
  const { gridRowStyle, container, thumbnail, gridColStyle, textStyle, textBoldStyle } = styles;
  return (


    <TouchableWithoutFeedback onPress={() => {
      props.sendData(props.propertyId)
    }}>
      <View style={container}>
        <View style={gridRowStyle}>

          {/* <Image style={thumbnail}
            source={{uri : props.site_image}} /> */}

          <ImageLoad
            style={thumbnail}
            loadingStyle={{ size: 'large', color: 'blue' }}
            source={{ uri: props.site_image }}
          />

          {/* <Image style={thumbnail}
            source={require('../assets/Home/sample_property_icn.png')} /> */}

          <View style={gridColStyle}>

            <Text style={textBoldStyle} >
              {props.site_name}</Text>

            <Text style={textStyle}>
              {props.flat_no}</Text>

            <Text style={textStyle}>{props.role_name}</Text>
          </View>

        </View>

        <Image
          style={styles.thumbnail_info}
          source={require('../assets/Common/switch_property_navigate.png')} />

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
    height: 130,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    elevation: 4,
  },
  thumbnail: {
    height: '100%',
    width: 100,
    alignSelf: 'center',
    marginLeft: 0,
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

    fontFamily: 'OpenSans',
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

export default SwitchPropertyListItem;
