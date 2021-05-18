import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RefreshControl, ScrollView, Button, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { allVaccinatedData } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { MapView } from '../component/mapbox';
import { VaccinationData } from '../redux/types';
import { RootStackParamsList,DrawerNavigatorParamsList } from '@/navigation/types';

export interface MainProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamsList>,
    StackNavigationProp<DrawerNavigatorParamsList, 'Vaccination'>
    >
};

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const Main: React.FC<MainProps> = ({ navigation }) => {
  const { data } = useSelector((state: RootState) => state.main);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  /* -----------------------------------------------
   * Methods
   */
  const pressPush = () => {
    navigation.navigate('Sub');
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      dispatch(allVaccinatedData());
      setRefreshing(false);
    });
  }, []);

  // const jsxStates = (o: { [key: string]: VaccinationData }) => {
  //   if (o === undefined) {
  //     return;
  //   }
  //   const item = [];
  //   for (const [k, v] of Object.entries(o)) {
  //     item.push(
  //       <Text key={k}>
  //         {k} : {v.vaccinated}
  //       </Text>,
  //     );
  //   }
  //   return item;
  // };

  const handleSelectState = (stateId: string) => {
    navigation.navigate('Modal', {
      screen: 'Detail',
      params: {
        stateId
      }
    });
  }

  /* -----------------------------------------------
   * Hooks
   */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      // mounted
      // dispatch(testAction());

      // hide splash screen after 1.5sec.
      wait(1500).then(() => {
        SplashScreen.hide();
      });
    }
    mounted.current = !mounted.current;
    return () => {
      // willupdate
    };
  }, [data, dispatch]);

  useEffect(() => {
    return () => {
      // unmount
    };
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      contentOffset={{x: 0, y: 0}}
      refreshControl={
        <RefreshControl
          style={styles.refresh}
          refreshing={refreshing}
          onRefresh={onRefresh} />
      }
    >
      <View style={styles.mapview}>
        <MapView handleSelectState={handleSelectState}/>
      </View>
      <View style={styles.states}>
        <Text style={styles.data}>Total Vaccinated : {data.vaccinated}</Text>
        {/* {jsxStates(data.states)} */}
        <Button
          color={styles.button.color}
          title="push"
          onPress={pressPush}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // borderEndWidth: 1,
    justifyContent: 'flex-start'
  },
  refresh: {
    backgroundColor: '#FFC600'
  },
  mapview: {
    flex: 1,
    paddingTop: 20,
  },
  data: {
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 40,
  },
  states: {
    // borderWidth: 1,
    // paddingTop: -10,
    paddingLeft: 40,
    flex: 1
  },
  button: {
    color: '#ff0000',
  },
 
});
