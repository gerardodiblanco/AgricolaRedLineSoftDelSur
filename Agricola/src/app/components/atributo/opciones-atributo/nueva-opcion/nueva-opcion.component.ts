import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-opcion',
  templateUrl: './nueva-opcion.component.html',
  styleUrls: ['./nueva-opcion.component.css'],
})
export class NuevaOpcionComponent implements OnInit {
  opcion: any;
  editable: boolean;

    constructor() {
    this.opcion = '';
    this.editable = true;
  }

  ngOnInit() {
  }

}
