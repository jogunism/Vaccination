import { 
  MainActionType,
  VaccinationData,
  VACCINATED_ALL,
  VACCINATED_STATE
} from '../types';

interface MainState {
  data: VaccinationData;
  states: { [key: string]: VaccinationData }
}

const initialState: MainState = {
  data: {} as VaccinationData,
  states: {} as { [key: string]: VaccinationData }
};

export function mainReducer(
  state: MainState = initialState,
  action: MainActionType,
): MainState {

  switch (action.type) {
    case VACCINATED_ALL: {
      return {
        ...state,
        data: action.payload,
        // states: new Map(Object.entries(action.payload.states).map(i => [i[0], i[1]]))
        states: action.payload.states
      };
    };
    // case VACCINATED_STATE: {
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    // }
    default:
      return state;
  }
}
