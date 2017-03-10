import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import QuestList from '../components/QuestList'
import quests from '../constants/quests.json'
import VisibleQuestList from '../containers/VisibleQuestList'
import MapCreate from '../components/MapQuest';

export default class QuestListScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <View style={styles.container}>
       <StatusBar hidden={true} />
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
    backgroundColor: '#b9d3c2',
    padding: 10,
  },
});
