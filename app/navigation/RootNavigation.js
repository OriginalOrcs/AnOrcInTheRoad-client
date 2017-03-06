import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Notifications,
} from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation
        tabBarHeight={40}
        initialTab="home">
        <TabNavigationItem
          style={styles.container}
          id="home"
          renderIcon={isSelected => this._renderIcon('user-o', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          style={styles.container}
          id="quests"
          renderIcon={isSelected => this._renderIcon('flag-o', isSelected)}>
          <StackNavigation initialRoute="quests" />
        </TabNavigationItem>

        <TabNavigationItem
          style={styles.container}
          id="map"
          renderIcon={isSelected => this._renderIcon('map-o', isSelected)}>
          <StackNavigation initialRoute="map" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({origin, data}) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2d0b9',
  },
  selectedTab: {
    backgroundColor: '#d2d0b9',
    color: Colors.tabIconSelected,
  },
});
