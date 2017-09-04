import { Injectable,OnInit } from '@angular/core';
import { LatLng, LatLngLiteral, PolyMouseEvent } from '../../../../node_modules/@agm/core';
import {CampoService} from '../../service/campo-service/campo.service';
import { Router } from '@angular/router';
import {CoordenadaClass} from '../../class/coordenada';

@Injectable()
export class MapaService implements OnInit {
  paths: Array<LatLngLiteral> = [];
  latInicio: number; 
  lngInicio: number;
  coordAux: CoordenadaClass;
  constructor( private router: Router) { }

  ngOnInit (){}

  cargarArea(coord: CoordenadaClass[]){

    coord = this.ordebarArray(coord);

    this.paths = [];
    this.latInicio =  coord[0].latitud;
    this.lngInicio = coord[0].longitud;

     
  
      for( let puntos of coord){
     
      this.paths.push({'lat':puntos.latitud,'lng':puntos.longitud});
      }
 
   
      
   this.router.navigate(['/mapa'])
  } 

  ordebarArray(coord: CoordenadaClass[]) {
      
    for(let i=0;i<(coord.length-1);i++){
      for(let j=i+1;j<coord.length;j++){
          if(coord[i].nroOrden>coord[j].nroOrden){
              //Intercambiamos valores
              this.coordAux=coord[i];
              coord[i]=coord[j];
              coord[j]=this.coordAux;

          }
      }
  }
  return coord;
}

}
