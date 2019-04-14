import React from 'react';
import { View, Text } from 'react-native';
import Card from './card';
import CardSection from './CardSection';


const AlbumDetails = (props) => {
return (
<Card>
    <CardSection>
        <View>
            
        </View>
    <Text>{props.album.title}</Text>
    </CardSection>
    
    <CardSection>
    <Text>{props.album.title}</Text>
    </CardSection>
    

</Card>
);
};
export default AlbumDetails;