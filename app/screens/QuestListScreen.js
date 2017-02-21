import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import QuestList from '../components/QuestList'
import quests from '../constants/quests.json'
import VisibleQuestList from '../containers/VisibleQuestList'

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
        <VisibleQuestList />
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
