import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import QuestList from '../components/QuestList'
import quests from '../constants/quests.json'
import VisibleQuestList from '../containers/VisibleQuestList'
import MapCreate from '../components/MapQuest';

export default class QuestListScreen extends React.Component {
  static route = {
    navigationBar: {
      height: 20,
    },
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <VisibleQuestList />
      </ScrollView>   
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#510609',
  },
});
