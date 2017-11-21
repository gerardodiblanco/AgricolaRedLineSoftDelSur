import { Component, OnInit } from '@angular/core';
import { TratoService } from '../../../service/trato-service/trato.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-trato',
  templateUrl: './nuevo.trato.component.html',
  styleUrls: ['./nuevo.trato.component.css'],
})
export class NuevoTratoComponent implements OnInit {
  trato: any;
  editable: boolean;

  constructor(
    private tratoService: TratoService,
    private router: Router) {
    this.trato = { 'nombre': '', 'id': null, 'codigo': 0, 'importe': 0, 'unMinima': 0 };
    this.editable = true;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.trato);
    console.log('onSubmit');

    this.tratoService.guardarTrato(this.trato)
      .then((trato) => {
        console.log(trato);
        this.router.navigate(['/configurar/tratos']);
      });
  }
}
