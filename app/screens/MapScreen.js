import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  Modal,
  Animated,
  TouchableHighlight,
} from 'react-native';
import { Components } from 'exponent';
import Router from '../navigation/Router';
import { Font } from 'exponent';
import data from '../constants/quests.json';
import MapScroll from '../components/MapScroll';

let { height, width } = Dimensions.get('window')

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quests: this.props.quests,
      showScroll: false,
      currentQuest: this.props.quests[0], 
      questIndex: 0,
      mapRegion: {
        latitude: 37.757,
        longitude: -122.445,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    };
    this.animatedValue = new Animated.Value(height + 50);
    this.handleScroll = this.handleScroll.bind(this);
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  callScroll() {
    Animated.timing(
      this.animatedValue,
      { 
        toValue: height - 200,
        duration: 300
      }).start()
  }
    
  closeScroll() {
    Animated.timing(
    this.animatedValue,
    { 
      toValue: height,
      duration: 300
    }).start()
  }

  componentWillReceiveProps(nextProps) {
    console.log('compWillRECIVE MAAAAPPP: ', nextProps)
    if (nextProps.quests !== this.props.quests) {
      this.setState({
        quests: nextProps.quests,
      });
    }
  }

  _onMarkerPress = (e) => {
    this.callScroll();
    this.setState({
      showScroll: !this.state.showScroll,
    });
    const quests = this.state.quests
    quests.forEach((quest, i) => {
      if (quest.id === e.id) {
        this.setCurrentQuestView(e, i);
      }
    });    

  }

  handleScroll(event) {
   const scrollPosition = event.nativeEvent.contentOffset.x;
   const questIndex = scrollPosition / width;
   if (questIndex % 1 === 0) {
    const currentQuest = this.state.quests[questIndex];
    this.setCurrentQuestView(currentQuest, questIndex);
   };
  }

  setCurrentQuestView(quest, i) {
    this.setState({
      questIndex: i,
      mapRegion: {
        latitude: quest.lat - 0.002,
        longitude: quest.lng - 0.0015,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Components.MapView
          style={{ flex: 1, backgroundColor: '#fff' }}
          initialRegion={this.state.mapRegion}
          region={this.state.mapRegion}
          onRegionChangeComplete={this._onRegionChange}
          provider="google"
          customMapStyle={googleMapStyle}
          showsUserLocation = {true}
        >
          {
            this.state.quests ?
            this.state.quests.map((quest, i) =>
              <Components.MapView.Marker
                draggable
                style={styles.flags}
                key={quest.id}
                coordinate={{
                  longitude: quest.lng,
                  latitude: quest.lat,
                }}
                image= { quest.active === '1' ? require('../assets/images/flag-active.png') : require('../assets/images/flag-not-active.png') }
                onPress={() => this._onMarkerPress(quest)}
              >
              </Components.MapView.Marker>
            )
          : null
          }
          <Animated.View style={{ transform: [{ translateY: this.animatedValue }], height: 100, backgroundColor: 'rgba(0,0,0,0)', position: 'absolute', left:0, top:0, right:0, justifyContent:  'center' }}>
           
            <MapScroll quests={this.state.quests} 
              currentQuest={this.state.currentQuest} 
              handleScroll={this.handleScroll} 
              closeScroll={this.closeScroll}
              onChange={this.handleChange}
              questIndex={this.state.questIndex}
              lat={this.props.lat}
              lng={this.props.lng}
              id={this.props.user.char_id} 
              toggleQuest={this.props.toggleActiveQuest}
            />
          
          </Animated.View>
          
        </Components.MapView>
       
      </View>
    );
  }

}

MapScreen.defaultProps ={
  quests: data,
}



const styles = StyleSheet.create({
  wrapper: {
      flex: -1,
      paddingTop: 50,
      width: width,
      height: 300,
      backgroundColor: 'rgba(0,0,0,0)',
      bottom: 0,
      position: 'absolute',
    },
    modal: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },

    text: {
      color: "black",
      fontSize: 22
    },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  map: {
    flex: 1, 
    backgroundColor: '#fff',
    zIndex: -1000,
  },
  scroll: {
    alignItems: 'center',
  },
  flags: {
    zIndex: 1000,
  },
  bubble: {
    flex: 1,
    width: 200,
    height: 150,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calloutText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    ...Font.style('luminari'),
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 34.5,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});



const googleMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

