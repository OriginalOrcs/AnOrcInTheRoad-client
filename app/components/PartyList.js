import React from 'react';
import { View,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Font } from 'exponent';

export default PartyList = (props) => (
  <View style={styles.wrapper}>
    {
      props.party ?
        props.party.map(member => {
          if (member.id !== props.user.char_id) {
            return (
              <View style={styles.container} key={member.id}>
                {
                  member.classType === 'orc' ?
                    <Image style={styles.icon} source={require('../assets/icons/goblin-party.png')} /> :
                  member.classType === 'knight' ?
                    <Image style={styles.icon} source={require('../assets/icons/knight-party.png')} /> :
                  member.classType === 'wizard' ?
                    <Image style={styles.icon} source={require('../assets/icons/wizard-party.png')} /> :
                  member.classType === 'dwarf' ?
                    <Image style={styles.icon} source={require('../assets/icons/dwarf-party.png')} /> :
                  null
                }
                <Text style={styles.name}>{member.name}</Text>
              </View>
            );
          }
        }
        )
      : null
    }
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginLeft: 0,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'column',
    flex: 1,
    height: 200,
    bottom: 0,
  },
  name: {
    fontSize: 20,
    flexDirection: 'row',
    ...Font.style('luminari'),
    fontWeight: '100',
    width: null,
    height: null,
    alignItems: 'center',
    position: 'absolute',
    marginLeft: 150,
    marginTop: 50,
  },
  icon: {
    flexDirection: 'row',
  },
});