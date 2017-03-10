import React from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert } from 'react-native';
import Logout from '../containers/Logout';
import CharacterCreate from './CharacterCreate';
import Party from '../containers/PartyContainer';
import PartyList from './PartyList'
import { Font } from 'exponent';
import socket from '../socket/socket';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 20,
  },
  backgroundImage: {
    justifyContent: 'flex-start',
    flex: 1,
    resizeMode: 'stretch',
  },
  heading: {
    ...Font.style('elixia'),
    fontSize: 55,
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
  },
  heading2: {
    ...Font.style('luminari'),
    fontSize: 30,
    fontWeight: '400',
  },
  subtitle: {
    ...Font.style('luminari'),
    fontSize: 20,
    fontWeight: '100',
    color: 'gray',
    textAlign: 'center',
  },
  titles: {
    alignSelf: 'center',
  },
  group: {
    marginLeft: 140,
    marginTop: 40,
  },
  label: {
    ...Font.style('luminari'),
    fontSize: 16,
    fontWeight: '100',
    color: '#336A73',
  },
  image: {
    width: 200,
    height: 200,
  },
  icon: {
    alignItems: 'flex-start',
    flex: 1,
    position: 'absolute',
    // marginLeft: ,
    marginTop: 60,
  },
  logoout: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    bottom: 0,
  },
});

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      createCharVisible: false,
      name: null,
      user_id: null,
      char_id: null,
      level: null,
      experience: null,
      classType: null,
    };

    this.handleCreateOrClose = this.handleCreateOrClose.bind(this);
  }

  componentDidMount() {
    console.log('USER PROF DID MOUNT: ', this.props.user);
    socket.on('make character', () => {
      console.log('ON MAKE CHAR', this.props.user);
      this.setState({ createCharVisible: true });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        name: nextProps.user.name,
        user_id: nextProps.user.user_id,
        char_id: nextProps.user.char_id,
        level: nextProps.user.level,
        experience: nextProps.user.experience,
        classType: nextProps.user.classType,
      });
    }
    if (nextProps.user.user_id && nextProps.user.level !== this.props.user.level) {
      Alert.alert('You have leveled up to level ' + nextProps.user.level);
    }
  }

  handleCreateOrClose() {
    this.setState({ createCharVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.createCharVisible}
          onRequestClose={() => { alert("Modal has been closed.")}}
          style={styles.modal}
        >
          <CharacterCreate userid={this.state.user_id} handleCreateOrClose={this.handleCreateOrClose} onCreateCharacter={this.props.onCreateCharacter} />
        </Modal>
        <View style={styles.titles}>
          <Text style={styles.heading}>
            {this.state.name}
          </Text>
          <Text style={styles.subtitle}>
            {this.state.classType}
          </Text>
        </View>
        <View style={styles.group}>
        </View>
        <View style={styles.icon}>
          {
            this.state.classType === 'Ostentatious Orc' ?
              <Image style={styles.icon} source={require('../assets/icons/goblin-small.png')} /> :
            this.state.classType === 'Noble Knight' ?
              <Image style={styles.icon} source={require('../assets/icons/knight-small.png')} /> :
            this.state.classType === 'Wise Wizard' ?
              <Image style={styles.icon} source={require('../assets/icons/wizard-small.png')} /> :
            this.state.classType === 'Dignified Dwarf' ?
              <Image style={styles.icon} source={require('../assets/icons/dwarf-small.png')} /> :
            null
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>

            Level: {this.state.level}
          </Text>
          <Text style={styles.label}>
            Experience: {this.state.experience}
          </Text>
        </View>
        <Party />
        <PartyList party={this.props.party} user={this.props.user} />
        <Logout style={styles.logout}/>
      </View>
    );
  }
}

export default UserProfile;
