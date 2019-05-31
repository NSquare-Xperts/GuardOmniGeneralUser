import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View,TouchableWithoutFeedback } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Actions } from 'react-native-router-flux';
//import Menu from './Menu';
//import Homepage from '../components/Homepage';

export default class SwiperFlatList_ extends PureComponent {
  render() {
    return (
      <View>
         <SwiperFlatList
         showPagination
         paginationDefaultColor={'white'}
         paginationActiveColor={'red'} >          
           <View style={[styles.child, { backgroundColor: 'tomato' }]}>
            <Text style={styles.text}>1</Text>
          </View>
           <View style={[styles.child, { backgroundColor: 'thistle' }]}>
             <Text style={styles.text}>2</Text>
           </View>
           <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
             <Text style={styles.text}>3</Text>
           </View>
           
           <TouchableWithoutFeedback onPress={() => 
           { Actions.homepage()}}>
          
           <View style={[styles.child, { backgroundColor: 'teal' }]}>
              <Text style={styles.text}>4</Text> 
            </View>
            </TouchableWithoutFeedback>

         </SwiperFlatList> 
       </View>
    );
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  child: {
    height: height * 1,
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 1,
    textAlign: 'center',
  },
});