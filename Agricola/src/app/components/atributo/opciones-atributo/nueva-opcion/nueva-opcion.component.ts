import { Component, OnInit } from '@angular/core';
import { OpcionAtributoService } from '../../../../service/atributo-service/opcion-atriburo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nueva-opcion',
  templateUrl: './nueva-opcion.component.html',
  styleUrls: ['./nueva-opcion.component.css'],
})
export class NuevaOpcionComponent implements OnInit {
  opcion: any;
  editable: boolean;


  constructor(
    private opcionAtributoService: OpcionAtributoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.opcion = { 'nombreOpcion': '', 'id': null, 'nombreAtributo': '', 'idAtributo': '' };
    this.editable = true;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);

      this.opcion.idAtributo = params['idAtributo'];
    });
  }

  onSubmit() {
        console.log(this.opcion);
        console.log('onSubmit');

        this.opcionAtributoService.guardarOpcion(this.opcion)
          .then((opcion) => {
            console.log(opcion);
            this.router.navigate(['/configurar/atributos/opcionesAtributo', this.opcion.idAtributo ]);
          });

      }

}
