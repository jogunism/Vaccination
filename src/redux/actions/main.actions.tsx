// actions
import { MainActionType, VACCINATION, VaccinationData } from '../types';
import { mainService } from '../services';
import { ActionCreator, Dispatch } from 'redux';

const vccData: ActionCreator<MainActionType> = (response: VaccinationData) => {
  return { type: VACCINATION, payload: response };
};

export const testAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await mainService.testMethod();
      dispatch(vccData(response.data.data));
    } catch (e) {
      console.error(e);
    }
  };
};
