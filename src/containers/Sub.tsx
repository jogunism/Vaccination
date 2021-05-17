import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'

import { DrawerNavigatorParamsList } from '../navigation/types';

export interface SubProps {
  navigation: StackNavigationProp<DrawerNavigatorParamsList, 'Sub'>;
};

export const Sub: React.FC<SubProps> = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>sub page</Text>
    </View>
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
