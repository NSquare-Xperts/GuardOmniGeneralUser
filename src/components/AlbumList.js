import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AlbumDetails from './AlbumDetails';
import * as Progress from 'react-native-progress';
import {baseURL} from './common/constants'

let parent;
//Class component : 1. used for presenting dyanamic 
                  // 2.Handle any data that may going to change
class AlbumList extends Component {
    state = {
    
        refreshing: true,
        albums: [] 
    };

    componentWillMount(){
        this.setState({refreshing: true});        
        axios.get(baseURL)
          //axiosInstance.get('/music_albums')
         // axios.get({baseUrl})
        .then(response => this.setState({ albums: response.data,
            }));         
        //.then(response => console.log(response)); 
    }
    parent = require('../actions/Parent');
    renderAlbums(){
        //album : prop 
        return this.state.albums.map(album => 
            <AlbumDetails key={ album.title } album={album}/>
    //   <AlbumDetails key={parent.convertStringToUppercase(album.title)} album={album}/>
    // <AlbumDetails key={parent.convertStringToUppercase(10/12/2018)} album={album}/>
    );
    }

  
   
    render(){
        if(refreshing = false){
     return (
            <View style={{flex: 1, alignItems: 'center' ,justifyContent:'center'}} >
            {/* <Progress.Bar progress={0.3} width={200} /> */}
            {/* <Progress.Pie progress={0.4} size={50} /> */}
            <Progress.Circle size={30} color='red' indeterminate={true} style={{justifyContent: 'center'}}/>
            {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
            </View>
    );
     }else{
            return (
                <View>
                {this.renderAlbums()} 
                </View>
            );
     }
   }
}
//functional component : used for presenting static data 
// const AlbumList = () => {
//     return(
//         <View>
//             <Text>Album list!!! </Text>
//         </View>
//     );
  
// };
export default AlbumList;