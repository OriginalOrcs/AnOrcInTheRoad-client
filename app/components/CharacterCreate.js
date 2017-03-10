import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, ScrollView, Slider, Picker, Image } from 'react-native';
import { Font } from 'exponent';
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    alignSelf: 'stretch',
  },
  scroll: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },  
  modal: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '300',
    ...Font.style('luminari'),
  },
  heading2: {
    fontSize: 20,
    fontWeight: '200',
    ...Font.style('luminari'),
  },
  label: {
    marginLeft: 20,
    marginBottom: 0,
    fontSize: 16,
    fontWeight: '200',
    ...Font.style('luminari'),
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
  submitButton: {
    backgroundColor: '#336A73',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 180,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    borderRadius: 10,
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
    fontSize: 25,
    fontWeight: '600',
    ...Font.style('luminari'),
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: Layout.window.width / 1.25,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 20,
    ...Font.style('luminari'),
  },

  picker: {
    padding: 50,
    flex: 1,
    marginTop: 80,
  },
  pickerItem: {
    width: 10,
    ...Font.style('luminari'),
  },
  title: {
    fontSize: 50,
    fontWeight: '300',
    marginBottom: 20,
    alignSelf: 'center',
    ...Font.style('elixia'),
  },
  icons: {
    alignSelf: 'center',
    flex: 1,
  },
  icon: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-end',
  },
});

class CharacterCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classType: 'Ostentatious Orc',
    };
  }

  render() {
    console.log('CHARACTER CREATE PROPS', this.props);
    return (
      <View style={styles.container}>
        <Image style={styles.scroll} source={require('../assets/images/quest-create.png')}>
          <View style={styles.modal}>
            <Text style={styles.title} >Create A Character</Text>
            <TextInput
              style={styles.input}
              onChangeText={name => this.setState({ name })}
              placeholder=" Character Name"
              value={this.state.name}
              autoCorrect = {false}
              maxLength = {15}
            />
            <View style={styles.icons}>
              {
                this.state.classType === 'Ostentatious Orc' ?
                  <Image itemStyle={styles.icon} source={require('../assets/icons/goblin-small.png')}/> :
                this.state.classType === 'Noble Knight' ?
                  <Image itemStyle={styles.icon} source={require('../assets/icons/knight-small.png')}/> :
                this.state.classType === 'Wise Wizard' ?
                  <Image itemStyle={styles.icon} source={require('../assets/icons/wizard-small.png')}/> :
                this.state.classType === 'Dignified Dwarf' ?
                  <Image itemStyle={styles.icon} source={require('../assets/icons/dwarf-small.png')}/> :
                null
              }
            </View>
            <Picker
              selectedValue={this.state.classType}
              onValueChange={itemValue => this.setState({ classType: itemValue })}
              style={styles.picker}
            >
              <Picker.Item style={styles.pickerItem} label="Ostentatious Orc" value="Ostentatious Orc" />
              <Picker.Item style={styles.pickerItem} label="Noble Knight" value="Noble Knight" />
              <Picker.Item style={styles.pickerItem} label="Wise Wizard" value="Wise Wizard" />
              <Picker.Item style={styles.pickerItem} label="Dignified Dwarf" value="Dignified Dwarf" />
            </Picker>
            <TouchableHighlight
              onPress={() => {
                this.props.onCreateCharacter(
                  this.props.userid,
                  this.state.name,
                  this.state.classType,
                );
                this.props.handleCreateOrClose();
              }}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>Create Character</Text>
            </TouchableHighlight>
          </View>
          </Image>
        </View>
    );
  }
}

export default CharacterCreate;
