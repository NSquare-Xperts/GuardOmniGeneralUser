import React from 'react';
import { TouchableOpacity,Image ,Text, View} from 'react-native';
import { green} from './color';

const ImageButton = (props) => {
    console.log("print uri : ",props.image)
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image 
            source={props.image}
            style={styles.viewStyle}> 
            {/* <Text style={styles.textStyle}>{props.children}</Text> */}
            </Image>
        </TouchableOpacity>
    );
};
const styles = {
    // viewStyle: {
    //     height: 50,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     alignSelf: 'center',
    //     backgroundColor: green,
    //     borderRadius: 40,
    //     width: '90%',
    // }
    viewStyle: {
        height: 60,
        width: 60

    },
    textStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
};
export default ImageButton;