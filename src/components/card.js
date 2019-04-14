import React from 'react';
import { View } from 'react-native';
import { white_Original } from './common';

const Card = (props) => {
return (
    <View style={styles.containerStyle}>
    {props.children}
    </View>
);
};

const styles = {

    containerStyle: {

            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            elevation: 4,
            backgroundColor: white_Original,
            marginLeft: 8,
            marginRight: 8,
            marginTop: 10,
            marginBottom: 10
    }
};
export default Card;

