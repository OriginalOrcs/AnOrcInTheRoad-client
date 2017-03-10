import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Slider, Picker, ScrollView, Image, DatePickerIOS, Alert } from 'react-native';
import { Font } from 'exponent';
import MapCreate from './MapQuest';
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b9d3c2',
    flex: 1,
    justifyContent: 'flex-start',
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

  
  group: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Font.style('luminari'),
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#701616',
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
  modal: {
    paddingTop: 30,
    paddingBottom: 50,
  },
  picker: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  map: {
    backgroundColor: '#fff',
    height: Layout.window.height / 2.5,
    width: Layout.window.width / 2,
  },
  scroll: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    height: Layout.window.height / 1.5,
  },
  slider: {
    width: Layout.window.width - 30,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  filterButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  pickerContainer: {
    // marginTop: 35,
    height: 300,
    // overflow: 'hidden',
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'column',
  },
  footer: {
    // paddingTop: 35,
    paddingLeft: 35,
    paddingRight: 35,
    // paddingBottom: 20,
    marginBottom: 20,
    marginTop: 180,
  },
  container_2: {
    backgroundColor: '#b9d3c2',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 35,
  },
  time: {
    alignSelf: 'center',
    ...Font.style('elixia'),
    fontSize: 25,
    color: '#b9d3c2',
  },
});

class QuestCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      pickerVisible: true,
      nextModalVisible: true,
      name: null,
      location: null,
      experience: null,
      questType: 'addFetchQuest',
      item_id: null,
      creator_id: null,
      lat: null,
      lng: null,
      cryptoMessage: "",
      startDate: new Date,
      endDate: new Date,
      showStartTime: true,
      showEndTime: false,
      detailsVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setDetailsVisible = this.setDetailsVisible.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
  }

  validateInputs() {
    if (!(this.state.name && this.props.user.char_id)) {
      return false;
    }
    if (this.state.questType === 'addCryptoQuest') {
      if (this.state.cryptoMessage === '') {
        return false;
      }
    }
    if (this.state.questType === 'addSunDialQuest') {
      if (!this.state.startDate || !this.state.endDate) {
        return false;
      }
    }
    return true;
  }

  onRegionChange(coords) {
    console.log(coords);
    this.setState({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  }
  
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }


  setDetailsVisible(visible) {
    this.setState({
      detailsVisible: visible,
    });
  }

  setSundialFilter(startOrEnd) {
    if (startOrEnd === 'start') {
      this.setState({
        showStartTime: true,
        showEndTime: false,
      });
    } else {
      this.setState({
        showStartTime: false,
        showEndTime: true,
      });
    }
  }

  createQuest() {
    console.log('char id', this.props.user)
    if (this.validateInputs()) {
      const timestamp = Date();
      this.props.onSubmitQuest(
        this.state.name,
        this.props.user.char_id,
        this.state.lat,
        this.state.lng,
        this.state.cryptoMessage,
        this.props.lat,
        this.props.lng,
        timestamp,
        this.state.startDate.getTime(),
        this.state.endDate.getTime(),
        this.state.questType,
      );
      // this.props.setDetailsVisible(false);
      // this.props.setModalVisible(false);
      this.setState({
        detailsVisible: false,
        modalVisible: false,
      });  
    } else {
      Alert.alert('Missing quest inputs');
    }
  }

  setStartDate(date) {
    this.setState({
      startDate: date,
    });
  }

  setEndDate(date) {
    this.setState({
      endDate: date,
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    console.log('QUEST CREATE PROPS', this.props);
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          style={styles.modal}
        >
          <MapCreate style={styles.map} onRegionChange={coords => this.onRegionChange(coords)} />
          <Image style={styles.scroll} source={require('../assets/images/quest-create.png')} >
            <View style={styles.container}>
              <View style={styles.pickerContainer} >
                <Picker
                  selectedValue={this.state.questType}
                  onValueChange={(itemValue) => this.setState({ questType: itemValue })}
                  style={styles.picker}
                >
                  <Picker.Item label="Fetch Quest" value="addFetchQuest" />
                  <Picker.Item label="Crypto Quest" value="addCryptoQuest" />
                  <Picker.Item label="Sundial Quest" value="addSunDialQuest" />
                </Picker>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => this.setState({
                  detailsVisible: true,
                  modalVisible: false,
                })}
                style={[styles.submitButton, {width: 160}]}
              >
                <Text style={styles.buttonText}>Next</Text>
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
          animationType="slide"
          transparent={false}
          visible={this.state.detailsVisible}
          style={styles.modal}
        >
          <Image style={styles.scroll} source={require('../assets/images/quest-create.png')} >
            <View style={styles.container_2}>
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                placeholder="Quest Name"
                value={this.state.name}
                maxLength = {20}
                autoCorrect = {false}
                returnKeyType = {'done'}
              />
              {this.state.questType === 'addCryptoQuest' ?
                <TextInput
                  style={styles.input}
                  onChangeText={(cryptoMessage) => this.setState({ cryptoMessage })}
                  placeholder="Quest Hint"
                  value={this.state.cryptoMessage}
                  maxLength = {30}
                  autoCorrect = {false}
                  returnKeyType = {'done'}
                />
              : null}
              {this.state.questType === 'addSunDialQuest' ?
                <View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.setSundialFilter('start')} style={[styles.filterButton, {backgroundColor: '#b9d3c2'}]}>
                      <Text style={{...Font.style('livingst'), fontSize: 20}}>Start Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setSundialFilter('end')} style={[styles.filterButton, styles.middleButton, {backgroundColor: '#b9d3c2'}]}>
                      <Text style={{...Font.style('livingst'), fontSize: 20}}>End Time</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {this.state.showStartTime ?
                      <View>
                      <Text style={styles.time}>Start Time</Text>
                        <DatePickerIOS
                          date={this.state.startDate}
                          mode="time"
                          onDateChange={this.setStartDate}
                          minuteInterval={10}
                        />
                      </View>
                    : null}
                  </View>
                  <View>
                    {this.state.showEndTime ?
                      <View>
                        <Text style={styles.time}>End Time</Text>
                        <DatePickerIOS
                          date={this.state.endDate}
                          mode="time"
                          onDateChange={this.setEndDate}
                          minuteInterval={10}
                        />
                      </View>
                    : null}
                  </View>
                </View>
              : null}
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => this.createQuest()}
                style={styles.submitButton}
              >
                <Text style={styles.buttonText}>Submit Quest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({detailsVisible: false});
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
              this.setState({ modalVisible: true });
            }}
            style={styles.submitButton}
          >
            <Text style={styles.buttonText}>Create New Quest</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default QuestCreate;
