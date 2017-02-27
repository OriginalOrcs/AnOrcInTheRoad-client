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
} from 'react-native';
import { Components } from 'exponent';
import { MonoText } from '../components/StyledText';
import Router from '../navigation/Router';

import data from '../constants/quests.json';
import socket from '../socket/socket';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quests: null,
    }
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quests !== this.props.quests) {
      this.setState({
        quests: nextProps.quests,
      });
    }
  }
  
  _onMarkerPress = (e) => {
    // this.props.navigator.push(Router.getRoute('links'));
    console.log('Marker Pressed: ', e)
  }



  render() {
      let region = {
        latitude: 37.75825,
        longitude: -122.45,
        latitudeDelta: 0.15,
        longitudeDelta: 0.12,
      };
    return (
      <View style={styles.container}>
        <Components.MapView
          style={{ flex: 1, backgroundColor: '#fff' }}
          initialRegion={region}
          onRegionChangeComplete={this._onRegionChange}>
          {
            data ?
            data.map(quest =>
              <Components.MapView.Marker
                draggable
                onDragEnd={(e) => {console.log('DRAG END: ', e.nativeEvent.coordinate)}}
                key={quest.creator_id}
                coordinate={{
                  longitude: quest.lng,
                  latitude: quest.lat,
                }}
                image= { quest.item_id % 2 === 0 ? require('../assets/images/flag-active.png') : require('../assets/images/flag-not-active.png') }
                onPress={() => this._onMarkerPress(quest)}>

                  <Components.MapView.Callout>
                    <View>
                      <Text>YAAAAAASSSS</Text>
                    </View>
                  </Components.MapView.Callout>

              </Components.MapView.Marker>
            )
          : null}
        </Components.MapView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
