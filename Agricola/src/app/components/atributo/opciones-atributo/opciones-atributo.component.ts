import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpcionAtributoService } from '../../../service/atributo-service/opcion-atriburo.service';

@Component({
  selector: 'app-opciones-atributo',
  templateUrl: './opciones-atributo.component.html',
  styleUrls: ['./opciones-atributo.component.css'],
})
export class OpcionesAtributoComponent implements OnInit {
  opciones: any[];
  idAtributo: string;
  constructor(
    private opcionAtributoService: OpcionAtributoService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);
      this.idAtributo = params['idAtributo'];
      this.buscarOpcionesAtributo(params['idAtributo']);
    });
  }
  crearOpcion() {
    
    this.router.navigate(['configurar/atributos/opcionesAtributo/nueva-opcion/', this.idAtributo]);
  }

  buscarOpcionesAtributo(idAtributo: string) {
        this.opcionAtributoService.getOpciones(idAtributo)
          .then((opciones) => {
            this.opciones = opciones;
            console.log(opciones);
          });
      }

  eliminarOpcion(idOpcion: string) {
        this.opcionAtributoService.eliminarOpcion(idOpcion)
          .then((opciones) => {
            console.log(opciones);
            this.buscarOpcionesAtributo(this.idAtributo);
          });
      }

}
