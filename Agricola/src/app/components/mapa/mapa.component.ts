import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CampoService } from '../../service/campo-service/campo.service';
import { MapaService } from '../../service/mapa-service/mapa.service';


// import { AfterContentInit, Directive, EventEmitter, OnChanges, OnDestroy, SimpleChanges, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LatLng, LatLngLiteral } from '../../../../node_modules/@agm/core';
// import { PolygonManager } from '../../../../node_modules/@agm/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  title: string = 'Maps Agricola';
  latInicio: number;
  lngInicio: number;
  pathsLocal: LatLngLiteral[];

  constructor(
    private campoService: CampoService,
    private mapaService: MapaService) {
    this.pathsLocal = this.mapaService.paths;
    this.latInicio = this.mapaService.latInicio;
    this.lngInicio = this.mapaService.lngInicio;

    console.log('pathsLocal');
    console.log(this.pathsLocal);
    console.log('latInicio');
    console.log(this.latInicio);
    console.log('lngInicio');
    console.log(this.lngInicio);
  }

  ngOnInit() {
  }


  paths2: LatLngLiteral[] = [
    { lat: 5, lng: 10 },
    { lat: 3, lng: 20 },
    { lat: 10, lng: 20 },
  ];

/*
  nestedPaths: Array<Array<LatLngLiteral>> = [[
    { lat: 0, lng: 10 },
    { lat: 0, lng: 20 },
    { lat: 10, lng: 20 },
    { lat: 10, lng: 10 },
    { lat: 0, lng: 10 },
  ], [
    { lat: 0, lng: 15 },
    { lat: 0, lng: 20 },
    { lat: 5, lng: 20 },
    { lat: 5, lng: 15 },
    { lat: 0, lng: 15 }
  ]]
*/

}
