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

import { NuevoCuartelComponent } from '../cuartel/nuevo-cuartel/nuevo.cuartel.component';
import { SubCuartelService } from '../../service/subCuartel-service/subCuartel.service';

@Component({
  selector: 'app-subcuartel',
  templateUrl: './subcuartel.component.html',
  styleUrls: ['./subcuartel.component.css'],
})
export class SubCuartelComponent implements OnInit {
  subcuarteles: any[] = [];
  cuartel: any = null;
  campo: any = null;
  pathsCuartelConVariedad: any[] = [];

  pathsCuartel: LatLngLiteral[] = new Array<LatLngLiteral>();
  pathsCampo: LatLngLiteral[] = new Array<LatLngLiteral>();

  arrayPathsSubCuarteles: Array<Array<LatLngLiteral>> = [];
  markers: Marker[];
  latInicio = -32.880913;
  lngInicio = -68.83319;

  constructor(
    private campoService: CampoService,
    private nuevoCampoService: NuevoCampoService,
    private cuartelService: CuartelService,
    private route: ActivatedRoute,
    private subCuartelService: SubCuartelService,
    private router: Router) {

  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);
      console.log('buscarCuartel');

      this.cuartelService.buscarCuartel(params['idCuartel'])
        .then((cuartel) => {
          this.cuartel = cuartel;

          // no existe mas esa relacion, hay q buscar los sub cuarteles por idCuartel
          //  this.subcuarteles = cuartel.subcuarteles;

          console.log('cuartel : ');
          console.log(this.cuartel);
          this.subCuartelService.getSubCuarteles(cuartel.idCuartel)
            .then((sub) => {
              this.subcuarteles = sub;
              console.log('subCuarteles');
              console.log(this.subcuarteles);

              console.log('actualizar Areas Cuarteles ');
              //       this.arrayPathsSubCuarteles = [];
              //       this.arrayPathsSubCuarteles = convertElementoConCoordenadasToArrayPaths(sub);
              //       console.log("arrayPathsSubCuarteles");
              //       console.log(this.arrayPathsSubCuarteles);
              for (const sc of sub) {
                this.pathsCuartelConVariedad.push(
                  {
                    paths: convertCoordenadaListToPaths(sc.coordenadaList),
                    color: sc.colorVariedad,
                  });
              }

              console.log('pathsCuartelConVariedad');
              console.log(this.pathsCuartelConVariedad);
            });

          this.nuevoCampoService
            .buscarCampo(cuartel.idCampo)
            .then((c) => {
              this.campo = c;
              console.log('campo');
              console.log(this.campo);

              this.pathsCampo = [];
              this.pathsCampo = convertCoordenadaListToPaths(this.campo.coordenadaList);


              console.log('pathsCampo');
              console.log(this.pathsCampo);
            });


          console.log('cuarteles');
          console.log(this.cuartel);

          this.actualizarAreas();
        });
    });
  }

  actualizarAreas() {

    this.pathsCuartel = [];
    this.pathsCuartel = convertCoordenadaListToPaths(this.cuartel.coordenadaList);

    console.log('pathCuartel');
    console.log(this.pathsCuartel);

    this.actualizarMarker();

  }

  actualizarMarker() {
    this.markers = [];
    this.markers = convertCoordenadaListToMarkerList(this.cuartel.coordenadaList);
  }


  eliminarSubCuartel(id) {
    console.log('idSubCuartel');
    console.log(id);
    if (confirm('¿Está seguro que desea eliminar el subCuartel?')) {
      this.subCuartelService.eliminarSubCuartel(id)
        .then((rta) => {
          console.log(rta);

          if ((rta) === 200) {
            /*   for (var index = 0; index < this.cuarteles.length; index++) {
                  var element = this.cuarteles[index];
                  if(element.idCuartel = idCuartel){
                    this.cuarteles.splice(index,1);
                  }
                }
*/

            this.subCuartelService.getSubCuarteles(this.cuartel.idCuartel)
              .then((subCuarteles) => {
                this.subcuarteles = subCuarteles;
                console.log('subCuarteles : ');
                console.log(this.subcuarteles);
                this.actualizarAreas();

                this.pathsCuartelConVariedad = [];
                for (const sc of subCuarteles) {
                  this.pathsCuartelConVariedad.push(
                    {
                      paths: convertCoordenadaListToPaths(sc.coordenadaList),
                      color: sc.colorVariedad,
                    });
                  }
              });
            }
        });
    }
  }
}

interface Estruc {
  pathsA: LatLngLiteral[];
  color: string;
}
