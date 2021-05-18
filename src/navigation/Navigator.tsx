import React from 'react';
import { Platform } from 'react-native';
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import { RootStackParamsList, DrawerNavigatorParamsList, ModalNavigatorParamsList } from './types';
import { Main, Sub, Modal } from '../containers';

const options: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#FFC600',
    borderBottomColor: '#FFC600',
    borderEndColor: '#FFC600',
    // backgroundColor: 'transparent'
  },
};

const Navigator: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator<RootStackParamsList>();

  return (
    <Navigator
      mode='modal'
      headerMode='none'
      screenOptions={() => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalSlideFromBottomIOS
        }
      }}
    >
      <Screen name='Main' options={ options } component={ DrawerNavigator } />
      <Screen name='Modal'
        options={{ 
          cardStyleInterpolator: Platform.OS === 'ios' ? 
                                    CardStyleInterpolators.forModalPresentationIOS : 
                                    CardStyleInterpolators.forFadeFromBottomAndroid
        }}
        component={ ModalNavigator }
      />
    </Navigator>
  );
};

const DrawerNavigator: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator<DrawerNavigatorParamsList>();

  return (
    <Navigator>
      <Screen name="Vaccination" options={ options } component={ Main } />
      <Screen name="Sub" options={ options } component={ Sub } />
    </Navigator>
  );
};

const ModalNavigator: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator<ModalNavigatorParamsList>();

  return (
    <Navigator mode='modal' headerMode='none'>
      <Screen name='Detail' component={ Modal } />
    </Navigator>
  );
};

export default Navigator;
