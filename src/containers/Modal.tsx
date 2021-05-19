import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native';

import { RootState } from '../redux/reducers';
import { ModalNavigatorParamsList } from '@/navigation/types';
import { stateVaccinateData } from '../redux/actions';

export interface ModalProps {
  navigation: StackNavigationProp<ModalNavigatorParamsList>;
  route: RouteProp<ModalNavigatorParamsList, 'Detail'>;
}

export const Modal: React.FC<ModalProps> = ({ navigation, route }) => {

  const { currState } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  /* -----------------------------------------------
   * Methods
   */
  const displayRate = (n?: number) => {
    if (!n) {
      return 0;
    }
    return (n * 100).toFixed(2);
  };

  /* -----------------------------------------------
   * Hooks
   */
  useEffect(() => {
    dispatch(stateVaccinateData(route.params.stateId));
  }, []);


  /* -----------------------------------------------
   * Render
   */
  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.title}>{ currState.name }</Text>
      <Text style={styles.text}>1st vaccinated : { displayRate(currState.quote) } % </Text>
      <Text style={styles.text}>2nd vaccinated : { displayRate(currState.secondVaccination?.quote) } % </Text>
      <Button onPress={() => {
        navigation.pop();
      }} title="close" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    paddingBottom: 30
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
  },
  view: {
    // backgroundColor: '#dddddd',
    flex: 1,
  }
});
