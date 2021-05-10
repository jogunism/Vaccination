import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_TOKEN , COORD_CENTER, MAPBOX_STYLE_URL, MAPBOX_WIDTH, MAPBOX_HEIGHT, bundesLandCoords} from './type'
import {MapMarker} from './MapMarker'
import { RootState } from '../../redux/reducers';

import { VaccinationData } from '../../redux/types';

interface Props {}
export const MapView: React.FC<Props> = () => {
  const { data } = useSelector((state: RootState) => state.main);
  const coords = new Map(bundesLandCoords.map(i => [i.key, i.value]));
 

  /* -----------------------------------------------
  * Methods
  */
  const jsxMarkers = (o: { [key: string]: VaccinationData }) => {
    if (o === undefined) {
      return;
    }
    const datas = new Map(Object.entries(o).map(i => [i[0], i[1]]));
    return <View>
            {bundesLandCoords.map((item, idx) =>(<MapMarker key={idx} id={item.key} name={datas.get(item.key)?.name??'none'} coordinate={item.value} />))}
          </View>
  }

  /* -----------------------------------------------
  * Hooks
  */
  const mounted = useRef(false);
  const showMarker = useRef(false);
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
  }, [data]);

  return (
    <View style={styles.root}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MAPBOX_STYLE_URL}
        pitchEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}>
        <MapboxGL.Camera
          animationMode={'flyTo'}  
          animationDuration={500} 
          zoomLevel={4.5} 
          centerCoordinate={[COORD_CENTER.longitude, COORD_CENTER.latitude]} />
        {jsxMarkers(data.states)}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: MAPBOX_WIDTH,
    height: MAPBOX_HEIGHT,
  },
  map: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});


