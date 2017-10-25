import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atributo',
  templateUrl: './atributo.component.html',
  styleUrls: ['./atributo.component.css'],
})
export class AtributoComponent implements OnInit {
atributos: any[] = [{nombre: 'nombre', id: '1234'}];
  constructor() { }

  ngOnInit() {
  }

}
