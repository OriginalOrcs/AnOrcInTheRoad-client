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
  Image,
  Dimensions,
  TouchableOpacity,
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
import { userLogin, updateQuests } from './actions/actions';

export const store = createStore(reducers);

import jwtDecoder from 'jwt-decode';

import socket from './socket/socket.js';
import io from 'socket.io-client';
import { Font } from 'exponent';

let redirectUri;
if (Exponent.Constants.manifest.xde) {
  redirectUri = `exp://66-j7v.woobianca.app.exp.direct/+/redirect`;
} else {
    console.log('CONSTANTS MANIFEST ',Exponent.Constants.linkingUri)
  redirectUri = `${Exponent.Constants.linkingUri}/redirect`;
}

const auth0ClientId = 'vDeBBemEERpMdpAG24zlAdIg2CCIWiQ2';
const auth0Domain = 'https://originalorcs.auth0.com';

class AppContainer extends React.Component {
  state = { 
    appIsReady: false, 
    name: undefined,
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
      scope: 'openid nickname user_id',
      redirect_uri: redirectUri,
      state: redirectUri,
    });
    console.log('REDIRECTION URL: ', redirectionURL)
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
    const name = decodedToken.nickname;
    const user_id = decodedToken.user_id;
    this.setState({name});
    store.dispatch(userLogin(name, user_id));
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
          {'elixia': require('./assets/fonts/ELIXIA.ttf')},
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
    if (!this.state.name) {
      return (
        <View style={styles.container}>
          <Image source={require('./assets/images/orc-background.gif')} style={styles.backgroundImage}>
            <View style={styles.title}>
              <Image style={styles.titleImg} source={require('./assets/images/title.png')} />
            </View>
            <View style={styles.loginBtn}>
              <TouchableOpacity onPress={() => this._loginWithAuth0()}>
                  <Image style={styles.imagestyle} source= {require('./assets/buttons/login-button.png')} />
              </TouchableOpacity>
            </View>
          </Image>
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

let { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    alignItems:'center',
    marginTop: 80,
    borderRadius: 10,
    width: width,
  },
  titleImg: {
    resizeMode: 'contain',
  },
  statusBarUnderlay: {
    height: 24,
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'stretch'
  },
  loginBtn: {
    marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    width: width,
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
});

Exponent.registerRootComponent(AppContainer);
