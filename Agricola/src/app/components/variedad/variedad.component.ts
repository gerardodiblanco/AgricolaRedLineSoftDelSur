import { Component, OnInit } from '@angular/core';
import {VariedadService} from '../../service/variedad-service/variedad.service';

@Component({
  selector: 'app-variedad',
  templateUrl: './variedad.component.html',
  styleUrls: ['./variedad.component.css']
})
export class VariedadComponent implements OnInit {

variedades:any[]=[];

  constructor(private variedadService: VariedadService) {

   }

  ngOnInit() {

    this.variedadService.getVariedades()
    .then(vs => {
      this.variedades = vs;

      console.log(vs);
      console.log(this.variedades);
    })


  }

}
