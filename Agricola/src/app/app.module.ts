import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/common/navigation/navigation.component';
import { InicioComponent } from './views/inicio/inicio.component';

// Rutas
import { APP_ROUTING } from './app.routes';
import { TopnavbarComponent } from './components/common/topnavbar/topnavbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { IboxtoolsComponent } from './components/common/iboxtools/iboxtools.component';
import { ConfigurationComponent } from './components/common/configuration/configuration.component';
import { AlertComponent } from './components/common/alert/alert.component';
import { MailComponent } from './components/common/mail/mail.component';
import { SmallchatComponent } from './components/common/smallchat/smallchat.component';
import { CampoComponent } from './components/campo/campo.component';
import { MapaComponent } from './components/mapa/mapa.component';
import {CuartelComponent} from './components/cuartel/cuartel.component';
import {CuartelService} from './service/cuartel-service/cuartel.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import {CampoService /*,Campo*/ } from './service/campo-service/campo.service';
import {MapaService /*,Campo*/ } from './service/mapa-service/mapa.service';
import { HttpModule, Http, Response } from '@angular/http';
import { NuevoCampoComponent } from './components/campo/nuevo-campo/nuevo-campo.component';
import {NuevoCampoService} from './service/campo-service/nuevo-campo.service';
import {TipoCampoService} from './service/tipoCampo-service/tipo-campo-service.service';
import {LocalidadService} from './service/localidad-service/localidad.service';
import { ProveedorService } from './service/proveedor-service/poroveedor.service';

import{NuevoCuartelComponent} from './components/cuartel/nuevo-cuartel/nuevo.cuartel.component';
import{SubCuartelComponent} from './components/subCuartel/subcuartel.component';
import {SubCuartelService} from './service/subCuartel-service/subCuartel.service';
import {NuevoSubCuartelComponent} from './components/subCuartel/nuevo-SubCuartel/nuevo.subcuartel.component';
import { VariedadComponent } from '../app/components/variedad/variedad.component';
import{VariedadService} from './service/variedad-service/variedad.service';
import { AtributoComponent } from './components/atributo/atributo.component';
import { OpcionesAtributoComponent } from './components/atributo/opciones-atributo/opciones-atributo.component';
import { NuevoAtributoComponent } from './components/atributo/nuevo-atributo/nuevo-atributo.component';
import { NuevaOpcionComponent } from './components/atributo/opciones-atributo/nueva-opcion/nueva-opcion.component';
import {AtributoService} from './service/atributo-service/atributo.service';
import {OpcionAtributoService} from './service/atributo-service/opcion-atriburo.service';
import { NuevaVariedadComponent } from '../app/components/variedad/nueva-variedad/nueva.variedad.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    InicioComponent,
    TopnavbarComponent,
    FooterComponent,
    IboxtoolsComponent,
    ConfigurationComponent,
    AlertComponent,
    MailComponent,
    SmallchatComponent,
    CampoComponent,
    MapaComponent,
    NuevoCampoComponent,
    CuartelComponent,
    NuevoCuartelComponent,
    SubCuartelComponent,
    NuevoSubCuartelComponent,
    VariedadComponent,
    AtributoComponent,
    OpcionesAtributoComponent,
    NuevoAtributoComponent,
    NuevaOpcionComponent,
    NuevaVariedadComponent,
  ],
  imports: [
BrowserModule,
    CommonModule,
    FormsModule,

    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt5d9j8H1Im0mG4N__TG7s30PenkB7cbg',
    }),
    BrowserModule,
    APP_ROUTING,


  ],
  providers: [CampoService, MapaService,
     NuevoCampoService, TipoCampoService,
     LocalidadService, ProveedorService,
     CuartelService, NuevoCuartelComponent,
     SubCuartelService, VariedadService,
     OpcionAtributoService, AtributoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
