import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, Slider, Picker, ScrollView } from 'react-native';
import CreateQuestMap from '../screens/MapScreen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
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
    fontWeight: '200',
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
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#333',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'green',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
  },
  modal: {
    paddingTop: 80,
    paddingBottom: 50,
  },
  picker: {
    padding: 50,
  },
  map: {
    paddingTop: 100,
  },
});

class QuestCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: null,
      location: null,
      experience: null,
      questType: 'addFetchQuest',
      item_id: null,
      creator_id: null,
      lat: null,
      lng: null,
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    console.log('QUEST CREATE PROPS', this.props);
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          style={styles.modal}
        >
          <ScrollView contentContainerStyle={styles.modal}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              placeholder="Quest Name"
              value={this.state.name}
              maxLength = {60}
              autoCorrect = {false}
              returnKeyType = {'done'}
            />
            <TextInput
              style={styles.input}
              onChangeText={(location) => this.setState({ location })}
              placeholder="Location"
              value={this.state.location}
              maxLength = {150}
              autoCorrect = {false}
              returnKeyType = {'done'}
            />
            <Text style={styles.label}>Experience: {this.state.experience}</Text>
            <Slider
              style={styles.input}
              minimumValue={0}
              maximumValue={99999}
              onSlidingComplete={(experience) => this.setState({ experience })}
            />
            <TextInput
              style={styles.input}
              onChangeText={(item_id) => this.setState({ item_id })}
              placeholder="Item Reward"
              value={this.state.item_id}
              maxLength = {60}
              autoCorrect = {false}
              returnKeyType = {'done'}
            />            
            <Picker
              selectedValue={this.state.questType}
              onValueChange={(itemValue) => this.setState({ questType: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Fetch Quest" value="addFetchQuest" />
              <Picker.Item label="Battle - Solo" value="addBattleSoloQuest" />
              <Picker.Item label="Battle - Co-op" value="addCoopSoloQuest" />
            </Picker>
            <TouchableHighlight
              onPress={() => {
                this.props.onSubmitQuest(
                  this.state.name,
                  this.state.location,
                  this.state.questType,
                  this.state.experience,
                  this.state.creator_id,
                  this.state.lat,
                  this.state.lng,
                  this.state.item_id,
                );
                this.setModalVisible(false);
              }}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>Submit Quest</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Close Menu</Text>
            </TouchableHighlight>
          </ScrollView>
        </Modal>
        <View>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>Create New Quest</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default QuestCreate;
