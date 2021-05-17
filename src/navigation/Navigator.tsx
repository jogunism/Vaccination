import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { TopNavigatorParamsList, NavigatorParamsList, ModalNavigatorParamsList } from './types';
import { Main, Sub, Modal } from '../containers';

const options: StackNavigationOptions = {
  // headerShown: false
  headerStyle: {
    backgroundColor: '#FFC600'
  },
};

const TopNavigator: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator<TopNavigatorParamsList>();

  return (
    <Navigator>
      <Screen name="Vaccination" options={options} component={Main} />
      <Screen name="Sub" options={options} component={Sub} />
      {/* ... */}
    </Navigator>
  );
};

const ModalNavigator: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator<ModalNavigatorParamsList>();

  return (
    <Navigator mode='modal' headerMode='none'>
      <Screen name="Modal" options={options} component={Modal} />
    </Navigator>
  );
};

const Navigator: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator<NavigatorParamsList>();

  return (
    <Navigator mode='modal' headerMode='none'>
      <Screen name="Root" options={options} component={TopNavigator} />
      <Screen name="Modal" options={options} component={ModalNavigator} />
    </Navigator>
  );
};

export default Navigator;
