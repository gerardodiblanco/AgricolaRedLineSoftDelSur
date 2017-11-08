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
import { VariedadService } from '../../../service/variedad-service/variedad.service';

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
  atributoSeleccionado: any[];
  nuevosAtributos: any[];
  atributos: any[];
  variedades: any[];

  constructor(
    private atributoService: AtributoService,
    private campoService: CampoService,
    private nuevoCampoService: NuevoCampoService,
    private cuartelService: CuartelService,
    private route: ActivatedRoute,
    private subCuartelService: SubCuartelService,
    private router: Router, private variedadService: VariedadService) {
    this.variedadService.getVariedades()
      .then((variedades) => {
      this.variedades = variedades;
      console.log('variedades');
      console.log(variedades);
      });
    this.editable = true;

    // falta
    this.subcuartelSeleccionado = {
      codigo: 0, codigoCampo: 0, coordenadaList: [], cuitCampo: '',
      descripcion: '', domicilioCampo: '', estadoCampo: '', hectarea: 0, hectareaCampo: 0,
      idCampo: '', idCuartel: '', idSubCuartel: null, nombreCampo: '', proveedorCampo: '',
      subcuarteles: [], tipoCampo: '', atributosSubCuartel: [], variedad: '',
    };
    this.atributoSeleccionado = [{ nombreOpcion: '' }];
  }

  ngOnInit() {
    // Recogemos los parametros de la URL
    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);

      if (params['idCuartel']) {
        console.log('buscar todos los sub cuarteles por idCuartel');
        this.subCuartelService.getSubCuarteles(params['idCuartel'])
          .then((sub) => {
            this.subcuarteles = sub;
            this.cuartelService.buscarCuartel(params['idCuartel'])
              .then((cuart) => {
                this.cuartel = cuart;
                console.log('cuartel');
                console.log(cuart);

                if (params['idSubCuartel']) {
                  console.log('idSubCuartel != de null');
                  this.idSubCuartel = params['idSubCuartel'];
                  this.subCuartelService
                    .getSubCuartel(params['idSubCuartel'])
                    .then((sc) => {
                      this.subcuartelSeleccionado = sc;

                      this.buscarAtributos();
                      this.actualizarMarker();
                      this.actualizarPathSubCuartel();
                      this.actualizarAreaSubCuarteles();
                      this.actualizarAreaCuartel();
                    });
                }
                if (!(params['idSubCuartel'])) {
                  this.actualizarAreaCuartel();
                  this.buscarAtributos();
                  this.actualizarAreaSubCuarteles();
                  this.subcuartelSeleccionado.idCuartel = params['idCuartel'];
                }
              });
          });
      }
    });
  }

  buscarAtributos() {
    this.atributos = [];
    this.atributoService.getAtributosConOpciones()
      .then((atr) => {

        //    const atr = a;

        console.log('Atributos con opciones ');
        console.log(atr);

        this.atributos = (atr);
        console.log(this.atributos);
        this.actualizarAtributosNuevos(this.atributos);
      });
  }

  actualizarAtributosNuevos(atr: any[]) {
    //  this.nuevosAtributos = [];
    //  this.nuevosAtributos = atr;
    this.nuevosAtributos = [];
    for (const a of atr) {
      this.nuevosAtributos.push(a);
    }

    for (const atributo of atr) {
      console.log('ATRIBUTO');
      console.log(atributo);
      // eliminar de this.atributos los atributos que ya contiene el subCartel
      for (const atributoSubCuartel of this.subcuartelSeleccionado.atributosSubCuartel) {
        console.log('ATRIBUTO SUB CUARTEL');
        console.log(atributoSubCuartel);
        console.log('IDs');
        console.log(atributo.id);
        console.log(atributoSubCuartel.idAtributo);
        if (atributo.id === atributoSubCuartel.idAtributo) {
          console.log('SON IGUALES');

          this.nuevosAtributos.splice(this.nuevosAtributos.indexOf(atributo), 1);
        }
      }
    }
  }

  agregarAtributo(op: any, a: any) {
    console.log(a);
    console.log(op);
    const atrib = {
      atributoOpcionModelList: a.opciones,
      fechaInicioAsignacion: null,
      idAtributo: a.id,
      idAtributoSubCuartel: null,
      idOpcion: null,
      idSubCuartel: this.subcuartelSeleccionado.idSubCuartel,
      nombreAtributo: a.nombreAtributo,
      nombreOpcion: a.opcionSeleccionada,
    };
    this.subcuartelSeleccionado.atributosSubCuartel.push(atrib);
    console.log(atrib);
    this.actualizarAtributosNuevos(this.atributos);
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

  actualizarPathSubCuartel() {
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
    this.actualizarPathSubCuartel();
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
    this.actualizarPathSubCuartel();
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
    this.actualizarPathSubCuartel();
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

  polyMouseOut($event: any) {
    console.log('polyMouseOut');
  }

  polyMouseDown($event: any) {
    console.log('polyMouseDown($event)');
  }

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
      this.actualizarPathSubCuartel();
    }
  }
}
