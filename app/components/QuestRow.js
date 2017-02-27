import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '100',
    color: 'gray',
  },
  label: {
    fontSize: 16,
    fontWeight: '200',
  },
});


class QuestRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS from QROW: ', nextProps)
  }

  render() {
    const rowPress = () => {
      console.log('You have pressed row');
    };
    console.log('ROW PROPS: ', this.props);
    return (
      <View style={styles.container} >
        <Text style={styles.title} onPress={rowPress}>
          {this.props.quest.name}
        </Text>
        {this.props.showDetails ?
          <View onPress={() => this.props.toggleQuest(this.props.quest.id)}>
            <Text style={styles.subtitle}>{this.props.quest.questType}</Text>
            <Text style={styles.label}>Distance: 0.04 Miles</Text>
            <Text style={styles.subtitle}>Lat: {this.props.quest.lat} | Lng: {this.props.quest.lng} </Text>
            <Text style={styles.label}>Rewards: {this.props.quest.experience} EXP</Text>
          </View>
        : null}
      </View>
    );
  }
}

QuestRow.propTypes = {
  quest: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    questType: React.PropTypes.string.isRequired,
    experience: React.PropTypes.number.isRequired,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
  }).isRequired,
  showDetails: React.PropTypes.bool.isRequired,
};

export default QuestRow;
