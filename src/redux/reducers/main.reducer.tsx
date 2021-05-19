import { 
  MainActionType,
  VACCINATED_ALL,
  VACCINATED_STATE,
  VaccinationData,
} from '../types';

interface MainState {
  data: VaccinationData;
  states: { [key: string]: VaccinationData };
  currState: VaccinationData;
}

const initialState: MainState = {
  data: {} as VaccinationData,
  states: {} as { [key: string]: VaccinationData },
  currState: {} as VaccinationData,
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
    case VACCINATED_STATE:
      return {
        ...state,
        currState: state.states[action.stateId]
      };
    default:
      return state;
  }
}
