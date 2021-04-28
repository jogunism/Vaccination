import { NavigatorScreenParams } from '@react-navigation/native'

export type ModalNavigatorParamsList = {
  Modal: undefined
};

export type TopNavigatorParamsList = {
  Main: undefined;
  Sub: undefined;
};

export type NavigatorParamsList = {
  Root: NavigatorScreenParams<TopNavigatorParamsList>;
  Modal: NavigatorScreenParams<ModalNavigatorParamsList>;
}