import { Component, OnInit, } from '@angular/core';
import { CampoClass } from '../../../class/campo'
import {DomicilioClass} from '../../../class/domicilio'
import {CoordenadaClass} from '../../../class/coordenada';
//import { ActivatedRoute } from '@angular/router';
import { LatLng, LatLngLiteral } from '../../../../../node_modules/@agm/core';
//import { PolygonManager } from '../../../../../node_modules/@agm/core';
import {NuevoCampoService} from '../../../service/campo-service/nuevo-campo.service';


@Component({
  selector: 'app-nuevo-campo',
  templateUrl: './nuevo-campo.component.html',
  styleUrls: ['./nuevo-campo.component.css'],

})
export class NuevoCampoComponent implements OnInit {
  campo: CampoClass;
  domicilio: DomicilioClass;
  coordenadas: Array<CoordenadaClass>;
  coordAux: CoordenadaClass;
 
 
  markers: marker[] = [];
  paths: Array<LatLngLiteral> = [];

  latInicio = -32.880913 ; 
  lngInicio = -68.83319;

  constructor(private nuevoCampoService:NuevoCampoService) {
    
    if(this.nuevoCampoService.campo != null){
    this.actualizarMarker();
    }else{
      this.campo = new CampoClass();
      this.domicilio = new DomicilioClass();
      this.campo.domicilio = this.domicilio;
      this.campo.altitud = null;
      this.campo.tipo = null;
      this.campo.cuartelList = null;
      this.campo.idCampo = null;

      this.campo.domicilio.idDomicilio = null;
      this.campo.domicilio.localidad = null;
      this.campo.domicilio.otro = null;
      this.campo.domicilio.piso = null;
      

     
    }
   
  }


onSubmit(){
  // Mostramos el objeto usuario
  console.log("onSubmit");
  //llamar a nuevo-campoService para guardar el campo
  this.actualizarCoordenadas();
  console.log(this.campo);

  this.nuevoCampoService.guardarCampo(this.campo);
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
        id: $event.id,
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

actualizarMarker(){
 if(this.nuevoCampoService.campo == null){console.log("this.nuevoCampoService.campo == null");
}else{
  this.campo = null;
  this.campo =  this.nuevoCampoService.campo;
  this.markers = [];
  console.log("ACTUALIZAR MARKER");
  console.log(this.campo); 
for(let c of this.ordebarArray(this.campo.coordenadaList)){
 this.markers.push({'id':c.id,'nroOrden':c.nroOrden,'lati':c.latitud,'longi':c.longitud})
}
this.actualizarPaths();
  }
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

  actualizarCoordenadas(){
    console.log("dentro de actualizar");
    this.campo.coordenadaList = [];
    console.log("this.nuevoCampoService.campo.coordenadaList = [];");
    for(let m of this.markers){
      console.log("dentro del for");
      this.campo.coordenadaList.push({'id':m.id,'nroOrden':m.nroOrden, 'latitud':m.lati, 'longitud': m.longi});
    }
  }

}

interface marker {
  id:string
  nroOrden:number;
  lati:number;
  longi: number;
 
}
