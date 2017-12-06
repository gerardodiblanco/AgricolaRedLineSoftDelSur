import { Component, OnInit } from '@angular/core';
import { UnidadTrabajoService } from '../../../service/unidadTrabajo-service/unidadTrabajo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from '../../../service/personal-service/personal.service';
import { SubCuartelService } from '../../../service/subCuartel-service/subCuartel.service';
import { DepositoService } from '../../../service/deposito-service/deposito-service';
import { CampoService } from '../../../service/campo-service/campo.service';
import { CuartelService } from '../../../service/cuartel-service/cuartel.service';

@Component({
  selector: 'app-nueva-unidadtrabajo',
  templateUrl: './nueva.unidadTrabajo.component.html',
  styleUrls: ['./nueva.unidadTrabajo.component.css'],
})
export class NuevaUnidadTrabajoComponent implements OnInit {
  unidadTrabajo: any;
  editable: boolean;
  depositos: any[] = [];
  subCuarteles: any[] = [];
  personal: any[] = [];
  campos: any[] = [];

  depositosSeleccionados: any[] = [];
  personalSeleccionados: any[] = [];
  subCuartelesSeleccionados: any[] = [];

  constructor(
    private depositoService: DepositoService,
    private subCuartelService: SubCuartelService,
    private personalService: PersonalService,
    private unidadTrabajoService: UnidadTrabajoService,
    private compoService: CampoService,
    private cuartelService: CuartelService,
    private route: ActivatedRoute,
    private router: Router) {
    this.unidadTrabajo = { 'nombre': '', 'id': null };
    this.editable = true;
  }

  ngOnInit() {


    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);

      if (params['id']) {
        console.log('buscar unidadTrabajo por id');
        this.unidadTrabajoService.getUnidadTrabajo(params['id'])
          .then((ut) => {
            console.log(ut);
            this.unidadTrabajo = ut;

            this.depositosSeleccionados = this.unidadTrabajo.depositos;
            this.personalSeleccionados = this.unidadTrabajo.personal;
            this.subCuartelesSeleccionados = this.unidadTrabajo.subCuarteles;
          });
      }
    });
  }

  onSubmit() {
    console.log(this.unidadTrabajo);
    console.log('onSubmit');
    this.unidadTrabajo.depositos = this.depositosSeleccionados;
    this.unidadTrabajo.personal = this.personalSeleccionados;
    this.unidadTrabajo.subCuarteles = this.subCuartelesSeleccionados;

    this.unidadTrabajoService.guardarUnidadTrabajo(this.unidadTrabajo)
      .then((ut) => {
        console.log(ut);
        this.router.navigate(['/configurar/unidadTrabajo']);
      });
  }
  buscarDepositos() {
    this.depositoService.getDepsitos()
      .then((depositos) => {
        this.depositos = depositos;
        console.log('buscar depositos');
        console.log(depositos);
        this.actualizarDepositos();
      });
  }

  actualizarDepositos() {
    for (const depositosSeleccionado of this.depositosSeleccionados) {
      for (const deposito of this.depositos) {
        if (depositosSeleccionado.id === deposito.id) {
          deposito.checkbox = true;
        }
      }
    }
    console.log(this.depositos);
  }

  actualizarDepositosSeleccionados(deposito: any) {
    let isNuevo: boolean = true;
    for (const i of this.depositosSeleccionados) {
      if (deposito.id === i.id) {
        isNuevo = false;
        console.log('antes de buscar indice');
        const index = this.buscarIndice(this.depositosSeleccionados, deposito);
        console.log(index);
        // this.insumosSeleccionados.indexOf(insumo);
        this.depositosSeleccionados.splice(index, 1);

      }
    }
    if (isNuevo) {
      this.depositosSeleccionados.push(deposito);

    }
    console.log('arreglo');
    console.log(this.depositosSeleccionados);

  }

  buscarIndice(arreglo: any[], elemento: any) {
    let index = 0;
    for (const elementoArreglo of arreglo) {
      console.log(elementoArreglo.id);
      console.log(elemento.id);
      if (elementoArreglo.id === elemento.id) {
        return index;
      }
      index++;
    }
    return -1;
  }


  buscarSubCuarteles() {
    this.unidadTrabajoService.getSubCuartelesActivos()
      .then((subCuarteles) => {
        this.subCuarteles = subCuarteles;
        this.actualizarSubCuarteles();
      });
  }


  actualizarSubCuarteles() {
    for (const subCartelSeleccionado of this.subCuartelesSeleccionados) {

          subCartelSeleccionado.checkbox = true;
          this.subCuarteles.push(subCartelSeleccionado);

    }
    console.log(this.subCuarteles);
  }

  actualizarSubCuartelesSeleccionados(subCuartel: any) {
    console.log('actualizar sub cuarteles seleccionados');
    console.log(subCuartel);
    let isNuevo: boolean = true;
    for (const s of this.subCuartelesSeleccionados) {
      if (subCuartel.id === s.id) {
        isNuevo = false;
        const index: number = this.buscarIndice(this.subCuartelesSeleccionados, subCuartel);
        this.subCuartelesSeleccionados.splice(index, 1);
      }
    }
    if (isNuevo) {
      this.subCuartelesSeleccionados.push(subCuartel);
    }
  }

  buscarPersonal() {
    this.personalService.getPersonales()
      .then((personal) => {
        this.personal = personal;
        console.log(personal);
        this.actualizarPersonal();
      });
  }


  actualizarPersonal() {
    for (const personalSeleccionado of this.personalSeleccionados) {
      for (const personal of this.personal) {
        if (personalSeleccionado.id === personal.id) {
          personal.checkbox = true;
        }
      }
    }
    console.log(this.personal);
  }

  actualizarPersonalSeleccionados(personal: any) {
    let isNuevo: boolean = true;
    for (const p of this.personalSeleccionados) {
      if (personal.id === p.id) {
        isNuevo = false;
        const index: number = this.buscarIndice(this.personalSeleccionados, personal);
        this.personalSeleccionados.splice(index, 1);
      }
    }
    if (isNuevo) {
      this.personalSeleccionados.push(personal);
    }
  }

}
