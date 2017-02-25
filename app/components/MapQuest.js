// import React from 'react';
// import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, Slider, Picker } from 'react-native';
// import { Components } from 'exponent';
// import data from '../constants/quests.json';

// class MapQuest extends React.Component {
//   render() {
//     let region = {
//       latitude: 37.78825,
//       longitude: -122.42,
//       latitudeDelta: 0.03,
//       longitudeDelta: 0.0421,
//     };
//     return (
//       <View style={styles.container}>
//         <Components.MapView
//           style={{ flex: 1, backgroundColor: '#fff' }}
//           initialRegion={region}
//           onRegionChangeComplete={this._onRegionChange}>
//           {
//             data.map(quest =>
//               <Components.MapView.Marker
//                 draggable
//                 onDragEnd={(e) => {console.log('DRAG END: ', e.nativeEvent.coordinate)}}
//                 key={quest.creator_id}
//                 coordinate={{
//                   longitude: quest.lng,
//                   latitude: quest.lat,
//                 }}
//                 image={icons[quest.item_id].icon}
//                 onPress={() => this._onMarkerPress(quest)}>

//                   <Components.MapView.Callout>
//                     <View>
//                       <Text>YAAAAAASSSS</Text>
//                     </View>
//                   </Components.MapView.Callout>

//               </Components.MapView.Marker>
//             )
//           }
//         </Components.MapView>
//       </View>
//     );
//   }
// }
