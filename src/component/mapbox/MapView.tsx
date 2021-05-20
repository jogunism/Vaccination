import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MapMarker } from './MapMarker'
import { RootState } from '../../redux/reducers';

import { MAPBOX_TOKEN , COORD_CENTER, MAPBOX_STYLE_URL, bundesLandCoords } from './type'

interface MapViewProps {
  handleSelectState: Function
}

export const MapView: React.FC<MapViewProps> = ({ handleSelectState }) => {

  const { states } = useSelector((state: RootState) => state.main);
  // const coords = new Map(bundesLandCoords.map(i => [i.key, i.value]));
 
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
      MapboxGL.setAccessToken(MAPBOX_TOKEN);
      // MapboxGL.setConnected(true);

    }
    mounted.current = !mounted.current;
    return () => {
      // willupdate
      // showMarker.current = true;
      // console.log(showMarker.current)
    };
  }, [states]);

  return (
    <View style={ styles.container }>
      <MapboxGL.MapView
        style={ styles.map }
        styleURL={ MAPBOX_STYLE_URL }
        pitchEnabled={ false }
        scrollEnabled={ false }
        zoomEnabled={ false }>
        <MapboxGL.Camera
          animationMode={ 'flyTo' }
          animationDuration={ 500 } 
          zoomLevel={ 4.0 } 
          centerCoordinate={ COORD_CENTER } 
        />
        { jsxMarkers() }
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
    backgroundColor: '#ffffff',
  },
});


