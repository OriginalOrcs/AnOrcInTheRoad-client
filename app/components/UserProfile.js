import React from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert } from 'react-native';
import Logout from '../containers/Logout';
import CharacterCreate from './CharacterCreate';
import Party from '../containers/PartyContainer';
import PartyList from './PartyList'
import { Font } from 'exponent';
import socket from '../socket/socket';
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // margin: 20,
    paddingBottom: 30,
  },
  backgroundImage: {
    justifyContent: 'flex-start',
    flex: 1,
    resizeMode: 'stretch',
  },
  heading: {
    ...Font.style('elixia'),
    fontSize: 65,
    fontWeight: '900',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 40,
    width: Layout.window.width,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  heading2: {
    ...Font.style('luminari'),
    fontSize: 30,
    fontWeight: '400',
  },
  subtitle: {
    ...Font.style('livingst'),
    fontSize: 23,
    fontWeight: '100',
    color: '#B4B4AD',
    textAlign: 'center',
    marginLeft: 95,
    marginTop: 150,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  titles: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    height: 170,
    marginLeft: 60,
    padding: 30,
    paddingTop: 40,
  },
  group: {
    marginTop: 15,
    marginLeft: -270,
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    // backgroundColor: 'gray',
    // width: Layout.window.width,
    alignItems: 'center',
    height: 40,
  },
  xp: {
    ...Font.style('livingst'),
    fontSize: 23,
    fontWeight: '100',
    color: '#336A73',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    textAlign: 'center',
  },
  level: {
    ...Font.style('livingst'),
    fontSize: 23,
    fontWeight: '100',
    color: '#336A73',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    marginLeft: 190,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  icon: {
    alignItems: 'flex-start',
    flex: 1,
    position: 'absolute',
    marginLeft: 25,
    marginTop: 35,
  },
  logout: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  bricks: {
    flex: 1,
    alignSelf: 'center',
  },
  headerImage: {
    borderBottomWidth: 8,
    borderBottomColor: '#336A73',
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
    console.log('comp will receive user prof: ', nextProps);
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
    if (nextProps.user.user_id && nextProps.user.level !== this.props.user.level && nextProps.user.level !== 1) {
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
        <View style={styles.headerImage}>
        <Image style={styles.bricks} source={require('../assets/images/bricks.png')}> 
          <Text style={styles.subtitle}>
            {this.state.classType}
          </Text>
        </Image>
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
          <Text style={styles.heading}>
            {this.state.name}
          </Text>
        <View style={styles.group}>
          <Text style={styles.xp}>
            {this.state.experience + '\nExperience'}
          </Text>
          <Text style={styles.level}>
            {this.state.level + '\nLevel'}
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
