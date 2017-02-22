import Exponent from 'exponent';
import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Linking,
  Text,
  Button,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

import { Provider } from 'react-redux';
import reducers from './reducers/index'

import io from 'socket.io-client';

let socket = io('http://10.7.24.229:3000');
const store = createStore(reducers);

import jwtDecoder from 'jwt-decode';

let redirectUri;
if (Exponent.Constants.manifest.xde) {
  redirectUri = `exp://u3-8hi.woobianca.app.exp.direct/+/redirect`;
} else {
  redirectUri = `${Exponent.Constants.linkingUri}/redirect`;
}

const auth0ClientId = 'vDeBBemEERpMdpAG24zlAdIg2CCIWiQ2';
const auth0Domain = 'https://originalorcs.auth0.com';

class AppContainer extends React.Component {
  state = {
    appIsReady: false, 
    username: undefined,
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleAuth0Redirect);
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loginWithAuth0 = async () => {
    const redirectionURL = `${auth0Domain}/authorize` + this._toQueryString({
      client_id: auth0ClientId,
      response_type: 'token',
      scope: 'openid name',
      redirect_uri: redirectUri,
      state: redirectUri,
    });
    Exponent.WebBrowser.openBrowserAsync(redirectionURL);
  }

  _handleAuth0Redirect = async (event) => {
    if (!event.url.includes('+/redirect')) {
      return;
    }
    Exponent.WebBrowser.dismissBrowser();
    const [, queryString] = event.url.split('#');
    const responseObj = queryString.split('&').reduce((map, pair) => {
      const [key, value] = pair.split('=');
      map[key] = value; // eslint-disable-line
      return map;
    }, {});
    const encodedToken = responseObj.id_token;
    const decodedToken = jwtDecoder(encodedToken);
    const username = decodedToken.name;
    this.setState({ username });
  }

  _toQueryString(params) {
    return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/images/exponent-wordmark.png'),
        ],
        fonts: [
          FontAwesome.font,
          {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
          {'livingst': require('./assets/fonts/Livingst.ttf')},
        ],
      });
    } catch(e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({appIsReady: true});
    }
  }

  render() {
    if (!this.state.username) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Example: Auth0 login</Text>
          <Button title="Login with Auth0" onPress={this._loginWithAuth0} />
        </View>
      )
    } else if (this.state.appIsReady) {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <NavigationProvider router={Router}>
              <StackNavigation id="root" initialRoute={Router.getRoute('rootNavigation')} />
            </NavigationProvider>

            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          </View>
        </Provider>
      );
    } else {
      return (
        <Exponent.Components.AppLoading />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default socket;

Exponent.registerRootComponent(AppContainer);
