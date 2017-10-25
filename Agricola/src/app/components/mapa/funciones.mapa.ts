
import { LatLng, LatLngLiteral } from '../../../../node_modules/@agm/core';

export function ordenarArray(coord: any[]) {
  let coordAux: any;
  for (let i = 0; i < (coord.length - 1); i++) {
    for (let j = i + 1; j < coord.length; j++) {
      if (coord[i].nroOrden > coord[j].nroOrden) {
        // Intercambiamos valores
        coordAux = coord[i];
        coord[i] = coord[j];
        coord[j] = coordAux;
      }
    }
  }
  return coord;
}


export function convertCoordenadaListToPaths(coordenadas: any[]) {
  const paths: LatLngLiteral[] = new Array<LatLngLiteral>();
  for (const m of ordenarArray(coordenadas)) {
    paths.push({ 'lat': m.latitud, 'lng': m.longitud });

  }

  return paths;
}

export function convertCoordenadaListToMarkerList(coordenada: any[]) {
  const markers: Marker[] = [];
  for (const c of ordenarArray(coordenada)) {
    markers.push({ 'id': c.id, 'nroOrden': c.nroOrden, 'lati': c.latitud, 'longi': c.longitud });
  }

  return markers;
}

export function convertMarkerListToCoordenadaList(markers: any[]) {
  const coordenadaList: any[] = [];
  for (const m of markers) {
    coordenadaList.push({ 'id': m.id, 'nroOrden': m.nroOrden, 'latitud': m.lati, 'longitud': m.longi });
  }
  return coordenadaList;
}

export function convertMarkerListToPaths(markers: any[]) {
  const paths: LatLngLiteral[] = new Array<LatLngLiteral>();
  for (const m of markers) {
    paths.push({ 'lat': m.lati, 'lng': m.longi });
  }
  return paths;
}

export function convertElementoConCoordenadasToArrayPaths(elemnetos: any[]) {
  console.log(elemnetos);
  const arrayPaths: any[] = [];
  for (const z of elemnetos) {
    arrayPaths.push(convertCoordenadaListToPaths(z.coordenadaList));
  }
  return arrayPaths;

}

export interface Marker {
  id: string;
  nroOrden: number;
  lati: number;
  longi: number;
}
