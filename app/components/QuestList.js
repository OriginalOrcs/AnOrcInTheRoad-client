import React from 'react';
import { View, ListView, StyleSheet, TouchableHighlight, Text } from 'react-native';
import QuestRow from './QuestRow';
import QuestCreate from './QuestCreate';
import socket from '../socket/socket';
import { updateQuests } from '../actions/actions'


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
  createQuest: {
    paddingBottom: 20,
  },
});

class QuestList extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.quests),
      modalVisible: true,
    };
  }

  componentDidMount() {
    this.props.fetchQuests();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quests !== this.props.quests) {
      this.setState({
        elements: nextProps.quests,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.quests),
      });
    }
  }



  renderRow(quest) {
    return (
      <QuestRow quest={quest} showDetails={true} />
    );
  }
  render() {
    console.log('quest list component PROPS', this.props);
    return (
      <View>
        <View> 
          <TouchableHighlight
            onPress={() => {
              this.props.pingLocation();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Ping Location</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              console.log('create watcher on press', this.props);
              if (this.props.watcherSub.watcherSub) {
                return;
              } else {
                this.props.createLocationWatcher();
              }
              // this.props.createLocationWatcher();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Create Location Watcher</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              console.log('remove watcher on press', this.props);
              this.props.removeLocationWatcher(this.props.watcherSub.watcherSub);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Remove Location Watcher</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.createQuest}>
          <QuestCreate onSubmitQuest={this.props.onSubmitQuest} />
        </View>
        <View style={styles.container}>
          <View style={styles.createQuest}>
            <ListView
              key={this.props.quests}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSeperator={this.renderSeperator}
              enableEmptySections={true}
            />
          </View>
        </View>
      </View>
    );
  }

}

QuestList.propTypes = {
  quests: React.PropTypes
    .arrayOf(React.PropTypes.object).isRequired,
};

export default QuestList;
