import { Component, OnInit } from '@angular/core';
import {CampoService} from '../../service/campo-service/campo.service';

import { ActivatedRoute } from '@angular/router';
import {MapaService} from '../../service/mapa-service/mapa.service';

import {CampoClass} from '../../class/campo';
import {CoordenadaClass} from '../../class/coordenada';


@Component({
  selector: 'app-campo',
     templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.css']
})
export class CampoComponent implements OnInit {
campos: CampoClass[];

  constructor(private campoService: CampoService,   private route: ActivatedRoute,
     private mapaService: MapaService) {

  this.campoService.getcampos();
      
     console.log("dentro de component")
 console.log(this.campoService.campos)

}
  ngOnInit() {
  this.campos = this.campoService.campos
 

    }
    clickVerMapa(coord: CoordenadaClass[] ){

this.mapaService.cargarArea(coord);

    }



}



