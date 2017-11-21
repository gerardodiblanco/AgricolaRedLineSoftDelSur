import { Component, OnInit } from '@angular/core';
import { MaquinariaService } from '../../../service/maquinaria-service/maquinaria.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-nueva-maquinaria',
  templateUrl: './nueva.maquinaria.component.html',
  styleUrls: ['./nueva.maquinaria.component.css'],
})
export class NuevaMaquinariaComponent implements OnInit {
  maquinaria: any;
  editable: boolean;

  constructor(
    private maquinariaService: MaquinariaService,
    private router: Router) {
    this.maquinaria = { 'descripcion': '', 'id': null, 'codigo': 0 };
    this.editable = true;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.maquinaria);
    console.log('onSubmit');

    this.maquinariaService.guardarMaquinaria(this.maquinaria)
      .then((maquinaria) => {
        console.log(maquinaria);
        this.router.navigate(['/configurar/maquinarias']);
      });
  }
}
