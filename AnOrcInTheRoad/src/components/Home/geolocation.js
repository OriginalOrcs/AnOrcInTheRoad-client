import React, { Component, PropTypes } from 'react';
import { View, Text, Button } from 'react-native';

const GeolocationExample = ({ geolocation, sendLocation }) => (
  <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Latitude: {geolocation.latitude}</Text>
    <Text>Longitude: {geolocation.longitude}</Text>
    <Button
      onPress={sendLocation}
      title="Get GPS Location"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
)

GeolocationExample.propTypes = {
  geolocation: PropTypes.object.isRequired,
  sendLocation: PropTypes.func.isRequired
}

export default GeolocationExample;