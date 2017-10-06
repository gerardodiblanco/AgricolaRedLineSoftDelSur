import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampoService } from '../../service/campo-service/campo.service';
import { NuevoCampoService } from '../../service/campo-service/nuevo-campo.service';
import { CuartelService } from '../../service/cuartel-service/cuartel.service';
import { LatLng, LatLngLiteral } from '../../../../node_modules/@agm/core';
import { ordenarArray } from '../mapa/funciones.mapa';
import { convertCoordenadaListToPaths } from '../mapa/funciones.mapa';
import { convertCoordenadaListToMarkerList } from '../mapa/funciones.mapa';
import { marker } from '../mapa/funciones.mapa';
import { convertElementoConCoordenadasToArrayPaths } from '../mapa/funciones.mapa';
import { ActivatedRoute } from '@angular/router';

import { NuevoCuartelComponent } from '../cuartel/nuevo-cuartel/nuevo.cuartel.component';
import { SubCuartelService } from '../../service/subCuartel-service/subCuartel.service';

@Component({
    selector: 'app-subcuartel',
    templateUrl: './subcuartel.component.html',
    styleUrls: ['./subcuartel.component.css']
})
export class SubCuartelComponent implements OnInit {
    subcuarteles: any[] = [];
    cuartel: any = null;
    campo: any = null;

    pathsCuartel: Array<LatLngLiteral> = new Array<LatLngLiteral>();
    pathsCampo: Array<LatLngLiteral> = new Array<LatLngLiteral>();

    arrayPathsSubCuarteles: Array<Array<LatLngLiteral>> = [];
    markers: marker[];
    latInicio = -32.880913;
    lngInicio = -68.83319;

    constructor(private campoService: CampoService, private nuevoCampoService: NuevoCampoService,
        private cuartelService: CuartelService, private route: ActivatedRoute, private subCuartelService: SubCuartelService,
        private router: Router) {

    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            console.log("params");
            console.log(params);
            console.log("buscarCuartel");

            this.cuartelService.buscarCuartel(params['idCuartel'])
                .then(cuartel => {
                    this.cuartel = cuartel;

                    //no existe mas esa relacion, hay q buscar los sub cuarteles por idCuartel
                    //  this.subcuarteles = cuartel.subcuarteles;

                    console.log("cuartel : ");
                    console.log(this.cuartel);
                    this.subCuartelService.getSubCuarteles(cuartel.idCuartel)
                        .then(sub => {
                            this.subcuarteles = sub;
                            console.log("subCuarteles");
                            console.log(this.subcuarteles);

                            console.log("actualizar Areas Cuarteles ")
                            this.arrayPathsSubCuarteles = [];
                            this.arrayPathsSubCuarteles = convertElementoConCoordenadasToArrayPaths(sub);


                            console.log("arrayPathsSubCuarteles");
                            console.log(this.arrayPathsSubCuarteles);
                        })

                    this.nuevoCampoService
                        .buscarCampo(cuartel.idCampo)
                        .then(c => {
                            this.campo = c;
                            console.log("campo")
                            console.log(this.campo);

                            this.pathsCampo = [];
                            this.pathsCampo = convertCoordenadaListToPaths(this.campo.coordenadaList);


                            console.log("pathsCampo");
                            console.log(this.pathsCampo);
                        });


                    console.log("cuarteles")
                    console.log(this.cuartel);

                    this.actualizarAreas();
                });
        });
    }



    actualizarAreas() {





        this.pathsCuartel = [];
        this.pathsCuartel = convertCoordenadaListToPaths(this.cuartel.coordenadaList);

        console.log("pathCuartel");
        console.log(this.pathsCuartel);

        this.actualizarMarker();



    }

    actualizarMarker() {
        this.markers = [];
        this.markers = convertCoordenadaListToMarkerList(this.cuartel.coordenadaList)
    }


    eliminarCuartel(idCuartel) {
        console.log("idCuartel");
        console.log(idCuartel);
        if (confirm("¿Está seguro que desea eliminar el cuartel?")) {
            this.cuartelService.eliminarCuartel(idCuartel)
                .then(rta => {
                    console.log(rta);

                    if (rta == 200) {
                        /*   for (var index = 0; index < this.cuarteles.length; index++) {
                              var element = this.cuarteles[index];
                              if(element.idCuartel = idCuartel){
                                this.cuarteles.splice(index,1);
                              }
                            }
                         

                        this.cuartelService.getCuarteles(this.campoSeleccionado.idCampo)
                            .then(cuarteles => {
                                this.cuarteles = cuarteles
                                console.log("cuarteles : ");
                                console.log(this.cuarteles);
                                this.actualizarAreas();
                            })
*/
                    }
                })


        }

    }
}

