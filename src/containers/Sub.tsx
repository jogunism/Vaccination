import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'

import { TopNavigatorParamsList } from '../navigation/types';

export interface SubProps {
  navigation: StackNavigationProp<TopNavigatorParamsList, 'Sub'>;
};

export const Sub: React.FC<SubProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.title}>sub page</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  view: {
    flex: 1,
    backgroundColor: '#dfdfdf',
  }
});
