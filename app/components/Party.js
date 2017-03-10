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


class Party extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      friend: null,
    };
    this.onGatherPress = this.onGatherPress.bind(this);
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

  onGatherPress() {
    this.setModalVisible(true);
    if (!this.props.createdParty && !this.props.party.length){
      this.createParty(this.props.user.user_id);
    }
  }

  createParty(id) {
    socket.emit('create party', id);
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

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          style={styles.modal}
        >
        <Image style={styles.scroll} source={require('../assets/images/quest-create.png')} >
          <ScrollView contentContainerStyle={styles.modal}>
            <TextInput
              style={styles.input}
              onChangeText={(friend) => this.setState({ friend: friend })}
              placeholder="Friend"
              value={this.state.friend}
              maxLength = {20}
              autoCorrect = {false}
              returnKeyType = {'done'}
            />
       
            <TouchableOpacity
              onPress={() => {
                this.onAddFriend(
                  this.props.user.user_id,
                  this.state.friend,
                );
                this.setModalVisible(false);
              }}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>Invite Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </Image> 
        </Modal>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.onGatherPress(true);
            }}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>Gather</Text>
          </TouchableOpacity>
          {
            this.props.party.length ?
            <TouchableOpacity
              onPress={() => {
                this.onLeaveParty();
              }}
              style={styles.addButton}
            >
              <Text style={styles.buttonText}>Leave Party</Text>
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
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 30,
    fontWeight: '300',
  },
  heading2: {
    fontSize: 20,
    fontWeight: '200',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '100',
    color: 'gray',
  },
  label: {
    marginLeft: 20,
    marginBottom: 0,
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: '200',
     ...Font.style('luminari'),
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
  addButton: {
    backgroundColor: '#b9d3c2',
    width: 150,
    height: 60,
    borderColor: '#336A73',
    borderWidth: 2,
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#0eb27e',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#333',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    ...Font.style('livingst'),
    borderRadius: 10,
  },
  input: {
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    fontSize: 28,
    ...Font.style('luminari'),
  },
  scroll: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    padding: 35,
  },
  modal: {
    paddingTop: 30,
    paddingBottom: 50,
  },
});


export default Party;