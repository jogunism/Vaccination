import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { RefreshControl, ScrollView, Button, StyleSheet, Text, View } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { testAction } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { MapView } from '../component/mapbox';

import { VaccinationData } from '../redux/types';
import { TopNavigatorParamsList, NavigatorParamsList } from '../navigation/types';


export interface MainProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TopNavigatorParamsList, 'Vaccination'>,
    StackNavigationProp<NavigatorParamsList>
    >
};

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const Main: React.FC<MainProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.main);

  /* -----------------------------------------------
   * Methods
   */
  const pressPush = () => {
    navigation.navigate('Sub');
  };

  const pressModal = () => {
    navigation.navigate('Modal', {
      screen: 'Modal'
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      dispatch(testAction());
      setRefreshing(false);
    });
  }, []);

  const jsxStates = (o: { [key: string]: VaccinationData }) => {
    if (o === undefined) {
      return;
    }
    const item = [];
    for (const [k, v] of Object.entries(o)) {
      item.push(
        <Text key={k}>
          {k} : {v.vaccinated}
        </Text>,
      );
    }
    return item;
  };

  /* -----------------------------------------------
   * Hooks
   */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      // mounted
      // dispatch(testAction());
      console.log('use effect!');
      wait(3000).then(() => {
        console.log('hide after 3sec.');
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        contentOffset={{x: 0, y: 0}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>main page</Text>
        <MapView />
        <Text style={styles.data}>Total Vaccinated : {data.vaccinated}</Text>
        <View style={styles.states}>{jsxStates(data.states)}</View>
        <Button
          color={styles.button.color}
          title="push"
          onPress={pressPush}
        />
        <Button
          color={styles.button.color}
          title="modal"
          onPress={() => {
            navigation.navigate('Modal', {
              screen: 'Modal', 
            });
          }}
        />
      </ScrollView>
    </View>
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  data: {
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 40,
  },
  states: {
    paddingTop: 10,
    paddingLeft: 40,
  },
  button: {
    color: '#ff0000',
  },
});
