import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TratoService} from '../../service/trato-service/trato.service';

@Component({
  selector: 'app-trato',
  templateUrl: './trato.component.html',
  styleUrls: ['./trato.component.css'],
})
export class TratoComponent implements OnInit {
tratos: any[];

  constructor(
    private tratoService: TratoService,
    private router: Router) {
   }

  ngOnInit() {
  this.buscarTratos();
  }

  buscarTratos() {
    this.tratoService.getTratos()
    .then((tratos) => {
      this.tratos = tratos;
      console.log(tratos);
    });
  }

  eliminarTrato(idTrato: string) {
    this.tratoService.eliminarTrato(idTrato)
    .then((trato) => {
      console.log(trato);
      this.buscarTratos();
    });
  }

}
