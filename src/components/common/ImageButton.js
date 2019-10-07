import React from 'react';
import { TouchableOpacity,Image ,Text, View} from 'react-native';
import { green} from './color';

const ImageButton = (props) => {    
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image 
            source={props.image}
            style={styles.viewStyle}>             
            </Image>
        </TouchableOpacity>
    );
};
const styles = {    
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