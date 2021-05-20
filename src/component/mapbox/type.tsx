export const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFscmlqaW1hIiwiYSI6ImNrbnN4ZDhtYzJuaGgyb254ZDZzZGtzb3AifQ.WH0qwTjCQjETGilt-3FO7A';
export const MAPBOX_STYLE_URL = 'mapbox://styles/malrijima/cko17rtyp0lu517npldnvwmuz';

export interface MapMarkerData {
  id: string
  name : string,
  coordinate: number[],
}

// COORD
export const COORD_CENTER = [10.4, 51.2]; // longitude, latitude

export const bundesLandCoords = [
  {key:'BB', value:[13.6, 52.0]},
  {key:'BE', value:[13.4, 52.7]},
  {key:'BW', value:[9.0,  48.6]},
  {key:'BY', value:[11.6, 49.3]},
  {key:'HB', value:[8.7, 53.2]},
  {key:'HE', value:[8.9, 50.8]},
  {key:'HH', value:[9.9, 53.5]},
  {key:'MV', value:[12.1, 54.0]},
  {key:'NI', value:[9.8, 52.5]},
  {key:'NW', value:[7.2, 51.5]},
  {key:'RP', value:[7.2, 50.3]},
  {key:'SH', value:[9.6, 54.5]},
  {key:'SL', value:[6.8, 49.4]},
  {key:'SN', value:[13.4, 50.9]},
  {key:'ST', value:[11.6, 52.1]},
  {key:'TH', value:[11.0, 50.9]},
] 
