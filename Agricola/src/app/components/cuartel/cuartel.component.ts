import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampoService } from '../../service/campo-service/campo.service';



@Component({
  selector: 'app-cuartel',
  templateUrl: './cuartel.component.html',
  styleUrls: ['./cuartel.component.css']
})
export class CuartelComponent implements OnInit {
campos: any[] = [];
campoSeleccionado: any = null;

  constructor(private campoService:CampoService) {


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



}



