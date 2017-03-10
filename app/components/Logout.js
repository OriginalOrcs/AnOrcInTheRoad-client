import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { Font } from 'exponent';

let { height, width } = Dimensions.get('window')

class Logout extends React.Component {
	render(){
		return (
			<View style={styles.btn}>
			  <Text style={styles.btnText} onPress={this.props.onLogout}>Logout</Text>
			</View>
		);
	}
}


const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#b9d3c2',
    width: 150,
    height: 40,
    borderColor: '#336A73',
    borderWidth: 2,
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    ...Font.style('livingst'),
    borderRadius: 10,
  },
});

export default Logout;
