import { Component, OnInit } from '@angular/core';
import { InsumoService } from '../../../service/insumo-service/insumo.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-insumo',
  templateUrl: './nuevo.insumo.component.html',
  styleUrls: ['./nuevo.insumo.component.css'],
})
export class NuevoInsumoComponent implements OnInit {
  insumo: any;
  editable: boolean;

  constructor(
    private insumoService: InsumoService,
    private router: Router) {
    this.insumo = { 'descripcion': '', 'id': null, 'codigo': 0 };
    this.editable = true;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.insumo);
    console.log('onSubmit');

    this.insumoService.guardarInsumo(this.insumo)
      .then((insumo) => {
        console.log(insumo);
        this.router.navigate(['/configurar/insumos']);
      });
  }
  
}
