import React from 'react';
import { View,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import PartyList from './PartyList';
import { Font } from 'exponent';
import socket from '../socket/socket';
import Layout from '../constants/Layout';


class Party extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      nextModalVisible: false,
      friend: null,
      quest: null,
    };
    this.onUnite = this.onUnite.bind(this);
  }
  
  static route = {
    navigationBar: {
      visible: false,
    }
  };

  componentDidMount() {
    if (this.props.party.length){
      this.fetchParty(this.props.user.char_id);
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onUnite() {
    this.setModalVisible(true);
    // if (!this.props.createdParty && !this.props.party.length){
    //   this.createParty(this.props.user.user_id,);
    // }
  }

  createParty(id, quest) {
    socket.emit('create party', id, this.state.quest);
  }

  fetchParty(char_id) {
    socket.emit('get party', char_id);
  }

  onAddFriend(user_id, target_name) {
    socket.emit('add to party', user_id, target_name);
  }

  onLeaveParty() {
    socket.emit('leave party', this.props.user.char_id);
  }

  selectQuest(quest) {
    this.setState({quest});
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          style={styles.modal}
        >
        <Image style={styles.scroll} source={require('../assets/images/quest-create.png')} >
          <Text style={styles.choose}>Select a quest:</Text>
          <View style={styles.scrollBackground}>
          <ScrollView contentContainerStyle={styles.scrollView}>
              {
                this.props.quests ?
                this.props.quests.map(quest =>
                  <TouchableOpacity key={quest.id} style={styles.row} onPress={() => this.selectQuest(quest)}>
                    <Text style={styles.name}>{quest.name}</Text>
                  </TouchableOpacity>
                )
              : null}
          </ScrollView>
          </View>
          <View style={styles.questBox}>
            { 
              this.props.quests && this.state.quest ?
              <Text style={styles.selectedQuest}>{this.state.quest.name}</Text> : null
            } 
          </View>
          <View style={styles.below}>
            <TouchableOpacity
              onPress={() => {
                this.createParty(
                  this.props.user.user_id,
                  this.state.quest,
                );
                this.setModalVisible(false);
                this.setState({nextModalVisible: true});
              }}
              style={styles.submitButton}
            >
           
              
              <Text style={styles.buttonText}>Create Expedition</Text>
            
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(false);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Image> 
        </Modal>
        <Modal
          animationType={'none'}
          transparent={false}
          visible={this.state.nextModalVisible}
          style={styles.modal}
        >
          <Image style={styles.scroll} source={require('../assets/images/quest-create.png')} >
            <View style={styles.container}>
             <Text style={styles.choose}>Add a friend:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(friend) => this.setState({ friend: friend })}
              placeholder="Friend"
              value={this.state.friend}
              maxLength = {20}
              autoCorrect = {false}
              returnKeyType = {'done'}
            />
            </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() =>  {
                this.onAddFriend(
                  this.props.user.user_id,
                  this.state.friend,
                );
                this.setState({nextModalVisible: false});
              }}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>Invite Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({nextModalVisible: false});
              }}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </Image>
        </Modal>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.onUnite(true);
            }}
            style={styles.uniteButton}
          >
            <Text style={styles.buttonText}>Unite+</Text>
          </TouchableOpacity>
          {
            this.props.party.length ?
            <TouchableOpacity
              onPress={() => {
                this.onLeaveParty();
              }}
              style={styles.leaveButton}
            >
              <Text style={styles.buttonText}>Withdraw-</Text>
            </TouchableOpacity>
            : null
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choose: {
    fontSize: 30,
    marginTop: 30,
    textAlign: 'center',
    flexDirection: 'row',
    color: '#336A73',
    ...Font.style('livingst'),
    fontWeight: '900',
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
  group: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
  },
  leaveButton: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#336A73',
    width: 130,
    height: 45,
    borderColor: '#b9d3c2',
    borderWidth: 2,
    marginTop: 50,
    marginLeft: 120,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  uniteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#336A73',
    width: 140,
    height: 45,
    borderColor: '#b9d3c2',
    borderWidth: 2,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  submitButton: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#828831',
    width: 240,
    height: 45,
    borderColor: '#336A73',
    borderWidth: 2,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  closeButton: {
   flexDirection: 'row',
   backgroundColor: '#B4B4AC',
   width: 140,
   height: 40,
   borderColor: '#336A73',
   borderWidth: 2,
   marginTop: 20,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 10,
   alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 23,
    fontWeight: '400',
    ...Font.style('livingst'),
    borderRadius: 10,
  },
  input: {
    marginTop: 50,
    width: Layout.window.width / 1.5,
    alignSelf: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    fontSize: 25,
    ...Font.style('luminari'),
  },
  name: {
    fontSize: 30,
    // marginTop: 10,
    textAlign: 'center',
    flexDirection: 'row',
    color: 'black',
    ...Font.style('elixia'),
    fontWeight: '900',
    backgroundColor: 'rgba(0,0,0,0)',
    // borderWidth: 1,
    padding: 5,
  },
  row: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#b9d3c2',
  },
  scroll: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    // padding: 35,
  },
  scrollView: {
    flex: 0,
    // backgroundColor: '#336A73',
    marginTop: 20,
    marginBottom: 50,
    width: Layout.window.width,
    alignSelf: 'center',
  },
  scrollBackground: {
    height: Layout.window.height / 2,
  },
  selectedQuest: {
    // position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    ...Font.style('elixia'),
    textAlign: 'center',
    fontSize: 35,
    top: 65,
  },
  questBox: {
    bottom: 30,
  },
  below: {
    flex: 1,
    bottom: 45,
    marginLeft: 105,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  footer: {
    marginBottom: 80,
  }
});


export default Party;