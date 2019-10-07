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
      
    ]
  }
  GetSectionListItem = (item) => {
    Alert.alert(item)
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
    fontFamily: 'OpenSans-Semibold',
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


