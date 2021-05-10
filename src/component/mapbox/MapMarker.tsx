import React from 'react';
import {Dimensions, StyleSheet, View, Button, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MapMarkerData} from './type';

export const MapMarker: React.FC<MapMarkerData> = (props) => {
  const onSelected = () => {
    console.log(props.id)
  };
  
  return (
    <MapboxGL.PointAnnotation
      id={props.id}
      coordinate={props.coordinate}
      selected={true}
      onSelected={onSelected}>
      <View>
        <Text style={styles.stateName}>{props.name.replaceAll('-', '-\r\n')}</Text>
      </View> 
        <View style={styles.marker}></View>
    </MapboxGL.PointAnnotation>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: '#00cccc',
    borderRadius: 50,
    borderColor: '#ffffff',
    borderWidth: 1
  },
  stateName: {
    textAlign: 'center', 
    fontSize: 9
    
  }
});