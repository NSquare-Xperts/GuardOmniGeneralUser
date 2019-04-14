import React, { Component } from "react"
import { Text, View, SectionList, Alert, TextInput } from "react-native"
import { red_lighter, white_Original, grey, black, Input, pink, grey_lighter } from './common'
import HomePropertyDetailItem from './common/HomePropertyDetailItem'
import PropertyDetailSubItem from './common/PropertyDetailSubItem'
import { ScrollView } from "react-native-gesture-handler"
import { GuardInput } from "./common/GuardInput";



class PropertyDetails extends Component {
  state = {
    refreshing: true,
    sections: [
      {
        title: 'Family Members',
        data: [{ 'name': 'John Doe', 'image': require('./assets/Home/profile_img.png') },
        { 'name': 'John Doe', 'image': require('./assets/Home/profile_img.png') },
        { 'name': 'John Doe', 'image': require('./assets/Home/profile_img.png') }]
      },
      {
        title: 'Tenant and Tenant Family', data: [{ 'name': 'John Doe', 'image': require('./assets/fullscreen.jpg') },
        { 'name': 'John Doe', 'image': require('./assets/Home/profile_img.png') },
        { 'name': 'John Doe', 'image': require('./assets/Home/profile_img.png') }
        ]
      },
      {
        title: 'Vehicle', data: [{ 'name': 'John Doe', 'image': require('./assets/fullscreen.jpg') },
        { 'name': 'John Doe', 'image': require('./assets/Home/wheel.png') },
        { 'name': 'John Doe', 'image': require('./assets/Home/wheel.png') }
        ]
      },
      {
        title: 'Documents', data: [{ 'name': 'John Doe', 'image': require('./assets/Home/text_document.png') },
        { 'name': 'John Doe', 'image': require('./assets/Home/text_document.png') },
        { 'name': 'John Doe', 'image': require('./assets/Home/text_document.png') }
        ]
      }
    ]
  }
  GetSectionListItem = (item) => {
    Alert.alert(item)
  }
  componentWillMount() {
    // this.renderUsersList()
  }

  _handleRefresh = () => {
    this.setState({
      refreshing: false,
    },
      () => {
        //this.renderUsersList();
      })
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.4,
          width: "100%",
          backgroundColor: grey_lighter,
          marginTop: 20
          //marginLeft: 10, 
          //marginRight: 10,
        }}
      />
    );
  }
  render() {
    //if(this.state.refreshing){
    return (
      <ScrollView>
        <View style={{ backgroundColor: red_lighter, flex: 1 }}>

          <HomePropertyDetailItem />
          <View style={styles.container}>

            <GuardInput
              value={this.state.query}
              onChangeText={text => {
                this.setState({
                  query: text
                })
              }}
              style={{ height: 70, borderRadius: 20, backgroundColor: white_Original }}
              placeholder="   Enter to search"
              underlineColorAndroid='#0000' />

            {this.FlatListItemSeparator()}

            <SectionList
              scrollEnabled={false}
              sections={this.state.sections}
              FlatListItemSeparator={this.FlatListItemSeparator}
              // renderSectionHeader={ ({section}) => <Text style={styles.SectionHeader}> { section.title } </Text> }
              // renderItem={ ({item}) => <Text style={PropertyDetailSubItem}> { item.name } </Text> }
                renderItem={({ item }) => <PropertyDetailSubItem name={item.name}
                image={item.image} />}
              keyExtractor={(index) => index} />
          </View>
        </View>
      </ScrollView>
    )
  }
  // else{
  //     return(
  //         <View style={{backgroundColor: red_lighter,flex: 1,marginBottom: 5}}>
  //            <HomeListItems/>
  //             <View style={styles.container}>
  //             </View>
  //         </View> 
  //             )
  //    }
  // }

}
export default PropertyDetails;

const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    //padding: 5,
    marginLeft: 10,
    justifyitems: 'center',
    elevation: 4,
    marginTop: 10,
    borderRadius: 2
  },
  SectionHeader: {
    fontFamily: 'OpenSans-Semibold.ttf',
    fontSize: 14,
    padding: 5,
    color: black,
  },
  SectionListItemS: {
    fontSize: 16,
    padding: 6,
    color: '#000',
    backgroundColor: '#F5F5F5'
  }

}


// import React, { Component } from 'react'
// import { View, Text } from 'react-native'
// import HomeListItems from './common/HomeListItems'
// import { red_lighter,grey,white_Original } from './common'
// import axios from 'axios'
// import Placeholder from 'rn-placeholder'
// import FlatList from 'react-native-swiper-flatlist'
// import RequestListItems from './common/RequestListItems'

// class PropertyDetails extends Component {
//   state = {
//     refreshing: true,
//     user: []
// }

// renderUsersList() {
//     this.setState({refreshing: true});

//     axios.get('https://jsonplaceholder.typicode.com/users')
//     .then(response => {
//         this.setState({ user: response.data, refreshing: false})
//     }
//    ).catch((error) =>{
//                 console.log(error)
//                 this.setState({
//                          refreshing: false,
//        })
//     }); 
// }
// componentWillMount(){
//   this.renderUsersList()
// }

// _handleRefresh = () => {
//   this.setState({
//       refreshing: false,
//   },
//   () => {
//       this.renderUsersList();
//   })
// }

// FlatListItemSeparator = () => {
//   return (
//     <View
//       style={{
//         height: 0.3,
//         width: "95%",
//         backgroundColor: grey,
//         marginLeft: 10, 
//         marginRight: 10,
//       }}
//     />
//   );
// }

// render(){
//     // return(
//     // <View style={styles.container}>
//     //     <HomeListItems/>
//     // </View>);
//     if(this.state.refreshing){
//       return(
//           <View style={{backgroundColor: red_lighter, flex: 1}}>
//           <HomeListItems/>
//               <View style={styles.container}>
//                   <FlatList            
//                       data= {this.state.user}
//                       ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                       renderItem={({item}) => 
//                           <Placeholder.Paragraph
//                               lineSpacing={10}
//                               firstLineWidth={'50%'}
//                               animate='fade'
//                               color={'grey'}
//                               lastLineWidth="30%"
//                               //onReady={this.state.refreshing}>
//                               // onReady={true}>  
//                               >
//                               <RequestListItems/>
//                               {/* <Text style={{padding: 10, justifyContent:'center', fontSize: 14}}> {item.name} </Text> */}
//                                   <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>
//                                   </Placeholder.Paragraph>
//                               }
//                               refreshing={this.state.refreshing}
//                               onRefresh={this._handleRefresh}
//                           />

//                   </View>

//               </View>
//           )
//   }
// else{
//   return(
//       <View style={{backgroundColor: red_lighter,flex: 1,marginBottom: 5}}>
//       <HomeListItems/>
//           <View style={styles.container}>
//               <FlatList   
//                   ItemSeparatorComponent = {this.FlatListItemSeparator}         
//                   data= {this.state.user}
//                   renderItem={({item}) => 
//                 <RequestListItems/>}

//                   // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
//                   refreshing={this.state.refreshing}
//                   onRefresh={this._handleRefresh}/>


//      </View>
//       </View>
//   )
//  }

//   }
// }
// export default PropertyDetails;
// const styles = {
//   container: {
//     backgroundColor: white_Original,
//     width: '95.55%',
//     height: '100%',
//     display: 'flex',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     padding: 5,
//     marginLeft: 10,
//     justifyitems: 'center',
//     elevation: 4,
//     marginTop: 12,
//     borderRadius: 2
// },

// }