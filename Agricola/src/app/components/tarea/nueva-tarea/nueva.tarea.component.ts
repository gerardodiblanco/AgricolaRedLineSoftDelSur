import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../../service/tarea-service/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InsumoService } from '../../../service/insumo-service/insumo.service';
import { MaquinariaService } from '../../../service/maquinaria-service/maquinaria.service';
import { TratoService } from '../../../service/trato-service/trato.service';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva.tarea.component.html',
  styleUrls: ['./nueva.tarea.component.css'],
})
export class NuevaTareaComponent implements OnInit {
  tarea: any;
  editable: boolean;
  insumos: any[] = [];
  maquinarias: any[] = [];
  tratos: any[] = [];

  insumosSeleccionados: any[] = [];
  maquinariasSeleccionadas: any[] = [];
  tratosSeleccionados: any[] = [];

  constructor(
    private tareaService: TareaService,
    private insumoService: InsumoService,
    private maquinariaService: MaquinariaService,
    private tratoService: TratoService,
    private route: ActivatedRoute,
    private router: Router) {
    this.tarea = { 'descripcion': '', 'id': null, 'codigo': 0 };
    this.editable = true;
  }

  ngOnInit() {


    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);

      if (params['id']) {
        console.log('buscar tarea por id');
        this.tareaService.getTarea(params['id'])
          .then((tarea) => {
            console.log(tarea);
            this.tarea = tarea;
            this.insumosSeleccionados = this.tarea.insumos;
            this.maquinariasSeleccionadas = this.tarea.maquinarias;
            this.tratosSeleccionados = this.tarea.tratos;
          });
      }
    });

  }

  onSubmit() {
    console.log(this.tarea);
    console.log('onSubmit');
    this.tarea.insumos = this.insumosSeleccionados;
    this.tarea.maquinarias = this.maquinariasSeleccionadas;
    this.tarea.tratos = this.tratosSeleccionados;
    this.tareaService.guardarTarea(this.tarea)
      .then((tarea) => {
        console.log(tarea);
        this.router.navigate(['/configurar/tareas']);
      });
  }
  buscarInsumos() {
    this.insumoService.getInsumos()
      .then((insumos) => {
        this.insumos = insumos;
        console.log('buscar insumos');
        console.log(insumos);
        this.actualizarInsumos();
      });
  }

  actualizarInsumos() {
    for (const insumoseleccionado of this.insumosSeleccionados) {
      for (const insumo of this.insumos) {
        if (insumoseleccionado.idInsumo === insumo.idInsumo) {
          insumo.checkbox = true;
        }
      }
    }
    console.log(this.insumos);
  }

  actualizarInsumosSeleccionados(insumo: any) {
    let isNuevo: boolean = true;
    for (const i of this.insumosSeleccionados) {
      if (insumo.id === i.id) {
        isNuevo = false;
        console.log('antes de buscar indice');
        const index = this.buscarIndice(this.insumosSeleccionados, insumo);
        console.log(index);
        // this.insumosSeleccionados.indexOf(insumo);
        this.insumosSeleccionados.splice(index, 1);

      }
    }
    if (isNuevo) {
      this.insumosSeleccionados.push(insumo);

    }
    console.log('arreglo');
    console.log(this.insumosSeleccionados);

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

  buscarMaquinarias() {
    this.maquinariaService.getMaquinarias()
      .then((maquinarias) => {
        this.maquinarias = maquinarias;
        console.log(maquinarias);
        this.actualizarMaquinarias();
      });
  }

  actualizarMaquinarias() {
    for (const maquinariaSeleccionada of this.maquinariasSeleccionadas) {
      for (const maquinaria of this.maquinarias) {
        if (maquinariaSeleccionada.idMaquina === maquinaria.idMaquina) {
          maquinaria.checkbox = true;
        }
      }
    }
    console.log(this.maquinarias);
  }

  actualizarMaquinariasSeleccionadas(maquinaria: any) {
    let isNuevo: boolean = true;
    for (const m of this.maquinariasSeleccionadas) {
      if (maquinaria.idMaquina === m.idMaquina) {
        isNuevo = false;
        const index: number = this.buscarIndice(this.maquinariasSeleccionadas, maquinaria);
        this.maquinariasSeleccionadas.splice(index, 1);
      }
    }
    if (isNuevo) {
      this.maquinariasSeleccionadas.push(maquinaria);
    }
  }

  buscarTratos() {
    this.tratoService.getTratos()
      .then((tratos) => {
        this.tratos = tratos;
        console.log(tratos);
        this.actualizarTratos();
      });
  }


  actualizarTratos() {
    for (const tratoSeleccionado of this.tratosSeleccionados) {
      for (const trato of this.tratos) {
        if (tratoSeleccionado.id === trato.id) {
          trato.checkbox = true;
        }
      }
    }
    console.log(this.tratos);
  }

  actualizarTratosSeleccionados(trato: any) {
    let isNuevo: boolean = true;
    for (const t of this.tratosSeleccionados) {
      if (trato.id === t.id) {
        isNuevo = false;
        const index: number = this.buscarIndice(this.tratosSeleccionados, trato);
        this.tratosSeleccionados.splice(index, 1);
      }
    }
    if (isNuevo) {
      this.tratosSeleccionados.push(trato);
    }
  }

}
