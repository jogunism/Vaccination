import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { allVaccinatedData } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { MapView } from '../component/mapbox';
import { MainChart } from './MainXAxisChart';
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
  const { data, states } = useSelector((state: RootState) => state.main);
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

      // hide splash screen after 1.5sec.
      wait(1500).then(() => {
        dispatch(allVaccinatedData());
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
      style={ styles.container }
      contentContainerStyle={styles.scrollView}
      contentOffset={{x: 0, y: 0}}
      refreshControl={
        <RefreshControl
          style={ styles.refresh }
          tintColor={ '#000000' }
          refreshing={ refreshing }
          onRefresh={ onRefresh } />
      }
    >
      <View style={ styles.main }>
        <View style={styles.mapview}>
          <MapView handleSelectState={handleSelectState}/>
        </View>
        <MainChart />
        <View style={ styles.footer }>
          <Text style={ styles.copyright }>©RANGE 2021</Text>
          <Text style={ styles.license }>Licensed by Robert Koch-Institut</Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE380',
  },
  refresh: {
    backgroundColor: '#FFE380',
    borderColor: '#999'
  },
  scrollView: {
    backgroundColor: 'white',
    justifyContent: 'flex-start'
  },
  main: {
    flex: 1
  },
  mapview: {
    height: 470,
    paddingBottom: 20,
  },
  data: {
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 40,
  },
  states: {
    flex: 1,
    paddingLeft: 40,
  },
  button: {
    color: '#ff0000',
  },
  footer: {
    paddingTop: 10,
    backgroundColor: '#FFE380',
    paddingBottom: 35,
  },
  copyright: {
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700'
  },
  license: {
    textAlign: 'center',
    fontSize: 11,
  }
 
});
