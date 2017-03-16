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
import Layout from '../constants/Layout';

class QuestRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isSelected: false,
      alertActive: false,
    };
  }

  componentDidMount() {
    this.checkIfCompleteAuto();
  }

  handleSelect() {
    if (this.props.quest.active) {
      socket.emit('deactivate quest', this.props.id, this.props.quest.id);
      this.checkIfComplete();
    } else {
      socket.emit('activate quest', this.props.id, this.props.quest.id);
      this.checkIfComplete();
    }
  }

  sendAlert() {
    if (!this.state.alertActive) {
      this.setState({ alertActive: true });
      Alert.alert('Completed Quest!');
    }
    this.setState({ alertActive: false });
  }

  checkIfCompleteAuto() {
    if (this.props.quest.active) {
      this.checkIfComplete();
    }
  }

  checkIfComplete() {
    if (this.props.dist < 0.1 && this.props.id !== this.props.quest.creator_id) {
      socket.emit('complete quest', this.props.id, this.props.quest.id);
      this.sendAlert();
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.handleSelect()} underlayColor='#b9d3c2'>
        <Image style={styles.background} source={require('../assets/images/quest-row.png')}>
        <View style={[styles.wrapper, this.state.isSelected ? { backgroundColor: '#0eb27e', borderRadius: 7 } : {}]} >
          <Image
            style={styles.badges}
            source={this.props.quest.experience > 20000 ? require('../assets/icons/gold-large.png')
              : this.props.quest.experience > 10000 ? require('../assets/icons/silver-large.png')
              : require('../assets/icons/bronze-large.png')}
          />
          <View style={styles.container}>
            <Text style={styles.title}>{this.props.quest.name}</Text>
            <View style={styles.details}>
              <Text style={styles.experience}>Rewards: {this.props.quest.experience}</Text><Text style={styles.xp}>XP</Text>
              <Text style={styles.distance}>{'        ' + this.props.dist + ' Miles'}</Text>
            </View>
          </View>
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
  wrapper: {
    flex: 1,
    marginLeft: 0,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    flexDirection: 'column',
    marginTop: 12,
    marginLeft: -10,
    // alignItems: 'center',
    height: null,
    width: Layout.window.width,
    position: 'absolute',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: '#b9d3c2',
    flex: 1,
    width: null,
    height: 130,
    marginBottom: 10,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 45,
    fontWeight: '900',
    ...Font.style('elixia'),
    textAlign: 'center',
    flex: 1,
    flexDirection: 'row',
    width: Layout.window.width,
    height: null,
    top: 0,
    marginBottom: 20,
  },
  details: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 40,
  },
  xp: {
    // textAlign: 'left',
    fontSize: 12,
    // alignItems: 'center',
    ...Font.style('luminari'),
    fontWeight: '100',

  },
  experience: {
    fontSize: 20,
    // alignItems: 'center',
    ...Font.style('luminari'),
    fontWeight: '100',
    marginLeft: 40,
  },
  directions: {
    // alignItems: 'center',

  },
  badges: {
    flexDirection: 'column',
    // marginTop: 60,
    marginLeft: 10,
    top: 60,
  },
  spinner: {
    marginTop: 20,
  },
  distance: {
    fontSize: 20,
    ...Font.style('luminari'),
    fontWeight: '100',
    textAlign: 'right',
  },
});
