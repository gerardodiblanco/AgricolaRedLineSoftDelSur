import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-atributo',
  templateUrl: './nuevo-atributo.component.html',
  styleUrls: ['./nuevo-atributo.component.css']
})
export class NuevoAtributoComponent implements OnInit {
atributo:any;
editable:any;

  constructor() {
  this.atributo = '';
  this.editable = true;
}

  ngOnInit() {
  }

}
