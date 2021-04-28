import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { testAction } from '../redux/actions';
import { RootState } from '../redux/reducers';

import { VaccinationData } from '../redux/types';
import { TopNavigatorParamsList, NavigatorParamsList } from '../navigation/types';


export interface MainProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TopNavigatorParamsList, 'Main'>,
    StackNavigationProp<NavigatorParamsList>
    >,
  map: undefined
};

export const Main: React.FC<MainProps> = ({ navigation }) => {
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
      dispatch(testAction());
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
    <SafeAreaView>
      <Text style={styles.title}>MAIN</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
