import { MainActionType, VACCINATION, VaccinationData } from '../types';

interface MainState {
  data: VaccinationData;
}

const initialState: MainState = {
  data: {} as VaccinationData,
};

export function mainReducer(
  state: MainState = initialState,
  action: MainActionType,
): MainState {
  switch (action.type) {
    case VACCINATION: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
}
