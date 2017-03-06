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
} from 'react-native';
import { Font } from 'exponent';
import data from '../constants/quests.json';

class MapScroll extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
   if (this.props.currentQuest.active) {
     this.setState({ isActive: true });
   } else {
    this.setState({isActive: false});
   }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps from MapScroll: ', nextProps.currentQuest)
    if (nextProps.currentQuest.active) {
      this.setState({ isActive: true });
    } else {
      this.setState({ isActive: false });
    }
    this.scrollView.scrollTo({ x: width * nextProps.questIndex });
  }

  googleDirections(start, end) {
    const url = `http://maps.google.com/maps?saddr=${start.lat},${start.lng}&daddr=${end.lat},${end.lng}`;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  handleSelect() {
    this.setState({isActive: !this.state.isActive});
    this.handleToggle();
  }

  handleToggle() {
    this.props.toggleQuest(this.props.id, this.props.currentQuest.id, this.state.isActive);
  }


  render() {
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
              <Text style={styles.scrollQuests} key={quest.id}>
                <Text style={styles.name}>{quest.name + '\n'}</Text>
                <Text style={styles.xp}>XP</Text><Text style={styles.experience}>{quest.experience + '\n'}</Text>
                {this.state.isActive ?
                  <Text style={styles.directions} onPress={() => {
                    this.googleDirections(
                      { lat: this.props.lat, lng: this.props.lng },
                      { lat: quest.lat, lng: quest.lng },
                    );
                  }}
                  > <Image source={require('../assets/icons.googlemaps.png')}></Image> Start Quest </Text> :
                  <Text style={styles.active} onPress={() => this.handleToggle()}> 
                    <Image source={require('../assets/icons.googlemaps.png')}></Image> Activate Quest </Text> 
                }
              </Text>

            )
          : null}
        </ScrollView>
      </Image>
      </View>
    );
  }

}

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
    marginTop: 50,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    ...Font.style('luminari'),
  },
  name: {
    fontSize: 30,
    marginTop: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  xp: {
    fontSize: 13,
    marginTop: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  experience: {
    marginTop: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  directions: {
    marginTop: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
});


export default MapScroll;
