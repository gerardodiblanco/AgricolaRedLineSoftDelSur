import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampoService } from '../../../service/campo-service/campo.service';
import { NuevoCampoService } from '../../../service/campo-service/nuevo-campo.service';
import { CuartelService } from '../../../service/cuartel-service/cuartel.service';
import { LatLng, LatLngLiteral } from '../../../../../node_modules/@agm/core';
import { ordenarArray } from '../../mapa/funciones.mapa';
import { convertCoordenadaListToPaths } from '../../mapa/funciones.mapa';
import { convertCoordenadaListToMarkerList } from '../../mapa/funciones.mapa';
import { Marker } from '../../mapa/funciones.mapa';
import { convertElementoConCoordenadasToArrayPaths } from '../../mapa/funciones.mapa';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { convertMarkerListToPaths } from '../../mapa/funciones.mapa';
import { convertMarkerListToCoordenadaList } from '../../mapa/funciones.mapa';
import { SubCuartelService } from '../../../service/subCuartel-service/subCuartel.service';

import { AtributoService } from '../../../service/atributo-service/atributo.service';

@Component({
  selector: 'app-nuevosubcuartel',
  templateUrl: './nuevo.subcuartel.component.html',
  styleUrls: ['./nuevo.subcuartel.component.css'],
})
export class NuevoSubCuartelComponent implements OnInit {
  titulo: string = 'Sub Cuartel - ';
  cuartel: any = null;
  subcuarteles: any[] = [];

  subcuartelSeleccionado: any = null;
  pathsCuartel: LatLngLiteral[] = new Array<LatLngLiteral>();
  arrayPathsSubCuarteles: Array<Array<LatLngLiteral>> = [];
  pathsSubCuartel: LatLngLiteral[] = new Array<LatLngLiteral>();
  markers: Marker[] = [];
  latInicio = -32.880913;
  lngInicio = -68.83319;
  editable: boolean;
  idCuartel: any = '';
  idSubCuartel: any = '';
  atributos: any[];
  atributoSeleccionado: any[];
  nuevosAtributos: any[];


  constructor(
    private atributoService: AtributoService,
    private campoService: CampoService,
    private nuevoCampoService: NuevoCampoService,
    private cuartelService: CuartelService,
    private route: ActivatedRoute,
    private subCuartelService: SubCuartelService,
    private router: Router) {
    this.editable = true;

    // falta
    this.subcuartelSeleccionado = {
      codigo: 0, codigoCampo: 0, coordenadaList: [], cuitCampo: '',
      descripcion: '', domicilioCampo: '', estadoCampo: '', hectarea: 0, hectareaCampo: 0,
      idCampo: '', idCuartel: '', nombreCampo: '', proveedorCampo: '', subcuarteles: [], tipoCampo: '',
    };

    this.atributoSeleccionado = [{ nombreOpcion: '' }];
  }

  ngOnInit() {
    // Recogemos los parametros de la URL
    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);
      if (params['idSubCuartel'] !== null) {
        this.idSubCuartel = params['idSubCuartel'];
        this.subCuartelService
          .getSubCuartel(params['idSubCuartel'])
          .then((sc) => {
            this.subcuartelSeleccionado = sc;
            console.log('subcuartelSeleccionado');
            console.log(this.subcuartelSeleccionado);
            // buscar todos los subCuarteles
            console.log('buscar todos los sub cuarteles por idCuartel');
            this.subCuartelService.getSubCuarteles(sc.idCuartel)
              .then((sub) => {
                this.subcuarteles = sub;
                console.log('subCuarteles');
                console.log(this.subcuarteles);
                this.cuartelService.buscarCuartel(sc.idCuartel)
                  .then((cuart) => {
                    this.cuartel = cuart;
                    console.log('cuartel');
                    console.log(cuart);
                    this.actualizarAreaCuartel();
                    this.buscarAtributos();
                  });
                this.actualizarAreaSubCuarteles();
              });
            this.actualizarMarker();
            this.actualizarPathCuartel();
          });
      }
    });
  }


  buscarAtributos() {
    this.atributos = [];
    this.atributoService.getAtributosConOpciones()
      .then((atributo) => {
        this.atributos = atributo;
        console.log('Atributos con opciones ');
        console.log(atributo);
        this.actualizarAtributosNuevos();
      });
  }

  actualizarAtributosNuevos() {
    this.nuevosAtributos = [];
    this.nuevosAtributos = this.atributos;

    for (const atributo of this.atributos) {
      // eliminar de this.atributos los atributos que ya contiene el subCartel
      for (const atributosViejos of this.subcuartelSeleccionado.atributosSubCuartel) {
        if (atributo.id === atributosViejos.idAtributo) {
          const pos = this.nuevosAtributos.indexOf(atributo);
          const eliminado = this.nuevosAtributos.splice(pos, 1);
        }
      }
    }
  }

  agregarAtributo(op: any, a: any) {
    console.log(a);
    console.log(op);
    const atributo = {
      atributoOpcionModelList: a.opciones,
      fechaInicioAsignacion: null,
      idAtributo: a.id,
      idAtributoSubCuartel: null,
      idOpcion: null,
      nombreAtributo: a.nombreAtributo,
      nombreOpcion: a.opcionSeleccionada,
    };
    this.subcuartelSeleccionado.atributosSubCuartel.push(atributo);
    console.log(atributo);
    this.actualizarAtributosNuevos();
  }

  quitarAtributo(a: any) {
    const pos = this.subcuartelSeleccionado.atributosSubCuartel.indexOf(a);
    this.subcuartelSeleccionado.atributosSubCuartel.splice(pos, 1);
    this.buscarAtributos();
    console.log(this.nuevosAtributos);
    console.log(this.atributos);
  }

  // guardar
  onSubmit() {
    console.log('onSubmit');
    console.log('save subCuartel');
    console.log(this.subcuartelSeleccionado);
    this.actualizarCoordenadas();
    this.subCuartelService.guardarSubCuartel(this.subcuartelSeleccionado)
      .then((rta) => {
        this.router.navigate(['/cuarteles']);
      });
  }

  actualizarAreaSubCuarteles() {
    console.log('actualizar Areas Sub Cuarteles ');
    this.arrayPathsSubCuarteles = [];
    this.elimiarSubCuartel();
    this.arrayPathsSubCuarteles = convertElementoConCoordenadasToArrayPaths(this.subcuarteles);
    console.log(this.arrayPathsSubCuarteles);
  }

  // eliminar cuartel seleccionado de cuarteles
  elimiarSubCuartel() {
    for (let index = 0; index < this.subcuarteles.length; index++) {
      const element = this.subcuarteles[index];
      console.log(element.idCuartel);
      console.log(this.subcuartelSeleccionado.idSubCuartel);
      if (element.idSubCuartel === this.subcuartelSeleccionado.idSubCuartel) {
        console.log('es igual');
        console.log(element.descripcion);
        this.subcuarteles.splice(index, 1);
      }
    }
  }

  actualizarPathCuartel() {
    this.pathsSubCuartel = convertMarkerListToPaths(this.markers);
  }


  actualizarAreaCuartel() {
    console.log('actualizar Area Cuartel');
    this.pathsCuartel = [];
    this.pathsCuartel = convertCoordenadaListToPaths(this.cuartel.coordenadaList);
    console.log(this.pathsCuartel);

  }

  actualizarMarker() {
    this.markers = [];
    this.markers = convertCoordenadaListToMarkerList(this.subcuartelSeleccionado.coordenadaList);
    this.actualizarPathCuartel();
  }

  editar() {
    this.editable = true;
  }

  actualizarCoordenadas() {
    this.subcuartelSeleccionado.coordenadaList = [];
    this.subcuartelSeleccionado.coordenadaList = convertMarkerListToCoordenadaList(this.markers);
  }


  mapClickeado() {
    alert('FUERA DEL CUARTEL');
  }
  polyClickeado($event: any) {
    console.log('poligono clickeado');
    if (this.editable) {
      const nuevoMarker = {
        nroOrden: this.markers.length + 1,
        lati: $event.coords.lat,
        longi: $event.coords.lng,
        id: $event.id,
      };
      this.markers.push(nuevoMarker);
      // this.actualizarPaths();
    }
  }


  eliminarMarcador() {
    console.log('click derecho');
    this.markers.pop();
    this.actualizarPathCuartel();
  }

  mOut: boolean = false;

  mouseOut($event: any) {
    console.log('mouseOut');
    this.mOut = true;
  }

  mouseOver($event: any) {
    console.log('mouseOver');

  }

  // cambio de lugar de marcador dentro del poligono
  posicionFinalMarcador(m, $event, i) {
    this.markers[i].lati = $event.coords.lat;
    this.markers[i].longi = $event.coords.lng;
    this.actualizarPathCuartel();
    console.log('posicionFinalMarcador');
  }

  polyMouseOver($event: any) {
    console.log('polyMouseOver');
  }

  polyMouseUp() {
    console.log('polyMouseUp');
  }

  polyMouseMove($event: any) {
    console.log('polyMouseMove');
  }

  // marcador fuera del campo con espacio libre

  polyMouseOut($event: any) {
    console.log('polyMouseOut');
  }
  // posicionFinalMarcador()

  // click dentro del poligono

  polyMouseDown($event: any) {
    console.log('polyMouseDown($event)');
  }
  // polyMouseUp


  poligonClickeado($event: any) {
    console.log('clikeado');
    if (this.editable) {
      const nuevoMarker = {
        nroOrden: this.markers.length + 1,
        lati: $event.latLng.lat(),
        longi: $event.latLng.lng(),
        id: null,
      };
      this.markers.push(nuevoMarker);
      this.actualizarPathCuartel();
    }
  }

}
