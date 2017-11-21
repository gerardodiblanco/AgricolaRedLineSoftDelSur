
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  {MaquinariaService} from '../../service/maquinaria-service/maquinaria.service';
import {InsumoService} from '../../service/insumo-service/insumo.service';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css'],
})
export class InsumoComponent implements OnInit {
insumos: any[];

  constructor(
    private insumoService: InsumoService,
    private router: Router) {
   }

  ngOnInit() {
  this.buscarInsumos();
  }

  buscarInsumos() {
    this.insumoService.getInsumos()
    .then((insumos) => {
      this.insumos = insumos;
      console.log(insumos);
    });
  }

  eliminarInsumo(idInsumo: string) {
    this.insumoService.eliminarInsumo(idInsumo)
    .then((insumo) => {
      console.log(insumo);
      this.buscarInsumos();
    });
  }

}
