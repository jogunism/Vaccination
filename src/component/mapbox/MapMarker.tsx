import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MapMarkerData } from './type';

interface MapMarkerProps {
  handleSelectState: Function
}

export const MapMarker: React.FC<MapMarkerData & MapMarkerProps> = (props) => {
  const onSelected = () => {
    props.handleSelectState(props.id);
  };
  
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
    // position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#ff000050',
    opacity: 0.6,
    borderRadius: 50,
    borderColor: '#ff0000',
    borderWidth: 0.3,
  },
  stateName: {
    textAlign: 'center', 
    fontSize: 9,
  },
});

