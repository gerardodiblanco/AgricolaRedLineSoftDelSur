import { Component, OnInit } from '@angular/core';
import { CampoService } from '../../service/campo-service/campo.service';

import { ActivatedRoute } from '@angular/router';
import { MapaService } from '../../service/mapa-service/mapa.service';

import { CampoDTO } from './campo';
import { CoordenadaClass } from '../../class/coordenada';
import { NuevoCampoService } from '../../service/campo-service/nuevo-campo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-campo',
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.css'],
})
export class CampoComponent implements OnInit {
  campos: any[] = [];

  constructor(
    private campoService: CampoService,
    private route: ActivatedRoute,
    private mapaService: MapaService,
    private nuevoCampoService: NuevoCampoService,
    private router: Router) {
    this.buscarCamposService();
  }

  buscarCamposService() {
    this.campos = null;
    this.campoService.getcampos()
      .then((campos) => {
        this.campos = campos;
        console.log('campos');
        console.log(this.campos);
      });
  }

  ngOnInit() {
  }

  eliminarCampo(idCampo) {
    if (confirm('¿Está seguro que desea eliminar el campo?')) {

      this.campoService.eliminarCampo(idCampo)
        .then((c) => {
          this.buscarCamposService();
        });
    }
    console.log(this.campos);
  }
}
