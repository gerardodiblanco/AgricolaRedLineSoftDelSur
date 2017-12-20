import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';

import { MapaComponent } from './components/mapa/mapa.component';

import { CampoComponent } from './components/campo/campo.component';
import {NuevoCampoComponent} from './components/campo/nuevo-campo/nuevo-campo.component';
import {CampoClass} from './class/campo';
import{CuartelComponent} from './components/cuartel/cuartel.component';
import{NuevoCuartelComponent} from './components/cuartel/nuevo-cuartel/nuevo.cuartel.component';
import{SubCuartelComponent} from './components/subCuartel/subcuartel.component';
import{NuevoSubCuartelComponent} from './components/subCuartel/nuevo-SubCuartel/nuevo.subcuartel.component';
import { VariedadComponent } from '../app/components/variedad/variedad.component';
import {AtributoComponent} from '../app/components/atributo/atributo.component';
import {OpcionesAtributoComponent} from '../app/components/atributo/opciones-atributo/opciones-atributo.component';
import {NuevoAtributoComponent} from '../app/components/atributo/nuevo-atributo/nuevo-atributo.component';
import {NuevaOpcionComponent} from '../app/components/atributo/opciones-atributo/nueva-opcion/nueva-opcion.component';
import { NuevaVariedadComponent } from '../app/components/variedad/nueva-variedad/nueva.variedad.component';
import {TratoComponent} from './components/trato/trato.component';
import {NuevoTratoComponent} from './components/trato/nuevo-trato/nuevo.trato.componenet';
import {TareaComponent} from './components/tarea/tarea.component';
import {NuevaTareaComponent} from './components/tarea/nueva-tarea/nueva.tarea.component';
import {MaquinariaComponent} from './components/maquinaria/maquinaria.component';
import {NuevaMaquinariaComponent} from './components/maquinaria/nueva-maquinaria/nueva.maquinaria.component';
import {InsumoComponent} from './components/insumo/insumo.component';
import {NuevoInsumoComponent} from './components/insumo/nuevo-insumo/nuevo.insumo.component';
import {UnidadTrabajoComponent} from './components/unidadTrabajo/unidadTrabajo.component';
import {NuevaUnidadTrabajoComponent} from './components/unidadTrabajo/nueva-unidadTrabajo/nueva.unidadTrabajo.component';
import {OrdenTrabajoComponent} from './components/ordenTrabajo/ordenTrabajo.component';
import {NuevaOrdenTrabajoComponent} from './components/ordenTrabajo/nueva-ordenTrabajo/nueva.ordenTrabajo.component';


const APP_ROUTES: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'campo', component: CampoComponent },
  {path: 'mapa', component: MapaComponent },
  {path: 'nuevo-campo/:id', component: NuevoCampoComponent},
  {path: 'nuevo-campo', component: NuevoCampoComponent},
  {path: 'cuarteles', component: CuartelComponent},
  {path: 'cuarteles/:nombreCampo', component: CuartelComponent},
  {path: 'nuevo-cuartel/:idCampo', component: NuevoCuartelComponent},
  {path: 'subCuarteles/:idCuartel', component: SubCuartelComponent},
  {path: 'nuevo-cuartel/:idCampo/:idCuartel', component: NuevoCuartelComponent},
  {path: 'nuevo-subCuartel/:idCuartel/:idSubCuartel', component: NuevoSubCuartelComponent},
  {path: 'nuevo-subCuartel/:idCuartel', component: NuevoSubCuartelComponent},
  {path: 'configurar/variedades', component: VariedadComponent},
  {path: 'configurar/variedad/nueva-variedad', component: NuevaVariedadComponent},
  {path: 'configurar/atributos', component: AtributoComponent},
  {path: 'configurar/atributos/opcionesAtributo/:idAtributo', component: OpcionesAtributoComponent},
  {path: 'configurar/atributos/opcionesAtributo/nueva-opcion/:idAtributo', component: NuevaOpcionComponent},
  {path: 'configurar/atributos/nuevo-atributo', component: NuevoAtributoComponent},
  {path: 'configurar/tratos', component: TratoComponent},
  {path: 'configurar/tratos/nuevo-trato', component: NuevoTratoComponent},
  {path: 'configurar/tareas', component: TareaComponent},
  {path: 'configurar/tareas/nueva-tarea', component: NuevaTareaComponent},
  {path: 'configurar/tareas/nueva-tarea/:id', component: NuevaTareaComponent},
  {path: 'configurar/maquinarias', component: MaquinariaComponent},
  {path: 'configurar/maquinarias/nueva-maquinaria', component: NuevaMaquinariaComponent},
  {path: 'configurar/insumos', component: InsumoComponent},
  {path: 'configurar/insumos/nuevo-insumo', component: NuevoInsumoComponent},
  {path: 'configurar/unidadTrabajo', component: UnidadTrabajoComponent},
  {path: 'configurar/unidadTrabajo/nueva-unidadTrabajo/:id', component: NuevaUnidadTrabajoComponent},
  {path: 'ordenTrabajo', component: OrdenTrabajoComponent},
  {path: 'nueva-ordenTrabajo/:id', component: NuevaOrdenTrabajoComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
