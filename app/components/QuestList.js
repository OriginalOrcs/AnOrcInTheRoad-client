import React from 'react';
import { View, ListView, StyleSheet, Text, TouchableHighlight } from 'react-native';
import QuestRow from './QuestRow';

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
});

class QuestList extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.quests),
    };
  }

  rowPress() {
    console.log('You have pressed row');
  }


  pressNewQuest() {
    console.log('You have pressed the New Quest button');
  }

  renderRow(quest) {
    return (
      <QuestRow quest={quest} rowPress={this.rowPress} showDetails={true} />
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.pressNewQuest}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Create New Quest
          </Text>
        </TouchableHighlight>
        <ListView
          key={this.state.quests}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeperator={this.renderSeperator}
        />
      </View>
    );
  }

}

QuestList.propTypes = {
  quests: React.PropTypes
    .arrayOf(React.PropTypes.object).isRequired,
};

export default QuestList;
