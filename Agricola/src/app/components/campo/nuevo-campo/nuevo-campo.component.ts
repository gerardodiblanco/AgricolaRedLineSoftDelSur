import { Component, OnInit, } from '@angular/core';
import { CampoClass } from '../../../class/campo'
import {DomicilioClass} from '../../../class/domicilio'
//import { ActivatedRoute } from '@angular/router';
import { LatLng, LatLngLiteral } from '../../../../../node_modules/@agm/core';
//import { PolygonManager } from '../../../../../node_modules/@agm/core';


@Component({
  selector: 'app-nuevo-campo',
  templateUrl: './nuevo-campo.component.html',
  styleUrls: ['./nuevo-campo.component.css']
})
export class NuevoCampoComponent implements OnInit {
  campo: CampoClass = new CampoClass();
  domicilio: DomicilioClass = new DomicilioClass();
  markers: marker[] = [];
  paths: Array<LatLngLiteral> = [];

  latInicio = -32.880913 ; 
  lngInicio = -68.83319;

  constructor() { }


onSubmit(){
  // Mostramos el objeto usuario
  console.log("onSubmit");
  
}

ngOnInit() {
 
    }

    marcadorClicleado(marcador:marker,index:number){
      console.log("Marcador clickeado: "+marcador.nroOrden +" en el index: "+index);
     
    }
    mapClickeado($event:any){
      console.log("Mapa Clickeado");

      var nuevoMarker = {
        nroOrden: this.markers.length + 1,
        lati: $event.coords.lat,
        longi: $event.coords.lng,
        arrastrable: true
      }
    
      this.markers.push(nuevoMarker);
      this.actualizarPaths();
     

    }
    posicionFinalMarcador(m,$event,i){
      console.log($event);
      this.markers[i].lati = $event.coords.lat;
      this.markers[i].longi = $event.coords.lng;
      this.actualizarPaths();
    }

actualizarPaths(){
  this.paths = [];
  for(let m of this.markers){
    this.paths.push({'lat':m.lati,'lng':m.longi});
  }
}
  

    

}

interface marker {
  nroOrden:number;
  lati:number;
  longi: number;
 
}
