import { VaccinationData } from '../redux/types';
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { testAction } from '../redux/actions';
import { RootState } from '../redux/reducers';

interface Props {}
export const Main: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.main);

  /* -----------------------------------------------
   * Methods
   */
  const pressButton = () => {
    console.log('button pressed');
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
    <View>
      <Text style={styles.title}>MAIN</Text>
      <Button
        color={styles.button.color}
        title="button"
        onPress={pressButton}
      />
      <Text style={styles.data}>Total Vaccinated : {data.vaccinated}</Text>
      <View style={styles.states}>{jsxStates(data.states)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 100,
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
