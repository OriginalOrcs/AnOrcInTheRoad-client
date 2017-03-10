import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

import { Font } from 'exponent';
import UserProfile from '../containers/UserProfileContainer';
// import users from '../constants/users';
import stats from '../constants/stats';


export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <View style={styles.container}>
       <StatusBar hidden={true} />
        <Image source={require('../assets/images/quest-create.png')}>
        <ScrollView 
          contentContainerStyle={styles.content}>
            <UserProfile style={styles.scroll} stats={stats} />
        </ScrollView>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  scroll: {
    // flex: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    padding: 35,
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'center',
    paddingBottom: 30,
  },
});