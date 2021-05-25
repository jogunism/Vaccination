import { 
  MainActionType,
  VACCINATED_ALL,
  VACCINATED_STATE,
  VaccinationData,
} from '../types';

interface MainState {
  data: VaccinationData;
  states: { [key: string]: VaccinationData };
  barChartTitles: Array<String>;
  barChartData: Array<{ x: string, y: number, z: number }>;
  currState: VaccinationData;
}

const initialState: MainState = {
  data: {} as VaccinationData,
  states: {} as { [key: string]: VaccinationData },
  barChartTitles: [] as Array<String>,
  barChartData: [] as Array<{ x: string, y: number, z: number }>,
  currState: {} as VaccinationData,
};

export function mainReducer(
  state: MainState = initialState,
  action: MainActionType,
): MainState {

  switch (action.type) {
    case VACCINATED_ALL: {
      let _data = (() => {
        let _arr: Array<{ x: string, y: number, z: number }> = [];
          for (const [k, v] of Object.entries(action.payload.states)) {
            if (k === 'Bund') {
              continue;
            }
            _arr.push({
              x: v.name,
              y: parseFloat((v.quote * 100).toFixed(2)),
              z: parseFloat((v.secondVaccination.quote * 100).toFixed(2)),
            });
          }
        return _arr.sort((a, b) => a.y - b.y);
      })();

      return {
        ...state,
        data: action.payload,
        states: action.payload.states,
        barChartTitles: _data.map((o) => o.x),
        barChartData: _data
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
