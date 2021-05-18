import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native';

import { RootState } from '../redux/reducers';
import { ModalNavigatorParamsList } from '@/navigation/types';

export interface ModalProps {
  navigation: StackNavigationProp<ModalNavigatorParamsList>;
  route: RouteProp<ModalNavigatorParamsList, 'Detail'>;
}

export const Modal: React.FC<ModalProps> = ({ navigation, route }) => {

  const { data } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(vaccinatedState());
  });

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.title}>{ route.params.stateId }</Text>
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
    fontSize: 18,
  },
  view: {
    backgroundColor: '#dddddd',
    flex: 1,
  }
});
