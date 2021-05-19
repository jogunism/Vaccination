// actions
import { ActionCreator, Dispatch } from 'redux';
import {
  MainActionType,
  VACCINATED_ALL,
  VACCINATED_STATE,
  VaccinationData 
} from '../types';
import { mainService } from '../services';

const vaccinatedAllDataSuccess: ActionCreator<MainActionType> = (response: VaccinationData) => {
  return { type: VACCINATED_ALL, payload: response };
};

export const allVaccinatedData = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await mainService.allVaccinatedData();
      dispatch(vaccinatedAllDataSuccess(response.data.data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const stateVaccinateData = (stateId: string) => {
  return { type: VACCINATED_STATE, stateId };
}
