import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampoService } from '../../../service/campo-service/campo.service';
import { NuevoCampoService } from '../../../service/campo-service/nuevo-campo.service';
import { CuartelService } from '../../../service/cuartel-service/cuartel.service';
import { LatLng, LatLngLiteral } from '../../../../../node_modules/@agm/core';
import { ordenarArray } from '../../mapa/funciones.mapa';
import { convertCoordenadaListToPaths } from '../../mapa/funciones.mapa';
import { convertCoordenadaListToMarkerList } from '../../mapa/funciones.mapa';
import { marker } from '../../mapa/funciones.mapa';
import { convertElementoConCoordenadasToArrayPaths } from '../../mapa/funciones.mapa';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevoCuartel',
  templateUrl: './nuevo.cuartel.component.html',
  styleUrls: ['./nuevo.cuartel.component.css']
})
export class NuevoCuartelComponent {
  titulo: string = "Cuartel - ";
  campo: any = null;
  cuarteles: any[] = [];
  cuartelSeleccionado: any = null;
  pathsCampo: Array<LatLngLiteral> = new Array<LatLngLiteral>();
  arrayPaths: Array<Array<LatLngLiteral>> = [];
  markers: marker[];
  latInicio = -32.880913;
  lngInicio = -68.83319;
  editable: boolean;
  

  constructor(private campoService: CampoService, private nuevoCampoService: NuevoCampoService,
    private cuartelService: CuartelService,private route: ActivatedRoute) {
      this.editable = false;

      this.buscarCuartel();
  }



  buscarCuartel() {
    let id: Observable<string> = this.route.params.map(p => p.id);
    console.log("id = " + id);
    id.subscribe(id =>
      this.cuartelService
        .buscarCuartel(id)
        .then(cuartel => {
          this.cuartelSeleccionado = cuartel;
          console.log("buscar cuartel");
          console.log(this.cuartelSeleccionado);
          if (cuartel.idCampo == null) { this.editable = true; this.titulo = "Nuevo Cuartel" }
          this.titulo += cuartel.descripcion;
        }));

        this.buscarCampo(this.cuartelSeleccionado);
this.buscarCuarteles(this.campo);
      }


  
  buscarCuarteles(campo: any) {
    if(campo != null){
          this.cuartelService.getCuarteles(campo.idCampo)
          .then(cuarteles => {
            this.cuarteles = cuarteles
            console.log("cuarteles : ");
            console.log(this.cuarteles);
          })
        }
      }
 

  buscarCampo(cuartel: any) {
    //buscar campo seleccionado
    if(cuartel != null){
    this.nuevoCampoService
      .buscarCampo(cuartel.idCampo)
      .then(c => {
        this.campo = c;
        console.log("campo")
        console.log(this.campo);
      });
    }
  }


  actualizarAreas() {
    if (this.campo != null) {
      console.log("actualizar Areas Cuarteles ")
      this.arrayPaths = [];
      this.arrayPaths = convertElementoConCoordenadasToArrayPaths(this.cuarteles);
      this.pathsCampo = [];
      this.pathsCampo = convertCoordenadaListToPaths(this.campo.coordenadaList);
      this.actualizarMarker();
      console.log(this.arrayPaths);
    }
  }

  actualizarMarker() {
    this.markers = [];
    this.markers = convertCoordenadaListToMarkerList(this.campo.coordenadaList)
  }
}