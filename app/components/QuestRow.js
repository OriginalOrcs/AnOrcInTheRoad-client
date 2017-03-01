import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import socket from '../socket/socket';
import { Font } from 'exponent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
     ...Font.style('luminari'),
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '100',
    color: 'gray',
     ...Font.style('luminari'),
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
     ...Font.style('luminari'),
  },
});


class QuestRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isSelected: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS from QROW: ', nextProps)
  }

  getDistance(lat1, lng1, lat2, lng2) {
    return this.props.calculateDistance({latitude: lat1, longitude: lng1}, {latitude: lat2, longitude: lng2});
  }

  convertDistanceToMiles(dist) {
    return Math.floor(dist * 0.000621371 * 10)/10;
  }

  handleSelect() {
    this.setState({isSelected: !this.state.isSelected});
    this.handleToggle();
      console.log('STATE IS SELECTED from HANDLE: ', this.state.isSelected);

  }

  handleToggle() {
     console.log('STATE IS SELECTED from HANDLE: ', this.state.isSelected);
    this.props.toggleQuest(this.props.id, this.props.quest.id, this.state.isSelected);
  }


  render() {
    console.log('STATE IS SELECTED: ', this.state.isSelected);
    const rowPress = () => {
      console.log('You have pressed row');
    };
    console.log('ROW PROPS: ', this.props);
    console.log(this.props);
    var distanceMiles = this.convertDistanceToMiles(this.props.dist);
    if (distanceMiles < 0.1) {
      console.log('quest completed: ', this.props.quest.id);
      socket.emit('complete quest', this.props.id, this.props.quest.id);
    }
    // console.log('DISTANCE: ', this.getDistance(this.props.location.latitude, this.props.location.longitude, this.props.quest.lat, this.props.quest.lng));
    return (
      <TouchableHighlight onPress={() => this.handleSelect()} underlayColor='white'>
        <View style={[styles.container, this.state.isSelected ? { backgroundColor: '#0eb27e' } : {}]}>
          <Text style={styles.title} /*onPress={rowPress}*/>
            {this.props.quest.name}
          </Text>
          {this.props.showDetails ?
          
          <View /*onPress={() => this.props.toggleQuest(this.props.quest.id)}*/>
            {/*<Text style={styles.subtitle}>{this.props.quest.questType}</Text>*/}
            <Text style={styles.label}>{distanceMiles} Miles</Text>
            {/*<Text style={styles.subtitle}>Lat: {this.props.quest.lat} | Lng: {this.props.quest.lng} </Text>*/}
            <Text style={styles.label}>Rewards: {this.props.quest.experience} EXP</Text>
          </View>
        : null}
        </View>
      </TouchableHighlight>
    );
  }
}

QuestRow.propTypes = {
  quest: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    questType: React.PropTypes.string.isRequired,
    experience: React.PropTypes.number.isRequired,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
  }).isRequired,
  showDetails: React.PropTypes.bool.isRequired,
};

export default QuestRow;
