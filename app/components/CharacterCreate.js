import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, ScrollView, Slider, Picker, Image } from 'react-native';


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
    width: 100,
    height: 100,
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
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    marginBottom: 20,
    marginLeft: 20,
  },
});

class CharacterCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedImage !== this.props.selectedImage) {
      this.setState({
        selectedImage: nextProps.selectedImage,
      });
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    console.log('CHARACTER CREATE PROPS', JSON.stringify(this.props));
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
            <Text style={styles.title} >Create A Character</Text>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              placeholder="Character Name"
              value={this.state.name}
            />
            <Picker
              selectedValue={this.state.classType}
              onValueChange={(itemValue) => this.setState({ classType: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Hardcore Orc" value="setClassOrc" />
              <Picker.Item label="Puny Human" value="setClassHuman" />
              <Picker.Item label="Delicate Elf" value="setClassElf" />
              <Picker.Item label="Oafish Dwarf" value="setClassDwarf" />
            </Picker>
            <Image style={styles.image} source={require('../assets/images/3.png')} />
            <TouchableHighlight
              onPress={() => {
                this.props.onCreateCharacter(
                  this.state.name,
                  this.state.classType,
                );
                this.setModalVisible(false);
              }}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>Create Character</Text>
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
            <Text style={styles.buttonText}>Create New Character</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default CharacterCreate;
