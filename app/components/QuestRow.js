import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableHighlight, 
  Alert,
  Image,
} from 'react-native';
import socket from '../socket/socket';
import { Font } from 'exponent';


class QuestRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isSelected: false,
    };
  }

  componentDidMount() {
    if (this.props.quest.active) {
      this.setState({ isSelected: true });
    } else {
      this.setState({ isSelected: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS from QROW: ', nextProps);
    if (nextProps.quest.active) {
      this.setState({ isSelected: true });
    } else {
      this.setState({ isSelected: false });
    }
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
  }

  handleToggle() {
    this.props.toggleQuest(this.props.id, this.props.quest.id, this.state.isSelected);
  }

  checkIfComplete(distanceMiles) {
    if (distanceMiles < 0.1 && this.state.isSelected) {
      console.log('quest completed: ', this.props.quest.id);
      socket.emit('complete quest', this.props.id, this.props.quest.id);
      Alert.alert('Completed Quest!');
    }
  }


  render() {
    var distanceMiles = this.convertDistanceToMiles(this.props.dist);
    this.checkIfComplete(distanceMiles);
    return (
      <TouchableHighlight onPress={() => this.handleSelect()} underlayColor='white'>
        <Image style={styles.background} source={require('../assets/images/quest-row.png')}>
        <View style={[styles.container, this.state.isSelected ? { backgroundColor: '#0eb27e' } : {}]} >
          <Text style={styles.title}>
            {this.props.quest.name}
          </Text>
          {this.props.showDetails ?
          <View>
            {/*<Text style={styles.subtitle}>{this.props.quest.questType}</Text>*/}
            <Text style={styles.label}>{distanceMiles} Miles</Text>
            <Text style={styles.label}>Rewards: {this.props.quest.experience} EXP</Text>
          </View>
        : null}
        </View>
          </Image>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 10,
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  background: {
    flex: -1,
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
