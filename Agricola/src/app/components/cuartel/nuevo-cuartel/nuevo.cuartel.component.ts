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
import { convertMarkerListToPaths } from '../../mapa/funciones.mapa';
import { convertMarkerListToCoordenadaList } from '../../mapa/funciones.mapa';

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
  arrayPathsCuarteles: Array<Array<LatLngLiteral>> = [];
  PathsCuartel: Array<LatLngLiteral> = new Array<LatLngLiteral>();
  markers: marker[] = [];
  latInicio = -32.880913;
  lngInicio = -68.83319;
  editable: boolean;
  idCampo: any = "";
  idCuartel: any = "";


  constructor(private campoService: CampoService, private nuevoCampoService: NuevoCampoService,
    private cuartelService: CuartelService, private route: ActivatedRoute,
    private router: Router) {
    this.editable = true;
    this.cuartelSeleccionado = {
      codigo: 0, codigoCampo: 0, coordenadaList: [], cuitCampo: "",
      descripcion: "", domicilioCampo: "", estadoCampo: "", hectarea: 0, hectareaCampo: 0,
      idCampo: "", idCuartel: "", nombreCampo: "", proveedorCampo: "", subcuarteles: [], tipoCampo: ""
    }
  }

  ngOnInit() {
    // Recogemos los parametros de la URL
    this.route.params.subscribe(params => {
      console.log("params");
      console.log(params);
      if (params['idCampo'] != null) {
        this.idCampo = params['idCampo'];
        console.log("dentro del if buscar por idCampo");
        this.nuevoCampoService
          .buscarCampo(params['idCampo'])
          .then(c => {
            this.campo = c;
            console.log("campo")
            console.log(this.campo);
            this.buscarCuarteles(c);
            this.actualizarAreaCampo();
     
          });
      }

      if (params['idCuartel'] != null) {
        this.editable = false;
        this.idCuartel = params['idCuartel'];
        console.log("dentro del if buscar por idCuartel");
        this.cuartelService
          .buscarCuartel(params['idCuartel'])
          .then(cuartel => {
            this.cuartelSeleccionado = cuartel;
            console.log("buscar cuartel");
            console.log(this.cuartelSeleccionado);
            //   this.buscarCampo(cuartel);
            if (cuartel.idCampo == null) {
              this.editable = true; this.titulo = "Nuevo Cuartel"
              //   this.buscarCampoPorId(id);
            } else {
              this.titulo += cuartel.descripcion;
            }
            this.actualizarMarker();
          })
      }
    });
  }

  onSubmit(){
    console.log("onSubmit")
    console.log("save cuartel");
    console.log(this.cuartelSeleccionado);
    this.cuartelSeleccionado.idCampo = this.campo.idCampo;
    this.actualizarCoordenadas();
    this.cuartelService.guardarCuartel(this.cuartelSeleccionado)
    .then(rta => {
      this.router.navigate(['/cuarteles']);
    });
    

   
  }

  buscarCuarteles(campo: any) {
    if (campo != null) {
      this.cuartelService.getCuarteles(campo.idCampo)
        .then(cuarteles => {
          this.cuarteles = cuarteles
          console.log("cuarteles : ");
          console.log(this.cuarteles);
          if (this.cuarteles) {
            this.actualizarAreaCuarteles();
          }
        });
    }
  }

  actualizarAreaCuarteles() {
    console.log("actualizar Areas Cuarteles ")
    this.arrayPathsCuarteles = [];
    this.elimiarCuartel();
    this.arrayPathsCuarteles = convertElementoConCoordenadasToArrayPaths(this.cuarteles);
    console.log(this.arrayPathsCuarteles);
  }
  //eliminar cuartel seleccionado de cuarteles

  elimiarCuartel() {
    for (var index = 0; index < this.cuarteles.length; index++) {
      var element = this.cuarteles[index];
      console.log(element.idCuartel);
      console.log(this.cuartelSeleccionado.idCuartel);
      if (element.idCuartel == this.cuartelSeleccionado.idCuartel){
        console.log("es igual");
      console.log(element.descripcion);
      this.cuarteles.splice(index,1);
      }
    }
  }

  actualizarPathCuartel() {
    this.PathsCuartel = convertMarkerListToPaths(this.markers);
  }


  actualizarAreaCampo() {
    console.log("actualizar Area Campo");
    this.pathsCampo = [];
    this.pathsCampo = convertCoordenadaListToPaths(this.campo.coordenadaList);
    console.log(this.pathsCampo);

  }

  actualizarMarker() {
    this.markers = [];
    this.markers = convertCoordenadaListToMarkerList(this.cuartelSeleccionado.coordenadaList)
    this.actualizarPathCuartel();
  }

  editar() {
    this.editable = true;
  }

  actualizarCoordenadas() {
    this.cuartelSeleccionado.coordenadaList = [];
    this.cuartelSeleccionado.coordenadaList = convertMarkerListToCoordenadaList(this.markers);
  }


  mapClickeado() {
    alert("FUERA DEL CAMPO");
  }
  polyClickeado($event: any) {
    console.log("poligono clickeado");
    if (this.editable) {
      var nuevoMarker = {
        nroOrden: this.markers.length + 1,
        lati: $event.coords.lat,
        longi: $event.coords.lng,
        id: $event.id,
      }
      this.markers.push(nuevoMarker);
      //this.actualizarPaths();
    }
  }


  eliminarMarcador() {
    console.log("click derecho");
    this.markers.pop();
    this.actualizarPathCuartel();
  }

  


  mOut: boolean = false;

  mouseOut($event: any) {
    console.log("mouseOut");
    this.mOut = true;
  }

  mouseOver($event: any) {
    console.log("mouseOver");

  }

  //cambio de lugar de marcador dentro del poligono
  posicionFinalMarcador(m, $event, i) {
    this.markers[i].lati = $event.coords.lat;
    this.markers[i].longi = $event.coords.lng;
    this.actualizarPathCuartel()
    console.log("posicionFinalMarcador");
  }

  polyMouseOver($event: any) {
    console.log("polyMouseOver");
  }

  polyMouseUp() {
    console.log("polyMouseUp");
  }

  polyMouseMove($event: any) {
    console.log("polyMouseMove");
  }

  //marcador fuera del campo con espacio libre

  polyMouseOut($event: any) {
    console.log("polyMouseOut");
  }
  //posicionFinalMarcador()

  //click dentro del poligono

  polyMouseDown($event: any) {
    console.log("polyMouseDown($event)");
  }
  //polyMouseUp


  poligonClickeado($event: any) {
    console.log("clikeado");
    if (this.editable) {
      var nuevoMarker = {
        nroOrden: this.markers.length + 1,
        lati: $event.latLng.lat(),
        longi: $event.latLng.lng(),
        id: null,
      }
      this.markers.push(nuevoMarker);
      this.actualizarPathCuartel();
    }
  }


}