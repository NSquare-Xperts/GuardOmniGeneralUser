import React, { Component } from "react"
import { Text, View, SectionList, Alert, Image, TouchableWithoutFeedback } from "react-native"
import { red_lighter, white_Original, grey, black, Input, pink, grey_lighter } from './common'
import AdvanceSearchSubItem from './common/AdvanceSearchSubItem'
import PropertyDetailSubItem from './common/PropertyDetailSubItem'
import { ScrollView } from "react-native-gesture-handler"
import { GuardInput } from "./common/GuardInput"
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu"
import { Picker } from "native-base";

class GuardAdvancedSearch0 extends Component {
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

            <View style={{ marginLeft: 25, flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>

              <Text style={styles.textStyle}> Search Result</Text>

              <MenuProvider
                selectedValue={this.state.language}
                style={{ height: 50, width: 100 ,marginLeft: 10}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue }) }>
                <Menu>                  
                  <MenuTrigger>
                  <Image
                        source={require('./assets/Common/switch_property_navigate.png')}
                        style={styles.profileImg} />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption label="Java" value="java" ><Text>Owner</Text></MenuOption>
                    <MenuOption label="JavaScript" value="js" ><Text>Tenant</Text></MenuOption>
                    <MenuOption label="JavaScript" value="js" ><Text>Family</Text></MenuOption>
                    <MenuOption label="JavaScript" value="js" ><Text>Visitor</Text></MenuOption>
                    <MenuOption label="JavaScript" value="js" ><Text>Flat/Unit</Text></MenuOption>
                  </MenuOptions>
                </Menu>
              </MenuProvider>

              {/* <MenuProvider style={{ flexDirection: 'column'}}>
                <Menu>
                  <MenuTrigger>
                    <Image
                      source={require('./assets/Common/switch_property_navigate.png')}
                      style={styles.profileImg} />

                  </MenuTrigger  >

                   <MenuOptions>
                   
                    {/* <MenuOption 
                    value={"Login"}>
                      <Text style={styles.menuContent}>Login</Text>
                    </MenuOption>
                  
                    <MenuOption 
                    value={"Register"}>
                      <Text style={styles.menuContent}>Register</Text>
                    </MenuOption>
                   
                    <MenuOption value={"Download"}>
                      <Text style={styles.menuContent}>Download</Text>
                    </MenuOption>
                   
                    <MenuOption value={"Logout"}>
                      <Text style={styles.menuContent}>Logout</Text>
                    </MenuOption>
                   
                    <MenuOption value={3} disabled={true}>
                      <Text style={styles.menuContent}>Disabled Menu</Text>
                    </MenuOption>
                  </MenuOptions>

                </Menu>
              </MenuProvider>
              */}
            </View>

            <SectionList
              scrollEnabled={false}
              sections={this.state.sections}
              FlatListItemSeparator={this.FlatListItemSeparator}
              // renderSectionHeader={ ({section}) => <Text style={styles.SectionHeader}> { section.title } </Text> }
              // renderItem={ ({item}) => <Text style={PropertyDetailSubItem}> { item.name } </Text> }
              renderItem={({ item }) => <AdvanceSearchSubItem name={item.name}
                image={item.image} />}
              keyExtractor={(index) => index} />
          </View>
        </View>
      </ScrollView>
    )
  }
}
export default GuardAdvancedSearch0;

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
    backgroundColor: pink
  },
  profileImg: {
    height: 22,
    width: 22,
    alignSelf: 'flex-end'
  },
  textStyle: {
    fontSize: 18,
    color: black,
    fontFamily: 'OpenSans.ttf'
  },
  headerText: {
    fontSize: 20,
    //margin: 10,
    fontWeight: 'bold'
  },
  menuContent: {
    color: black,
    padding: 2,
    fontSize: 15
  }
}

