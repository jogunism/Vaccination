import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'

import { ModalNavigatorParamsList } from '@/navigation/types';

export interface ModalProps {
  navigation: StackNavigationProp<ModalNavigatorParamsList, 'Modal'>;
}

export const Modal: React.FC<ModalProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.title}>modal page</Text>
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
