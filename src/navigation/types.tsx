import { NavigatorScreenParams } from '@react-navigation/native'

export type ModalNavigatorParamsList = {
  Modal: undefined
};

export type DrawerNavigatorParamsList = {
  Vaccination: undefined,
  Sub: undefined,
};

export type RootStackParamsList = {
  // Main: undefined,
  // Modal: undefined,
  Main: NavigatorScreenParams<DrawerNavigatorParamsList>,
  Modal: NavigatorScreenParams<ModalNavigatorParamsList>,
}
