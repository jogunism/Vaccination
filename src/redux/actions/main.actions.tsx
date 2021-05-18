// actions
import { ActionCreator, Dispatch } from 'redux';
import { MainActionType, VACCINATED_ALL, VACCINATED_STATE, VaccinationData } from '../types';
import { mainService } from '../services';

const vaccinatedDataSuccess: ActionCreator<MainActionType> = (response: VaccinationData) => {
  return { type: VACCINATED_ALL, payload: response };
};

// const vaccinatedState: ActionCreator<MainActionType> = () => {
//   return { type: VACCINATED_STATE };
// };

export const allVaccinatedData = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await mainService.allVaccinatedData();
      dispatch(vaccinatedDataSuccess(response.data.data));
    } catch (e) {
      console.error(e);
    }
  };
};
