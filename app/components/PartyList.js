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
      props.party.quest ? 
        <Text style={styles.title}>Current Expedition: <Text style={{...Font.style('elixia'), fontSize: 35}}>{'\n' + props.party.quest.name}</Text></Text> : null
    }
    {
      props.party.members ?
      props.party.members.map((member, i) => {
        if (member.id !== props.user.char_id) {
          return (
            <View style={styles.container} key={i}>
              {
                member.classType === 'Ostentatious Orc' ?
                  <Image key={i} style={styles.icon} source={require('../assets/icons/goblin-party.png')} /> :
                member.classType === 'Noble Knight' ?
                  <Image key={i} style={styles.icon} source={require('../assets/icons/knight-party.png')} /> :
                member.classType === 'Wise Wizard' ?
                  <Image key={i} style={styles.icon} source={require('../assets/icons/wizard-party.png')} /> :
                member.classType === 'Dignified Dwarf' ?
                  <Image key={i} style={styles.icon} source={require('../assets/icons/dwarf-party.png')} /> :
                null
              }
              <Text key={member.name} style={styles.name}>{member.name}</Text>
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
    marginTop: 50,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'column',
    flex: 1,
    height: 70,
    bottom: 0,
    marginTop: 5,
  },
  title: {
    // position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    ...Font.style('livingst'),
    textAlign: 'center',
    fontSize: 30,
    width: 350,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    ...Font.style('elixia'),
    textAlign: 'left',
    marginLeft: 130,
    fontSize: 30,
    width: 350,
    alignSelf: 'center',
    marginTop: 20,
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: 60,

  },
});