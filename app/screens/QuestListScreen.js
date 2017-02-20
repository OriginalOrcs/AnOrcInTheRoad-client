import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import QuestList from '../components/QuestList'
import quests from '../constants/quests.json'

export default class QuestListScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Quests',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <QuestList quests={quests} />

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
