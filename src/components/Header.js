import React from 'react'
import {Text, View} from 'react-native'

//make component 
const Header = () => {
    const {textStyle, viewStyle} = styles;
    return(

    <View style={viewStyle}>
       
    <Text styles={textStyle}>Gaurd Omni</Text>

</View>
);
};

const styles = {
viewStyle: {

    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    elevation: 4,
},
textStyle:{
    fontSize: 20
}

}
//export for other parts of the app
export default Header;
