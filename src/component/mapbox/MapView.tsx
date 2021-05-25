import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { mapboxInfo, bundesLandCoords } from './type'
import { MapMarker } from './MapMarker'
import { RootState } from '../../redux/reducers';

interface MapViewProps {
  handleSelectState: Function
}

export const MapView: React.FC<MapViewProps> = ({ handleSelectState }) => {
  const { states } = useSelector((state: RootState) => state.main);
 
  /* -----------------------------------------------
  * Methods
  */
  const jsxMarkers = () => {
    if (!states || Object.entries(states).length === 0) {
      return;
    }
    return <View>
            { bundesLandCoords.map((item, idx) => 
                <MapMarker 
                  key={ idx }
                  id={ item.key }
                  name={ states[item.key]?.name ?? 'none' }
                  coordinate={ item.value }
                  handleSelectState={ handleSelectState }
                />
            ) }
          </View>
  };

  /* -----------------------------------------------
  * Hooks
  */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      // mounted
      MapboxGL.setAccessToken(mapboxInfo.token);
      // MapboxGL.setConnected(true);

    }
    mounted.current = !mounted.current;
    return () => {
      // willupdate
    };
  }, [states]);

  return (
    <View style={ styles.container }>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={mapboxInfo.sytelURL}
        pitchEnabled={mapboxInfo.pitchEnabled}
        scrollEnabled={mapboxInfo.scrollEnabled}
        zoomEnabled={mapboxInfo.zoomEnabled}>
        <MapboxGL.Camera
          animationDuration={mapboxInfo.camera.animationDuration} 
          zoomLevel={mapboxInfo.camera.zoomLevel} 
          centerCoordinate={mapboxInfo.camera.centerCoordinate} />
        {jsxMarkers()}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});


