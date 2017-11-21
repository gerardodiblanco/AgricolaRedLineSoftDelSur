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
    private router: Router) {
    this.tarea = { 'descripcion': '', 'id': null, 'codigo': 0 };
    this.editable = true;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.tarea);
    console.log('onSubmit');
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
      if (insumo.idInsumo === i.idInsumo) {
        isNuevo = false;
        const index: number = this.insumosSeleccionados.indexOf(insumo);
        this.insumosSeleccionados.splice(index, 1);

      }
    }
    if (isNuevo) {
      this.insumosSeleccionados.push(insumo);
    }
  }

  buscarMaquinaria() {
    this.maquinariaService.getMaquinarias()
      .then((maquinarias) => {
        this.maquinarias = maquinarias;
        console.log(maquinarias);
        this.actualizarMaquinarias();
      });
  }

  actualizarMaquinarias() {
    for (const maquinariaSeleccionada of this.insumosSeleccionados) {
      for (const maquinaria of this.maquinarias) {
        if (maquinariaSeleccionada.idMaquinaria === maquinaria.idMaquinaria) {
          maquinaria.checkbox = true;
        }
      }
    }
    console.log(this.insumos);
  }

  actualizarMaquinariaSeleccionados(maquinaria: any) {
    let isNuevo: boolean = true;
    for (const m of this.maquinariasSeleccionadas) {
      if (maquinaria.idMaquinaria === m.idMaquinaria) {
        isNuevo = false;
        const index: number = this.maquinariasSeleccionadas.indexOf(maquinaria);
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
          const index: number = this.tratosSeleccionados.indexOf(trato);
          this.tratosSeleccionados.splice(index, 1);
        }
      }
      if (isNuevo) {
        this.tratosSeleccionados.push(trato);
      }
    }

}
