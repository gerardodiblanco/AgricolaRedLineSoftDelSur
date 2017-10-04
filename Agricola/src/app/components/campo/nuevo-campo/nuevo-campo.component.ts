import { Component, OnInit, } from '@angular/core';
import { CampoClass } from '../../../class/campo'
import { DomicilioClass } from '../../../class/domicilio'
import { CoordenadaClass } from '../../../class/coordenada';
//import { ActivatedRoute } from '@angular/router';
import { LatLng, LatLngLiteral } from '../../../../../node_modules/@agm/core';
//import { PolygonManager } from '../../../../../node_modules/@agm/core';
import { NuevoCampoService } from '../../../service/campo-service/nuevo-campo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable'
import { TipoCampoService } from '../../../service/tipoCampo-service/tipo-campo-service.service'
import { Router } from '@angular/router';
import { LocalidadService } from '../../../service/localidad-service/localidad.service'
import { CampoService } from '../../../service/campo-service/campo.service';
import { ProveedorService } from '../../../service/proveedor-service/poroveedor.service';
import { ordenarArray } from '../../mapa/funciones.mapa';
import { convertMarkerListToCoordenadaList } from '../../mapa/funciones.mapa';
import { marker } from '../../mapa/funciones.mapa';
import { convertCoordenadaListToMarkerList } from '../../mapa/funciones.mapa';
import { convertMarkerListToPaths } from '../../mapa/funciones.mapa';

@Component({
  selector: 'app-nuevo-campo',
  templateUrl: './nuevo-campo.component.html',
  styleUrls: ['./nuevo-campo.component.css'],

})
export class NuevoCampoComponent implements OnInit {

  titulo: string = "Campo - ";

  campo: any;
  domicilio: DomicilioClass;
  coordenadas: Array<any>;
  coordAux: any;
  tipoCampo: any;
  tipoCampoSeleccionado: any;
  localidades: any;
  proveedores: any;

  editable: boolean;


  markers: marker[] = [];
  paths: Array<LatLngLiteral> = [];

  latInicio = -32.880913;
  lngInicio = -68.83319;

  constructor(private nuevoCampoService: NuevoCampoService,
    private route: ActivatedRoute, private tipoCampoService: TipoCampoService,
    private localidadService: LocalidadService,
   
    private router: Router,
    private proveedorService: ProveedorService) {
    this.editable = false;
    this.llamarServicios();

  }

    llamarServicios() {
      let id: Observable<string> = this.route.params.map(p => p.id);
      console.log(id);
      id.subscribe(id =>
        this.nuevoCampoService
          .buscarCampo(id)
          .then(campo => {
            this.campo = campo;
            console.log(this.campo);
            if (campo.idCampo == null) { this.editable = true; this.titulo = "Nuevo Campo" }
            this.titulo += campo.nombre
          }));


    //busca los tipos de campo
    this.tipoCampoService.getTiposCampo()
      .then(tipoCampo => { this.tipoCampo = tipoCampo })
    // busca las localidades
    this.localidadService.getLocalidades()
      .then(localidad => { this.localidades = localidad })

    // busca las proveedores
    this.proveedorService.getProveedores()
      .then(proveedor => { this.proveedores = proveedor })
  }


  ngOnInit() {

  }

  onSubmit() {
    if (confirm("confirmar")) {
      console.log("onSubmit");
      //llamar a nuevo-campoService para guardar el campo
      this.actualizarCoordenadas();
      this.nuevoCampoService.guardarCampo(this.campo)
      .then(c=>{
        this.router.navigate(['/campo']);
      });
      //confirm("confirmar");
    
     
    }
  }

  marcadorClicleado(marcador: marker, index: number) {
    console.log("Marcador clickeado: " + marcador.nroOrden + " en el index: " + index);
  }

  mapClickeado($event: any) {
    console.log("Mapa Clickeado");
    if (this.editable) {
      var nuevoMarker = {
        nroOrden: this.markers.length + 1,
        lati: $event.coords.lat,
        longi: $event.coords.lng,
        id: $event.id,
      }
      this.markers.push(nuevoMarker);
      this.actualizarPaths();
    }
  }

  posicionFinalMarcador(m, $event, i) {
    this.markers[i].lati = $event.coords.lat;
    this.markers[i].longi = $event.coords.lng;
    this.actualizarPaths();
  }

  actualizarPaths() {
    this.paths = [];
    this.paths = convertMarkerListToPaths(this.markers);

  }

  actualizarMarker() {
    if (this.campo.coordenadaList != []) {
      this.markers = [];
      this.markers = convertCoordenadaListToMarkerList(this.campo.coordenadaList);
      this.actualizarPaths();
    }
  }


  actualizarCoordenadas() {
    this.campo.coordenadaList = [];
    this.campo.coordenadaList = convertMarkerListToCoordenadaList(this.markers);
  }

  eliminarMarcador() {
    console.log("click derecho");
    this.markers.pop();
    this.actualizarPaths();
  }

  editar() {
    this.editable = true;
  }
}

