// main type

export interface Vaccination {
  astraZeneca: number;
  biontech: number;
  moderna: number;
  janssen: number;
}

export interface Indication {
  age: number;
  job: string;
  medical: string;
  nursingHome: boolean;
  seccondVaccination: Indication;
}

export interface VaccinationData {
  administeredVaccinations: number;
  delta: number;
  indication: Indication;
  name: string;
  quote: number;
  secondVaccination: VaccinationData;
  vaccinated: number;
  vaccination: Vaccination;
  states: { [key: string]: VaccinationData };
}

export const VACCINATED_ALL = 'VACCINATED_ALL';
export const VACCINATED_STATE = 'VACCINATED_STATE';

interface VaccinateAllAction {
  type: typeof VACCINATED_ALL;
  payload: VaccinationData;
}

interface VaccinatedStateAction {
  type: typeof VACCINATED_STATE;
  stateId: string;
}

export type MainActionType = VaccinateAllAction | VaccinatedStateAction;
