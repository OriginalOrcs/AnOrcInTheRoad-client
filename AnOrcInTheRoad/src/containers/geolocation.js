import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentLocation } from '../actions';

let SetCurrentLocation = ({ dispatch }){

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('POSITIONSSSS: ', position);
        dispatch(setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        }));
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
}

SetCurrentLocation = connect()(SetCurrentLocation);

export default SetCurrentLocation;