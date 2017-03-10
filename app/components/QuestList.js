import React from 'react';
import { View, ListView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import QuestRow from './QuestRow';
import QuestCreate from './QuestCreate';
import socket from '../socket/socket';
import { updateQuests } from '../actions/actions'
import geolib from 'geolib';
import { Font } from 'exponent';

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: '#b9d3c2',
    flex: 1,
  },
  container2: {

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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  filterButton: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7e2e0',
    padding: 10,
    borderRadius: 7,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  filters: {
    ...Font.style('livingst'),
    fontSize: 20,
    color: 'rgba(0,0,0,0.75)',
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
      char_id: this.props.user.char_id,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuests(this.props.user.char_id);
  }

  componentWillReceiveProps(nextProps) {
    console.log('questlist nextprops', nextProps);
    if (nextProps.quests !== this.props.quests) {
      this.setState({
        elements: nextProps.quests,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.quests),
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
        <View style={styles.container2}>
          <View style={styles.createQuest}>
          {this.props.quests ?
            <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.props.setFilter('FILTER_INACTIVE')} style={styles.filterButton}>
                  <Text style={styles.filters}>Nearby</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.setFilter('FILTER_ACTIVE')} style={[styles.filterButton, styles.middleButton]}>
                  <Text style={styles.filters}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.setFilter('FILTER_CREATED')} style={styles.filterButton}>
                  <Text style={styles.filters}>Created</Text>
                </TouchableOpacity>
              </View>
              <ListView
                key={this.props.quests}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSeperator={this.renderSeperator}
                enableEmptySections={true}
                contentContainerStyle={styles.listView}
              />
            </View>
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
  setFilter: React.PropTypes.func.isRequired,
  fetchQuests: React.PropTypes.func.isRequired,
};

export default QuestList;
