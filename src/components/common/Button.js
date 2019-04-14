import React from 'react';
import { TouchableOpacity, Text, View} from 'react-native';
import { green} from './color';

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} >
            <View style={styles.viewStyle}> 
            <Text style={styles.textStyle}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = {
    viewStyle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: green,
        borderRadius: 40,
        width: 200,
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
export default Button;