import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { Font } from 'exponent';

let { height, width } = Dimensions.get('window')

class Logout extends React.Component {
	render(){
		return (
			<View>
			  <Text style={styles.heading} onPress={this.props.onLogout}>Logout</Text>
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
    padding: 20,
    borderColor: '#05A5D1',
    alignItems: 'center',
    width: width,
    flexDirection: 'row',
    fontSize: 20,
    fontWeight: '300',
    ...Font.style('luminari'),
  },
  heading2: {
    fontSize: 20,
    fontWeight: '200',
    ...Font.style('luminari'),
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
