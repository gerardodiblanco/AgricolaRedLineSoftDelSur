import { Component, OnInit } from '@angular/core';
import {CampoService ,Campo ,Coordenada} from '../../service/campo.service';

import { ActivatedRoute } from '@angular/router';
import {MapaService} from '../../service/mapa.service';

@Component({
  selector: 'app-campo',
     templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.css']
})
export class CampoComponent implements OnInit {
campos: Campo[];


  constructor(private campoService: CampoService,   private route: ActivatedRoute,
     private mapaService: MapaService) {

  this.campoService.getcampos();
      
     console.log("dentro de component")
 console.log(this.campoService.campos)
 }



  ngOnInit() {
  this.campos = this.campoService.campos
  
    }
    clickVerMapa(coord: Coordenada[] ){
this.mapaService.cargarArea(coord);

    }

}



