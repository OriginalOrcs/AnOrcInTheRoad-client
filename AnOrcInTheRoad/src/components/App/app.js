import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../reducers/index';
import Geolocation from '../../containers/geolocation';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import LoadingMap from '../Map/map'

const logger = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(thunk, promise, logger)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          An Orc In The Road!
        </Text>
        <Geolocation />
        <LoadingMap />
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