import React, { Component } from 'react'
import {Text,View} from 'react-native'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import testReducer from './reducers/testReducer';

const store = createStore(testReducer);

export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
      <Navigation/>
      </Provider>
    )
  }
}