import { Component, OnInit } from '@angular/core';
import {AtributoService} from '../../service/atributo-service/atributo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atributo',
  templateUrl: './atributo.component.html',
  styleUrls: ['./atributo.component.css'],
})
export class AtributoComponent implements OnInit {
atributos: any[];

  constructor(
    private atributoService: AtributoService,
    private router: Router) {
   }

  ngOnInit() {
  this.buscarAtributos();
  }

  buscarAtributos() {
    this.atributoService.getAtributos()
    .then((atributo) => {
      this.atributos = atributo;
      console.log(atributo);
    });
  }

  eliminarAtributo(idAtributo: string) {
    if (confirm('¿Está seguro que desea eliminar')) {

    this.atributoService.eliminarAtributo(idAtributo)
    .then((atributo) => {
      console.log(atributo);
      this.buscarAtributos();
    });
  }
}
}
