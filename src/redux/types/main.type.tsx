// main type
export const VACCINATED_ALL = 'VACCINATED_ALL';
export const VACCINATED_STATE = 'VACCINATED_STATE';

export interface Vaccination {
  astraZeneca: number;
  biontech: number;
  moderna: number;
}

export interface Indication {
  age: number;
  job: string;
  medical: string;
  nursingHome: boolean;
}

export interface VaccinationData {
  administeredVaccinations: number;
  delta: number;
  indication: Indication;
  quote: number;
  name: string;
  vaccinated: number;
  vaccination: Vaccination;
  states: { [key: string]: VaccinationData };
}

interface ActVaccineStatement {
  type: typeof VACCINATED_ALL;
  payload: VaccinationData;
}

export type MainActionType = ActVaccineStatement;
