
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  {MaquinariaService} from '../../service/maquinaria-service/maquinaria.service';

@Component({
  selector: 'app-maquinaria',
  templateUrl: './maquinaria.component.html',
  styleUrls: ['./maquinaria.component.css'],
})
export class MaquinariaComponent implements OnInit {
maquinarias: any[];

  constructor(
    private maquinariaService: MaquinariaService,
    private router: Router) {
   }

  ngOnInit() {
  this.buscarMaquinaria();
  }

  buscarMaquinaria() {
    this.maquinariaService.getMaquinarias()
    .then((maquinarias) => {
      this.maquinarias = maquinarias;
      console.log(maquinarias);
    });
  }

  eliminarMaquinaria(idMaquinaria: string) {
    this.maquinariaService.eliminarMaquinaria(idMaquinaria)
    .then((maquinaria) => {
      console.log(maquinaria);
      this.buscarMaquinaria();
    });
  }

}
