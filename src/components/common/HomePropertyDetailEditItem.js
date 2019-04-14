import React from 'react';
import { TouchableWithoutFeedback, Text, View, Image } from 'react-native';
import { white_Original, black } from './color'
import { Actions } from 'react-native-router-flux'
import ImageLoad from 'react-native-image-placeholder'

//make component 
const HomePropertyDetailEditItem = (props) => {
  const { gridRowStyle, container, thumbnail, gridColStyle, textStyle, textBoldStyle } = styles;
  console.log("img ** ", props.image)
  return (
    <TouchableWithoutFeedback onPress={() => Actions.edit()}>
      {/* </TouchableWithoutFeedback><TouchableWithoutFeedback onPress={()=> Actions.GuardPropertyDetails()}> */}
      <View style={container}>
        <View style={gridRowStyle}>

          {/* <Image style={thumbnail}
            source={ {uri: props.image}} /> */}

          <ImageLoad
            style={thumbnail}
            loadingStyle={{ size: 'large', color: 'blue' }}
            source={{ uri: props.image }}
          />

          <View style={gridColStyle}>

            <Text style={textBoldStyle}>
              {props.name}</Text>

            <Text style={textStyle}>
              {props.flat_no}</Text>

            <Text
              style={textStyle}>
              {props.type}</Text>
          </View>
        </View>

        <Image
          style={styles.thumbnail_info}
          // source={require('../assets/Home/edit_icn.png')}/>
          source={require('../assets/guard/home/edit_icn.png')} />

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
    height: '100%',
    width: 100,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
    marginLeft: 0,
  },
  thumbnail_info: {
    height: 25,
    width: 25,
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
    fontSize: 18,
    ellipsizeMode: 'tail'
  }
}

export default HomePropertyDetailEditItem;
