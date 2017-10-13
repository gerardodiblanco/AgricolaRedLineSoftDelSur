import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';

import { MapaComponent } from './components/mapa/mapa.component';

import { CampoComponent } from './components/campo/campo.component';
import {NuevoCampoComponent} from './components/campo/nuevo-campo/nuevo-campo.component';
import {CampoClass} from './class/campo'
import{CuartelComponent} from './components/cuartel/cuartel.component'
import{NuevoCuartelComponent} from './components/cuartel/nuevo-cuartel/nuevo.cuartel.component'
import{SubCuartelComponent} from './components/subCuartel/subcuartel.component'; 
import{NuevoSubCuartelComponent} from './components/subCuartel/nuevo-SubCuartel/nuevo.subcuartel.component';



const APP_ROUTES: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'campo', component: CampoComponent },
  {path: 'mapa', component: MapaComponent },
  {path: 'nuevo-campo/:id', component: NuevoCampoComponent},
  {path: 'nuevo-campo', component: NuevoCampoComponent},
  {path: 'cuarteles', component: CuartelComponent},
  {path: 'nuevo-cuartel/:idCampo', component: NuevoCuartelComponent},
  {path: 'subCuarteles/:idCuartel', component: SubCuartelComponent},
  {path: 'nuevo-cuartel/:idCampo/:idCuartel', component: NuevoCuartelComponent},
  {path: 'nuevo-subCuartel/:idSubCuartel', component: NuevoSubCuartelComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


