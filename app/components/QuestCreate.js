import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, Slider, Picker, ScrollView, Image, TouchableOpacity, DatePickerIOS } from 'react-native';
import { Font } from 'exponent';
import MapCreate from './MapQuest';
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b9d3c2',
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
    color: '#FAFAFA',
    fontSize: 25,
    fontWeight: '600',
    ...Font.style('livingst'),
    borderRadius: 10,
  },
  input: {
    height: 40,
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
    // padding: 35,
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
      questType: null,
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
    const timestamp = Date.now();
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
              <TouchableHighlight
                onPress={() => this.setState({
                  detailsVisible: true,
                  modalVisible: false,
                })}
                style={styles.submitButton}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(false);
                }}
                style={styles.closeButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
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
            <View style={styles.container}>
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
                    <TouchableOpacity onPress={() => this.setSundialFilter('start')} style={styles.filterButton}>
                      <Text>Start Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setSundialFilter('end')} style={[styles.filterButton, styles.middleButton]}>
                      <Text>End Time</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {this.state.showStartTime ?
                      <View>
                        <Text>Start Time</Text>
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
                        <Text>End Time</Text>
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
              <TouchableHighlight
                onPress={() => this.createQuest()}
                style={styles.submitButton}
              >
                <Text style={styles.buttonText}>Submit Quest</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setState({detailsVisible: false});
                }}
                style={styles.closeButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Image>
        </Modal>
        <View>
          <TouchableHighlight
            onPress={() => {
              this.setState({ modalVisible: true });
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
