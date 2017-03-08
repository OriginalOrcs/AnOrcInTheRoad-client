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
import googleMapStyle from '../components/googleMapStyle';

let { height, width } = Dimensions.get('window')

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quests: this.props.quests,
      showScroll: false,
      currentQuest: data[0], 
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
    nextProps.quests.forEach(quest => {
      if (quest.id === this.state.currentQuest.id) {
        this.setState({ currentQuest: quest });
      }
    });
  }

  _onMarkerPress = (e) => {
    this.callScroll();
    this.setState({
      showScroll: !this.state.showScroll,
    });
    const quests = this.state.quests;
    quests.forEach((quest, i) => {
      if (quest.id === e.id) {
        this.setCurrentQuestView(quest, i);
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
      currentQuest: quest,
      questIndex: i,
      mapRegion: {
        latitude: quest.lat - 0.002,
        longitude: quest.lng - 0.0015,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
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
          provider="google"
          customMapStyle={googleMapStyle}
          showsUserLocation = {true}
        >
          {
            this.state.quests ?
            this.state.quests.map((quest, i) =>
              <Components.MapView.Marker
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
              questIndex={this.state.questIndex}
              handleScroll={this.handleScroll} 
              closeScroll={this.closeScroll}
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

