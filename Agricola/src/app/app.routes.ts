import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';

import { MapaComponent } from './components/mapa/mapa.component';

import { CampoComponent } from './components/campo/campo.component';
import {NuevoCampoComponent} from './components/campo/nuevo-campo/nuevo-campo.component';
import {CampoClass} from './class/campo'


const APP_ROUTES: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'campo', component: CampoComponent },
  {path: 'mapa', component: MapaComponent },
  {path: 'nuevo-campo/:id', component: NuevoCampoComponent},
  {path: 'nuevo-campo', component: NuevoCampoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
