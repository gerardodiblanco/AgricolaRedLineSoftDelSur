import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {OpcionAtributoService} from '../../../service/atributo-service/opcion-atriburo.service';

@Component({
  selector: 'app-opciones-atributo',
  templateUrl: './opciones-atributo.component.html',
  styleUrls: ['./opciones-atributo.component.css'],
})
export class OpcionesAtributoComponent implements OnInit {
opciones: any[];
  constructor(
    private opcionAtributoService: OpcionAtributoService,
    private router: Router) { }

  ngOnInit() {
    this.buscarOpcionesAtributo();
  }

  buscarOpcionesAtributo() {
    this.opcionAtributoService.getOpciones()
    .then((opciones) => {
      this.opciones = opciones;
      console.log(opciones);
    });
  }

  eliminarOpcion(idOpcion: string) {
    this.opcionAtributoService.eliminarOpcion(idOpcion)
    .then((opciones) => {
      console.log(opciones);
      this.buscarOpcionesAtributo();
    });
  }

}
