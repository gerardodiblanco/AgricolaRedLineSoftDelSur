import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-opcion',
  templateUrl: './nueva-opcion.component.html',
  styleUrls: ['./nueva-opcion.component.css']
})
export class NuevaOpcionComponent implements OnInit {
  opcion:any;
  editable:any;

    constructor() {
    this.opcion = '';
    this.editable = true;
  }

  ngOnInit() {
  }

}
