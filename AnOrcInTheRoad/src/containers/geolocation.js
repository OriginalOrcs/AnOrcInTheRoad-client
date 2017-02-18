import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentLocation } from '../actions';
import GeolocationExample from '../components/Home/geolocation'

const mapStateToProps = (state) => {
  console.log(state);
  return {
    geolocation: state.coordinates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLocation: () => {
      dispatch(setCurrentLocation({latitude: 37.78, longitude: 122.40}))
    }
  }
}

const SetCurrentLocation = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeolocationExample);

export default SetCurrentLocation;
