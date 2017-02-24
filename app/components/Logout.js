import React from 'react';
import { View, Button, StyleSheet } from 'react-native';


class Logout extends React.Component {
	render(){
		return (
			<View>
			  <Button title="Logout" onPress={this.props.onLogout} />
			</View>
		);
	}
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F7F7F7',
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: '300',
  },
  heading2: {
    fontSize: 20,
    fontWeight: '200',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '100',
    color: 'gray',
  },
  label: {
    fontSize: 16,
    fontWeight: '200',
  },
  image: {
    width: 200,
    height: 200,
  },
  badge: {
    width: 75,
    height: 75,
  },
  group: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
  },
});

export default Logout;
