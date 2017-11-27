
import { Component, OnInit } from '@angular/core';
import {AtributoService} from '../../service/atributo-service/atributo.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TareaService} from '../../service/tarea-service/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent implements OnInit {
tareas: any[];

  constructor(
    private tareaService: TareaService,
    private router: Router) {
   }

  ngOnInit() {
  this.buscarTareas();
  }

  buscarTareas() {
    this.tareaService.getTareas()
    .then((tareas) => {
      this.tareas = tareas;
      console.log(tareas);
    });
  }

  eliminarTarea(idTarea: string) {
    if (confirm('¿Está seguro que desea eliminar?')) {

    this.tareaService.eliminarTarea(idTarea)
    .then((tarea) => {
      console.log(tarea);
      this.buscarTareas();
    });
  }
  }

}
