
import { LatLng, LatLngLiteral } from '../../../../node_modules/@agm/core';

export function ordenarArray(coord: any[]) {
   let coordAux: any;
        for (let i = 0; i < (coord.length - 1); i++) {
          for (let j = i + 1; j < coord.length; j++) {
            if (coord[i].nroOrden > coord[j].nroOrden) {
              //Intercambiamos valores
              coordAux = coord[i];
              coord[i] = coord[j];
              coord[j] = coordAux;
    
            }
          }
        }
        return coord;
      }


export function convertCoordenadaListToPaths(coordenadas: any[]){
    let paths: Array<LatLngLiteral> = new Array<LatLngLiteral>();
 for (let m of ordenarArray(coordenadas)) {
    paths.push({ 'lat': m.latitud, 'lng': m.longitud });
        
      }

      return paths;
}

export function convertCoordenadaListToMarkerList(coordenada: any[]){
   let markers: Array<marker> = [];
    for (let c of ordenarArray(coordenada)) {
        markers.push({ 'id': c.id, 'nroOrden': c.nroOrden, 'lati': c.latitud, 'longi': c.longitud })
      }

      return markers;
}

export function convertMarkerListToCoordenadaList(markers: any[]){
    let coordenadaList: any[] = [];
    for (let m of markers) {
        coordenadaList.push({ 'id': m.id, 'nroOrden': m.nroOrden, 'latitud': m.lati, 'longitud': m.longi });
      }
      return coordenadaList;
}

export function convertMarkerListToPaths(markers: any[]){
    let paths: Array<LatLngLiteral> = new Array<LatLngLiteral>();
    for (let m of markers) {
        paths.push({ 'lat': m.lati, 'lng': m.longi });
      }
      return paths;
}

export interface marker {
    id: string
    nroOrden: number;
    lati: number;
    longi: number;
  
  }
  