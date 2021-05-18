import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamsList = {
  // Main: undefined;
  // Modal: undefined,
  Main: NavigatorScreenParams<DrawerNavigatorParamsList>;
  Modal: NavigatorScreenParams<ModalNavigatorParamsList>;
}

export type DrawerNavigatorParamsList = {
  Vaccination: undefined;
  Sub: undefined;
};

export type ModalNavigatorParamsList = {
  Detail: {
    stateId: string
  };
};