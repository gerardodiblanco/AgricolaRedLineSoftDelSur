
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UnidadTrabajoService} from '../../service/unidadTrabajo-service/unidadTrabajo.service';

@Component({
  selector: 'app-unidadtrabajo',
  templateUrl: './unidadTrabajo.component.html',
  styleUrls: ['./unidadTrabajo.component.css'],
})
export class UnidadTrabajoComponent implements OnInit {
unidadTrabajoList: any[];

  constructor(
    private unidadTrabajoService: UnidadTrabajoService,
    private router: Router) {
   }

  ngOnInit() {
  this.buscarUnidadTrabajoList();
  }

  buscarUnidadTrabajoList() {
    this.unidadTrabajoService.getUnidadesTrabajos()
    .then((ut) => {
      this.unidadTrabajoList = ut;
      console.log(ut);
    });
  }

  eliminarUnidadTrabajo(idUnidadTrabajo: string) {
    if (confirm('¿Está seguro que desea eliminar?')) {

    this.unidadTrabajoService.eliminarUnidadTrabajo(idUnidadTrabajo)
    .then((ut) => {
      console.log(ut);
      this.buscarUnidadTrabajoList();
    });
  }
  }

}
