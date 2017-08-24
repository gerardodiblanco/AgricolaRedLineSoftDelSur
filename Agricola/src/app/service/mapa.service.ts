import { Injectable,OnInit } from '@angular/core';
import { LatLng, LatLngLiteral, PolyMouseEvent } from '../../../node_modules/@agm/core';
import {CampoService,Coordenada} from '../service/campo.service';
import { Router } from '@angular/router';

@Injectable()
export class MapaService implements OnInit {
  paths: Array<LatLngLiteral> = [];
  latInicio: number; 
  lngInicio: number;
  constructor( private router: Router,) { }

  ngOnInit (){}

  cargarArea(coord: Coordenada[]){
    this.paths = [];
    this.latInicio =  coord[0].latitud;
    this.lngInicio = coord[0].longitud;
  
  
      for( let puntos of coord){
      this.latInicio = this.latInicio + puntos.latitud;
      this.lngInicio = this.lngInicio + puntos.longitud;
      this.paths.push({'lat':puntos.latitud,'lng':puntos.longitud});
      }

      this.latInicio = this.latInicio/coord.length;
      this.lngInicio = this.lngInicio/coord.length;
      
   this.router.navigate(['/mapa'])
  } 


}
