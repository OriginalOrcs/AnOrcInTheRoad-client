import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../reducers/index';
import Geolocation from '../Home/geolocation'

let store = createStore(reducers)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          An Orc In The Road!
        </Text>
        <Geolocation />
      </View>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
}); 

export default App;