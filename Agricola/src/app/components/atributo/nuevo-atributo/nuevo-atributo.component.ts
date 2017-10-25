import { Component, OnInit } from '@angular/core';
import {AtributoService} from '../../../service/atributo-service/atributo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-atributo',
  templateUrl: './nuevo-atributo.component.html',
  styleUrls: ['./nuevo-atributo.component.css'],
})
export class NuevoAtributoComponent implements OnInit {
  atributo: any;
  editable: boolean;

  constructor(
    private atributoService: AtributoService,
    private router: Router) {
    this.atributo = { 'nombreAtributo': '', 'id': null};
    this.editable = true;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.atributo);
    console.log('onSubmit');

    this.atributoService.guardarAtributo(this.atributo)
    .then((atributo) => {
      console.log(atributo);
      this.router.navigate(['/configurar/atributos']);
    });

  }

}
