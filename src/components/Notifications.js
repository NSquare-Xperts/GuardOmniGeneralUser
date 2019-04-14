import React, { Component } from 'react'
import { FlatList ,Text,View,TouchableWithoutFeedback, Image } from 'react-native'
import axios from 'axios'
import Placeholder from 'rn-placeholder'
import { red_lighter, white_Original, grey } from './common'
import { Actions } from 'react-native-router-flux'
import NotificationListItem from './common/NotificationListItem'

class Notifications extends Component {
state = {
    refreshing: true,
    user: [],
}
renderUsersList() {
      this.setState({refreshing: true});
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
          this.setState({ user: response.data, refreshing: false}),
          console.log("hi ",response.data)
      }
    ).catch((error) =>{
                  console.log(error)
                  this.setState({
                          refreshing: false,
        })
      }); 
}
componentWillMount(){
    this.renderUsersList()
}

_handleRefresh = () => {
    this.setState({
        refreshing: false,
    },
    () => {
        this.renderUsersList();
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
render() {
    if(this.state.refreshing){
        return(
            <View style={{backgroundColor: red_lighter, flex: 1}}>
                <View style={styles.container}>
                    <FlatList            
                        data= {this.state.user}
                        ItemSeparatorComponent = {this.FlatListItemSeparator}         
                        renderItem={({item}) => 
                            <Placeholder.Paragraph
                                lineSpacing={10}
                                firstLineWidth={'50%'}
                                animate='fade'
                                color={'grey'}
                                lastLineWidth="30%"
                                //onReady={this.state.refreshing}>
                                // onReady={true}>  
                                >
                                <NotificationListItem/>
                                {/* <Text style={{padding: 10, justifyContent:'center', fontSize: 14}}> {item.name} </Text> */}
                                    <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>
                                    </Placeholder.Paragraph>
                                }
                                refreshing={this.state.refreshing}
                                onRefresh={this._handleRefresh}/>
                    </View>

    </View>
            )
    }
else{
    return(
        <View style={{backgroundColor: red_lighter,flex: 1,marginBottom: 5}}>
            <View style={styles.container}>
                <FlatList   
                    ItemSeparatorComponent = {this.FlatListItemSeparator}         
                    data= {this.state.user}
                    renderItem={({item}) => 
                    <NotificationListItem/>}
                    // <Text style={{padding: 10, justifyContent:'center', fontSize: 11}}>{item.name}</Text>}
                    refreshing={this.state.refreshing}
                    onRefresh={this._handleRefresh}/>
            </View>

            <TouchableWithoutFeedback>
             <Image style={styles.thumbnail_arrow}
                            source={require('./assets/Home/delete_fab.png')}/> 
            </TouchableWithoutFeedback>

        </View>
    )
   }
}

}
export default Notifications;

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
        marginTop: 12,
        borderRadius: 2
    },
    thumbnail_arrow: {
        height: 55,
        width: 55,
        elevation: 4,
        position: 'absolute',
        bottom:0,
        right: 0,
        justifyContent: 'flex-end',
        //justifyContent: 'flex-end',
        marginRight: 10,
        marginBottom: 8,
      }
    
}