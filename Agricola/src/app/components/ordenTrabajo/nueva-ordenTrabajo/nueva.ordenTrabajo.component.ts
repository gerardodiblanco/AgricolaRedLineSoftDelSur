
import { Component, OnInit } from '@angular/core';
import { UnidadTrabajoService } from '../../../service/unidadTrabajo-service/unidadTrabajo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from '../../../service/personal-service/personal.service';
import { SubCuartelService } from '../../../service/subCuartel-service/subCuartel.service';
import { DepositoService } from '../../../service/deposito-service/deposito-service';
import { OrdenTrabajoService } from '../../../service/ordenTrabajo-service/ordenTrabajo.service';
import { TareaService } from '../../../service/tarea-service/tarea.service';


@Component({
  selector: 'app-nueva-ordentrabajo',
  templateUrl: './nueva.ordenTrabajo.component.html',
  styleUrls: ['./nueva.ordenTrabajo.component.css'],
})
export class NuevaOrdenTrabajoComponent implements OnInit {
  editable: boolean;
  ordenTrabajo: any;
  unidadesTrabajo: any[] = [];
  unidadTrabajoSeleccionada: any;
  nombreUnidadTrabajoSeleccionada: any = '- Seleccione una Unidad de Trabajo -';
  subcuartelCheckbox: boolean = false;
  depositoCheckbox: boolean = false;
  personaCheckbox: boolean = false;
  tareas: any[];
  tareaSeleccionada: any;
  verListaTarea: boolean = true;
  listaTareas: any[] = [];
  nombreTratoSeleccionado: any = '- Seleccione un trato -';
  tratoSeleccionado: any;

  constructor(
    private depositoService: DepositoService,
    private subCuartelService: SubCuartelService,
    private personalService: PersonalService,
    private unidadTrabajoService: UnidadTrabajoService,
    private ordenTrabajoService: OrdenTrabajoService,
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private router: Router) {
    this.ordenTrabajo = { 'descripcion': '', 'id': null };
    this.editable = true;
    this.buscarUnidadesDeTrabajo();

  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);
      console.log(params['id']);

      if (params['id'] !== 'null') {
        console.log('buscar ordenTrabajo por id');
        this.ordenTrabajoService.getOrdenTrabajo(params['id'])
          .then((ot) => {
            console.log(ot);
            this.ordenTrabajo = ot;
            this.unidadTrabajoSeleccionada = ot.unidadTrabajo;
            this.nombreUnidadTrabajoSeleccionada = this.unidadTrabajoSeleccionada.nombre;
            this.listaTareas = ot.tareaModelList;
          });
      }

    });

  }
  onSubmit() {
    console.log(this.ordenTrabajo);
    console.log('onSubmit');
    this.ordenTrabajo.unidadTrabajo = this.unidadTrabajoSeleccionada;
    this.ordenTrabajo.tareaModelList = this.listaTareas;

    this.ordenTrabajoService.guardarOrdenTrabajo(this.ordenTrabajo)
      .then((ot) => {
        console.log(ot);
        this.router.navigate(['/ordenTrabajo']);
      });

  }

  buscarTareas() {
    console.log('Buscar tareas');
    this.tareas = [];
    this.tareaService.getTareas()
      .then((tareas) => {
        this.tareas = tareas;
        console.log(tareas);
      });
  }

  seleccionarTarea(tarea) {
    this.tareaSeleccionada = tarea;
    this.tratoSeleccionado = tarea.tratoModel;
    if (tarea.tratoModel) {
      this.nombreTratoSeleccionado = tarea.tratoModel.nombre;
    } else {
      this.nombreTratoSeleccionado = '- Seleccione un trato -';
    }
    this.cambiarListaEdicion(false);
  }

  cambiarListaEdicion(valor: boolean) {
    this.verListaTarea = valor;
  }

  agregarTarea() {
    this.eliminarTarea(this.tareaSeleccionada);
    this.listaTareas.push(this.tareaSeleccionada);
    console.log('tarea seleccionada');
    console.log(this.tareaSeleccionada);
  }
  eliminarTarea(tarea) {
    console.log(tarea);
    const index = this.buscarIndice(this.listaTareas, tarea);
    if (index !== -1) {
      this.listaTareas.splice(index, 1);
    }
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

  seleccionTrato() {
    console.log('cambio seleccion trato');
    for (const trato of this.tareaSeleccionada.tratos) {
      console.log(trato.nombre);
      console.log(this.nombreTratoSeleccionado);
      if (trato.nombre === this.nombreTratoSeleccionado) {
        this.tareaSeleccionada.tratoModel = trato;
        console.log(this.tareaSeleccionada.tratoModel);
      }
    }
  }

  buscarUnidadesDeTrabajo() {
    console.log('buscanod unidades de trabajo');
    this.unidadTrabajoService.getUnidadesTrabajos()
      .then((ut) => {
        console.log(ut);
        this.unidadesTrabajo = ut;
        console.log('buscar unidadesTrabajo');
        console.log(this.unidadesTrabajo);

      });
  }
  seleccionUnidadTrabajo() {
    console.log('se seleccino una unidad de trbajo');
    console.log(this.nombreUnidadTrabajoSeleccionada);

    for (const ut of this.unidadesTrabajo) {
      if (ut.nombre === this.nombreUnidadTrabajoSeleccionada) {
        this.unidadTrabajoSeleccionada = ut;
      }
    }
  }

  cambioCheckboxSubCuartel() {
    console.log('cambioCheckboxSubCuartel');
    console.log(this.subcuartelCheckbox);
    if (this.subcuartelCheckbox) {
      for (const subCuartel of this.unidadTrabajoSeleccionada.subCuarteles) {
        subCuartel.checkbox = true;
      }
    } else {
      for (const subCuartel of this.unidadTrabajoSeleccionada.subCuarteles) {
        subCuartel.checkbox = false;
      }
    }
  }

  cambioCheckboxDeposito() {
    console.log('cambioCheckboxDeposito');
    console.log(this.depositoCheckbox);
    if (this.depositoCheckbox) {
      for (const deposito of this.unidadTrabajoSeleccionada.depositos) {
        deposito.checkbox = true;
      }
    } else {
      for (const deposito of this.unidadTrabajoSeleccionada.depositos) {
        deposito.checkbox = false;
      }
    }
  }

  cambioCheckboxPersona() {
    console.log('cambioCheckboxPersona');
    console.log(this.personaCheckbox);
    if (this.personaCheckbox) {
      for (const persona of this.unidadTrabajoSeleccionada.personaless) {
        persona.checkbox = true;
      }
    } else {
      for (const persona of this.unidadTrabajoSeleccionada.personaless) {
        persona.checkbox = false;
      }
    }
  }

}
