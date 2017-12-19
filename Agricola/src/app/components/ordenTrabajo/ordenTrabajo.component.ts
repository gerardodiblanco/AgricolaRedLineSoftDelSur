
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {OrdenTrabajoService} from '../../service/ordenTrabajo-service/ordenTrabajo.service';

@Component({
  selector: 'app-ordentrabajo',
  templateUrl: './ordenTrabajo.component.html',
  styleUrls: ['./ordenTrabajo.component.css'],
})
export class OrdenTrabajoComponent implements OnInit {
ordenTrabajoList: any[];

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private router: Router) {
   }

  ngOnInit() {
  this.buscarOrdenTrabajoList();
  }

  buscarOrdenTrabajoList() {
    this.ordenTrabajoService.getOrdenesTrabajos()
    .then((ot) => {
      this.ordenTrabajoList = ot;
      console.log(ot);
    });
  }

  eliminarOrdenTrabajo(idOrdenTrabajo: string) {
    if (confirm('¿Está seguro que desea eliminar?')) {

    this.ordenTrabajoService.eliminarOrdenTrabajo(idOrdenTrabajo)
    .then((ot) => {
      console.log(ot);
      this.buscarOrdenTrabajoList();
    });
  }
  }

}
