import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Font } from 'exponent';
import data from '../constants/quests.json';
import {
  FontAwesome,
} from '@exponent/vector-icons';
import geolib from 'geolib';

class MapScroll extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuest: this.props.currentQuest,
      activate: 'activate',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.scrollView.scrollTo({ x: width * nextProps.questIndex });
  }

  googleDirections(start, end) {
    const url = `http://maps.google.com/maps?saddr=${start.lat},${start.lng}&daddr=${end.lat},${end.lng}&dirflg=w`;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  handleToggle() {
    this.props.toggleQuest(this.props.id, this.props.currentQuest.id, this.props.currentQuest.active);
      this.setState({activate: 'loading'});
        setTimeout(()=> {
          this.setState({ activate: 'activate' });
        }, 2000);
  }

  calculateDistance(lat1, lng1, lat2, lng2, accuracy) {
    const acc = accuracy || 20;
    var coord1 = { latitude: lat1, longitude: lng1 };
    var coord2 = { latitude: lat2, longitude: lng2 };
    return geolib.getDistance(coord1, coord2, acc);
  }
  
    

  render() {
    var dist = this.calculateDistance(this.props.lat, this.props.lng, this.props.currentQuest.lat, this.props.currentQuest.lng, 100);
    var miles = Math.floor(dist * 0.000621371 * 10)/10;
    return (
      <View style={styles.container}>
      <Image style={styles.scroll} source={require('../assets/images/scroll.png')} >
        <ScrollView
          ref={(input) => this.scrollView = input}
          pagingEnabled
          directionalLockEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          onScroll={this.props.handleScroll}
          scrollEventThrottle={0}
        >
          {
            this.props.quests ?
            this.props.quests.map(quest =>
              <View style={styles.scrollQuests} key={quest.id}>
                <View style={styles.level}>
                  <Image 
                    style={styles.activate}
                    source={quest.experience > 20000 ? require('../assets/icons/gold.png')
                      : quest.experience > 10000 ? require('../assets/icons/silver.png')
                      : require('../assets/icons/bronze.png')}
                  />
                  <Text style={styles.experience}>{' ' + quest.experience}</Text><Text style={styles.xp}>XP</Text>
                  <Text style={styles.distance}>{'         ' + miles + ' Miles'}</Text>
                </View>
                <Text style={styles.name}>{quest.name}</Text>
                { this.props.currentQuest.active ?
                  <View style={styles.directions}>
                    <TouchableOpacity onPress={() => {
                        this.googleDirections(
                          { lat: this.props.lat, lng: this.props.lng },
                          { lat: quest.lat, lng: quest.lng },
                        );
                      }}
                    >
                      <Image source={require('../assets/buttons/begin-button.png')} />                  
                    </TouchableOpacity>
                  </View>     
                  : 
                    this.state.activate == 'loading' ?
                      <ActivityIndicator animating={true} color='white' style={styles.spinner}/>
                      : <TouchableOpacity onPress={() => this.handleToggle()}>
                          <Image style={styles.activate} source={require('../assets/buttons/activate-button.png')} />
                        </TouchableOpacity>
                }
              </View>
            )
          : null}
        </ScrollView>
      </Image>
      </View>
    );
  }
}

MapScroll.defaultProps = {
  currentQuest: data[0],
};

let { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    bottom: 0,
  },
  scroll: {
    flex: -1,
    backgroundColor: 'rgba(0,0,0,0)',
    width: width,
  },
  scrollQuests: {
    width: width,
    height: width/2,
    marginTop: 35,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  name: {
    fontSize: 45,
    marginTop: 10,
    textAlign: 'center',
    flexDirection: 'row',
    color: 'black',
    ...Font.style('elixia'),
    fontWeight: '900',
  },
  level: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  xp: {
    fontSize: 12,
    flexDirection: 'row',
    ...Font.style('luminari'),
    fontWeight: '100',
  },
  experience: {
    fontSize: 20,
    flexDirection: 'row',
    ...Font.style('luminari'),
    fontWeight: '100',
  },
  directions: {
    flexDirection: 'row',
  },
  activate: {
    flexDirection: 'row',
  },
  spinner: {
    marginTop: 20,
  },
  distance: {
    fontSize: 20,
    flexDirection: 'row',
    ...Font.style('luminari'),
    fontWeight: '100',
  },
});


export default MapScroll;
