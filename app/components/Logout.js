import React from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  StyleSheet } from 'react-native';
import { Font } from 'exponent';


const Logout = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={props.onLogout}>
        <Text style={styles.btnText} >Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: '#B4B4AC',
    width: 100,
    height: 30,
    borderColor: '#336A73',
    alignSelf: 'center',
    borderWidth: 2,
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    ...Font.style('livingst'),
    borderRadius: 10,
  },
});

export default Logout;
