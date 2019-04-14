// import React, { Component } from 'react';
// import { View } from 'react-native';
// import axios from 'axios';
// import AlbumDetails from './AlbumDetails';
// import { ListItem } from 'native-base';

// //Class component : 1. used for presenting dyanamic 
//                   // 2.Handle any data that may going to change
// class AlbumList extends Component {
// state = { 
//     refreshing: false,
//  };

//     componentWillMount(){
        
//         this.props.albums.data= []

//         console.log('componentWillMount in albumlist');
//         axios.get('https://rallycoding.herokuapp.com/api/music_albums')
//             .then( (response)  => {
//                 var data = []

//                 data = response.data 
//                 this.props.albums.data = data 
//                 this.setState({ 

//                     refreshing : false

//                  })
                 
//                 })
//                 .catch((error) =>{

//                     console.log(error)
//                     this.props.albums.failed = true
//                     this.setState({
//                         refreshing: false
//                     })
//                 })

//             })
        

//         //.then(response => console.log(response)); 
//     }

//     renderRow() {
//         return <ListItem
//                     album={}
//                     />
//     }
//     renderAlbums(){
//         //album : prop 
//         return this.state.albums.map(album => 
//          <AlbumDetails key={album.title} album={album}/>
//          );
//     }

//     render(){

//      return (
//         <View>
//             {this.renderAlbums()} 
//         </View>
//     );
//    }
// }
// //functional component : used for presenting static data 
// // const AlbumList = () => {
// //     return(
// //         <View>
// //             <Text>Album list!!! </Text>
// //         </View>
// //     );
  
// // };
// export default AlbumList;