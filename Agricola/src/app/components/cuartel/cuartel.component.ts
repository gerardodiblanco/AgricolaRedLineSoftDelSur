import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampoService } from '../../service/campo-service/campo.service';
import { NuevoCampoService } from '../../service/campo-service/nuevo-campo.service';
import {CuartelService} from '../../service/cuartel-service/cuartel.service';


@Component({
  selector: 'app-cuartel',
  templateUrl: './cuartel.component.html',
  styleUrls: ['./cuartel.component.css']
})
export class CuartelComponent implements OnInit {
campos: any[] = [];
selectorCampo: any = null;
campoSeleccionado: any;
cuarteles: any[] = [];

latInicio = -32.880913;
lngInicio = -68.83319;


  constructor(private campoService:CampoService,private nuevoCampoService: NuevoCampoService,
  private cuartelService:CuartelService ) {


    this.buscarCamposService()

  }

  buscarCamposService() {
    this.campos = [];
    this.campoService.getcampos()
      .then(campos => {
        this.campos = campos
      
      })
  }



  ngOnInit() {
  }

  buscarCuarteles(nombreCampo){
  console.log("se selecciono un campo");
  console.log(nombreCampo);
  for(let campo of this.campos){
    if(campo.nombre == nombreCampo){
      console.log(campo.idCampo);

      this.cuartelService.getCuarteles(campo.idCampo)
      .then(cuarteles =>{this.cuarteles = cuarteles
        console.log(this.cuarteles);})
      
    }
  }
}




}



