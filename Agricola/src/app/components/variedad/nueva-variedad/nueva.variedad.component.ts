import { Component, OnInit } from '@angular/core';
import { VariedadService } from '../../../service/variedad-service/variedad.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nueva-variedad',
  templateUrl: './nueva.variedad.component.html',
  styleUrls: ['./nueva.variedad.component.css'],
})
export class NuevaVariedadComponent implements OnInit {
  variedad: any;
  editable: boolean;

  constructor(
    private variedadService: VariedadService,
    private router: Router) {
    this.variedad = { 'nombre': '', 'id': null, 'colorVariedad': '' };
    this.editable = true;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.variedad);
    console.log('onSubmit');

    this.variedadService.guardarVariedad(this.variedad)
      .then((variedad) => {
        console.log(variedad);
        this.router.navigate(['/configurar/variedades']);
      });
  }
}
