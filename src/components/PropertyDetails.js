import React, { Component } from "react"
import { Text, View, SectionList, Alert, AsyncStorage, Dimensions } from "react-native"
import { red_lighter, white_Original, grey, black } from './common'
import PropertyDetailSubItem from './common/PropertyDetailSubItem'
import { ScrollView } from "react-native-gesture-handler"
import axios from 'axios'
import HomePropertyDetailEditItem from './common/HomePropertyDetailEditItem'

class PropertyDetails extends Component {
  state = {
    refreshing: true,
    key: '',
    title: 'Tenant Family',
    sections: [],
    property: [],
    userId: '',
    flatId: '',
    sectionType: ''
  }

  GetSectionListItem = (item) => {
    Alert.alert(item)
  }

  renderPropertyDetailList() {

    console.log("p detaisl ", this.state.userId, this.state.flatId)
    this.setState({ refreshing: true });

    axios.post('http://18.188.253.46:8000/api/propertyDetails?', {
       "userId": this.state.userId,
       "flatId": this.state.flatId
     
    })
      .then(response => {
        this.setState({
          sections: response.data.data[0].family_details,
          property: response.data.data[0].property_details[0],
          refreshing: false
        }),
          console.log("property image  ", this.state.property.site_image)
      }).catch((error) => {
        console.log("property detail error")
        console.log(error)
        this.setState({
          refreshing: false,
        })
      });
  }

  async _getStorageValue() {

    var value = await AsyncStorage.getItem('propertyDetails')
    var data = JSON.parse(value);

    var valueUser = await AsyncStorage.getItem('userDetail')
    var dataUser = JSON.parse(valueUser);

    if (data != '' || data != null) {
      this.setState({
        userId: dataUser.user_id,
        flatId: data.flat_id
      })
    }

    this.renderPropertyDetailList()
  }


  componentDidMount() {
    this._getStorageValue()

  }

  _handleRefresh = () => {
    this.setState({
      refreshing: false,
    },
      () => {
        this.renderPropertyDetailList();
      })
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.4,
          width: "95%",
          backgroundColor: grey,
          marginLeft: 10,
          marginRight: 10,
        }}
      />
    );
  }

  _emptyPropertyList = () => {
    //call for empty component or error
    if (this.state.refreshing) {
      return (
        <View style={{ backgroundColor: red_lighter, display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 4 }}>
        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: white_Original, display: 'flex', flex: 1, height: 350, justifyContent: 'center', alignSelf: 'center', marginTop: Dimensions.get('window').height / 8 }}>
          <Text style={styles.textStyle}>No Details Found</Text>
        </View>
      )
    }
  }

  render() {
    if (this.state.refreshing) {
      return (
        <ScrollView>
          <View style={{ backgroundColor: red_lighter, flex: 1 }}>
            <HomePropertyDetailEditItem
              name={this.state.property.site_name}
              flat_no={this.state.property.flat_no}
              type={this.state.property.role_name}
              image={this.state.property.site_image}
            />
            <View style={styles.container}>

              <SectionList
                //empty component
                ListEmptyComponent={this._emptyPropertyList}
                scrollEnabled={false}
                sections={this.state.sections}
                renderSectionFooter={this.FlatListItemSeparator}
                renderSectionHeader={({ section }) =>
                  <Text style={styles.SectionHeader}> {section.title} </Text>}
                renderItem={({ item }) => <PropertyDetailSubItem name={item.name}

                  type={item.type}
                  //sectionType={section}
                  image={item.image} />}
                keyExtractor={(index) => index}
              />
            </View>
          </View>
        </ScrollView>
      )
    }
    else {
      return (
        <ScrollView>
          <View style={{ backgroundColor: red_lighter, flex: 1 }}>

            <HomePropertyDetailEditItem
              name={this.state.property.site_name}
              flat_no={this.state.property.flat_no}
              type={this.state.property.role_name}
              image={this.state.property.site_image}
            />
            <View style={styles.container}>

              <SectionList
                //empty component
                ListEmptyComponent={this._emptyPropertyList}
                scrollEnabled={false}
                sections={this.state.sections}
                FlatListItemSeparator={this.FlatListItemSeparator}
                renderSectionFooter={this.FlatListItemSeparator}
                renderSectionHeader={({ section }) =>

                  <Text style={styles.SectionHeader}> {section.title} </Text>}

                renderItem={({ item }) => <PropertyDetailSubItem name={item.name}
                  type={item.type}
                  // sectionType={section.title}
                  image={item.image} />}
                keyExtractor={(index) => index} />
            </View>
          </View>
        </ScrollView>
      )
    }
  }
}
export default PropertyDetails;
const styles = {
  container: {
    backgroundColor: white_Original,
    width: '95.55%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
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