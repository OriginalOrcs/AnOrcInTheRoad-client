import React from 'react';
import { View, ListView, StyleSheet, TouchableHighlight, Text } from 'react-native';
import QuestRow from './QuestRow';
import QuestCreate from './QuestCreate';
import socket from '../socket/socket';
import { updateQuests } from '../actions/actions'
import geolib from 'geolib';

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: '#b9d3c2',
    flex: 1,
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
    backgroundColor: '#b9d3c2',
  },
  listView: {
    backgroundColor: '#b9d3c2',

  },
});

class QuestList extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.questsWithDistance),
      modalVisible: true,
      char_id: this.props.user.char_id,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuests(this.props.user.char_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questsWithDistance !== this.props.questsWithDistance) {
      // var questsWithDistance = this.addDistanceToQuests(nextProps.quests);
      this.setState({
        elements: nextProps.questsWithDistance,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.questsWithDistance),
      });
    }
  }
 
  renderRow(quest) {
    return (
      <QuestRow quest={quest} showDetails={true} dist={quest.distance} id={this.props.user.char_id} toggleQuest={this.props.toggleActiveQuest} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.createQuest}>
          <QuestCreate onSubmitQuest={this.props.onSubmitQuest} user={this.props.user} lat={this.props.lat} lng={this.props.lng} />
        </View>
        <View style={styles.container}>
          <View style={styles.createQuest}>
          {this.props.quests ?
            <ListView
              key={this.props.quests}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSeperator={this.renderSeperator}
              enableEmptySections={true}
              contentContainerStyle={styles.listView}
            />
            : null }
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
