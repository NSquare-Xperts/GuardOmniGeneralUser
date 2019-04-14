/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native'; 
import Router from './src/Router';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';

class App extends Component {
  
  render() {
  	console.disableYellowBox = true
    return (
      <Provider store={createStore(reducers, {},  applyMiddleware(thunk))}>
      <View style={{ flex: 1 }} >
        <Router />
      </View>
      </Provider>
    );
  }
}
export default App;