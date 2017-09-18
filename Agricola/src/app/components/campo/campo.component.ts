import { Component, OnInit } from '@angular/core';
import {CampoService} from '../../service/campo-service/campo.service';

import { ActivatedRoute } from '@angular/router';
import {MapaService} from '../../service/mapa-service/mapa.service';

import {CampoDTO} from './campo';
import {CoordenadaClass} from '../../class/coordenada';
import {NuevoCampoService} from '../../service/campo-service/nuevo-campo.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-campo',
     templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.css']
})
export class CampoComponent implements OnInit {
campos:any = null;
//campo: CampoClass = new CampoClass();

  constructor(private campoService: CampoService,   private route: ActivatedRoute,
     private mapaService: MapaService,private nuevoCampoService: NuevoCampoService
     , private router: Router) {

  this.campoService.getcampos();
  

}
  ngOnInit() {
  this.campos = this.campoService.camposDTO
 

    }

    eliminarCampo(idCampo){
      this.campoService.eliminarCampo(idCampo);
      this.router.navigate(["/campo"])
    }

    /*
    clickVerMapa(coord: CoordenadaClass[] ){

this.mapaService.cargarArea(coord);

    }
    clickEditarCampo(campo: CampoClass){
      console.log("EditarCampo");
      console.log(campo);
      this.campo = campo;
     this.nuevoCampoService.editarCampo(campo);
    }

    clickNuevoCampo(){
      this.campo = null;
      console.log("clickNuevoCampo");
      console.log(this.campo);
      this.nuevoCampoService.editarCampo(this.campo);
    }

*/
}



