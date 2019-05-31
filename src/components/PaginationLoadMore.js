import React, { Component } from 'react'
import { FlatList, Text, View, TouchableWithoutFeedback, Image,ActivityIndicator } from 'react-native'
import axios from 'axios'
import Placeholder from 'rn-placeholder'
import { red_lighter, white_Original, grey, pink } from './common'
import { Actions } from 'react-native-router-flux'
import NotificationListItem from './common/NotificationListItem'

export default class PaginationLoadMore extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            page:1
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10&_page='+this.state.page;
        fetch(url).then((response) => {
            res = JSON.parse(response)
        })
            .then((responseJson) => {
                this.setState({
                    //data: responseJson
                    data: this.state.data.concat(responseJson)
                })
            })
    }

    renderRow = ({ item }) => {
        return (
            <View
                style={styles.item}>
                <Image 
                source={{uri: item.url}}
                style={styles.itemImage} />
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemText}>{item.id}</Text>
            </View>
        )
    }

    handleLoadMore = () => {
        console.warn('handleLoadMore');
        this.setState(
            {page: this.state.page +1},
            this.getData
        )
    }

    renderFooter = () => {
        return(
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        )
    }


    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.data}
                renderItem={this.renderRow}
                keyExtractor={(item,index)=>index.toString()}
                onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={0}
                ListFooterComponent={this.renderFooter}
            />
        );
    }
}

const styles = {
    container: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: white_Original
    },
    item: {
        borderBottomColor: pink,
        marginBottom: 10,
        borderBottomWidth: 2
    },
    itemImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    itemText: {
        fontSize: 16,
        padding: 5
    },
    loader:{
        marginTop: 20,
        alignItems: 'center'
    }
}
