import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampoService } from '../../service/campo-service/campo.service';
import { NuevoCampoService } from '../../service/campo-service/nuevo-campo.service';
import { CuartelService } from '../../service/cuartel-service/cuartel.service';
import { LatLng, LatLngLiteral } from '../../../../node_modules/@agm/core';
import { ordenarArray } from '../mapa/funciones.mapa';
import { convertCoordenadaListToPaths } from '../mapa/funciones.mapa';
import { convertCoordenadaListToMarkerList } from '../mapa/funciones.mapa';
import { Marker } from '../mapa/funciones.mapa';
import { convertElementoConCoordenadasToArrayPaths } from '../mapa/funciones.mapa';
import { ActivatedRoute } from '@angular/router';

import{NuevoCuartelComponent} from '../cuartel/nuevo-cuartel/nuevo.cuartel.component';


@Component({
  selector: 'app-cuartel',
  templateUrl: './cuartel.component.html',
  styleUrls: ['./cuartel.component.css'],
})
export class CuartelComponent implements OnInit {
  campos: any[] = [];
  selectorCampo: any = null;
  campoSeleccionado: any = null;
  cuarteles: any[] = null;
  pathsCampo: LatLngLiteral[] = new Array<LatLngLiteral>();
  arrayPaths: Array<Array<LatLngLiteral>> = [];
  markers: Marker[];
  latInicio = -32.880913;
  lngInicio = -68.83319;

  constructor(
    private campoService: CampoService,
    private nuevoCampoService: NuevoCampoService,
    private cuartelService: CuartelService,
    private nuevoCuartelComponent: NuevoCuartelComponent,
    private router: Router,
    private route: ActivatedRoute) {
    this.buscarCamposService();

  }

  buscarCamposService() {
    this.campos = [];
    this.campoService.getcampos()
      .then((campos) => {
        this.campos = campos;
        this.buscarCuarteles(this.selectorCampo);
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);
      if ( params['nombreCampo']) {
        this.selectorCampo = params['nombreCampo'];
        console.log('dentro del if');
        console.log(this.selectorCampo);
        this.buscarCamposService();
      }
    });
  }

   buscarCuarteles(nombreCampo) {
    console.log('se selecciono un campo');
    for (const campo of this.campos) {
      if (campo.nombre === nombreCampo) {
        this.buscarCampo(campo.idCampo);
        this.cuartelService.getCuarteles(campo.idCampo)
          .then((cuarteles) => {
            this.cuarteles = cuarteles;
            console.log('cuarteles : ');
            console.log(this.cuarteles);
            this.actualizarAreas();
          });
      }
    }

  }

  buscarCampo(idCampo) {
       // buscar campo seleccionado
       this.nuevoCampoService
       .buscarCampo(idCampo)
       .then((c) => {
         this.campoSeleccionado = c;
         console.log('campo seleccionado');
         console.log(this.campoSeleccionado);
       });

  }


  actualizarAreas() {
    if (this.campoSeleccionado !== null) {
    console.log('actualizar Areas Cuarteles ');
    this.arrayPaths = [];
    this.arrayPaths = convertElementoConCoordenadasToArrayPaths(this.cuarteles);
    this.pathsCampo = [];
    this.pathsCampo =  convertCoordenadaListToPaths(this.campoSeleccionado.coordenadaList);
    this.actualizarMarker();
    console.log(this.arrayPaths);
    }
  }

  actualizarMarker() {
    this.markers = [];
    this.markers = convertCoordenadaListToMarkerList(this.campoSeleccionado.coordenadaList);
  }

  eliminarCuartel(idCuartel) {
    console.log('idCuartel');
    console.log(idCuartel);
    if (confirm('¿Está seguro que desea eliminar el cuartel?')) {
       this.cuartelService.eliminarCuartel(idCuartel)
       .then((rta) => {
         console.log(rta);

         if (rta === 200) {
          this.cuartelService.getCuarteles(this.campoSeleccionado.idCampo)
          .then((cuarteles) => {
            this.cuarteles = cuarteles;
            console.log('cuarteles : ');
            console.log(this.cuarteles);
            this.actualizarAreas();
          });
        }
     });
    }
  }
}
