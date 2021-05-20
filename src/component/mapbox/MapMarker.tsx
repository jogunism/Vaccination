import React from 'react';
import {Dimensions, StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MapMarkerData } from './type';

interface MapMarkerProps {
  handleSelectState: Function
}

export const MapMarker: React.FC<MapMarkerData & MapMarkerProps> = (props) => {
  const onSelected = () => {
    props.handleSelectState(props.id);
  };
  
//   return (
//     <MapboxGL.PointAnnotation
//       id={props.id}
//       coordinate={props.coordinate}
//       selected={true}
//       onSelected={onSelected}>
//       <View>
//         <Text style={styles.stateName}>{props.name.replace('-', '-\r\n')}</Text>
//       </View> 
//       <View style={styles.marker}></View>
//     </MapboxGL.PointAnnotation>
//   );
// }

  return (
      <MapboxGL.MarkerView
        id={props.id}
        coordinate={props.coordinate}>
        <View style={styles.container}>
          <Text style={styles.stateName}>{props.name.replace('-', '-\r\n')}</Text>
          <TouchableOpacity style={styles.marker} onPress={onSelected} /> 
        </View>  
      </MapboxGL.MarkerView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: '#00cccc',
    borderRadius: 50,
    borderColor: '#ffffff',
    borderWidth: 1,
    textAlign: 'center', 
  },
  stateName: {
    textAlign: 'center', 
    fontSize: 9,
  }
});