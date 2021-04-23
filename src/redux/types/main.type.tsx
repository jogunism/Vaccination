// main type
export const VACCINATION = 'VACCINATION';

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
  vaccinated: number;
  vaccination: Vaccination;
  states: { [key: string]: VaccinationData };
}

interface ActVaccineStatement {
  type: typeof VACCINATION;
  payload: VaccinationData;
}

export type MainActionType = ActVaccineStatement;
