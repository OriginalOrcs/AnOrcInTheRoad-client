import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, Slider, Picker, Image } from 'react-native';
import { Components } from 'exponent';
import data from '../constants/quests.json';
import { connect } from 'react-redux';
import googleMapStyle from './googleMapStyle';

class MapQuest extends React.Component {
  render() {
    let mapRegion = {
      latitude: this.props.lat,
      longitude: this.props.lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    return (
      <View style={styles.container}>
       <Components.MapView
         style={{ flex: 1, backgroundColor: '#fff' }}
         initialRegion={mapRegion}
         // region={this.state.mapRegion}
         onRegionChangeComplete={this.props.onRegionChange}
         provider="google"
         customMapStyle={googleMapStyle}
         showsUserLocation = {true}
       >
       {
         this.props.quests ?
         this.props.quests.map((quest, i) =>
           <Components.MapView.Marker
             style={styles.flags}
             key={quest.id}
             coordinate={{
               longitude: quest.lng,
               latitude: quest.lat,
             }}
             image= { quest.active === '1' ? require('../assets/images/flag-active-small.png') : require('../assets/images/flag-not-active-small.png') }
           >
           </Components.MapView.Marker>
         )
       : null
       }
       </Components.MapView>
       <View pointerEvents="none" style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
           <Image pointerEvents="none" source={require('../assets/images/flag-create.png')}/>
       </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quests: state.quests,
    lat: state.location.latitude,
    lng: state.location.longitude,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

const MapCreate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapQuest);

export default MapCreate;

const styles = StyleSheet.create({
  // wrapper: {
  //     flex: -1,
  //     paddingTop: 50,
  //     width: width,
  //     height: 300,
  //     backgroundColor: 'rgba(0,0,0,0)',
  //     bottom: 0,
  //     position: 'absolute',
  //   },
  //   modal: {
  //     height: 100,
  //     backgroundColor: 'rgba(0,0,0,0)',
  //   },

    // text: {
    //   color: "black",
    //   fontSize: 22
    // },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  map: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: -1000,
  },
 });
