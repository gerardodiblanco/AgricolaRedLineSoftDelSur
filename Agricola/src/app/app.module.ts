import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/common/navigation/navigation.component';
import { InicioComponent } from './views/inicio/inicio.component';

//Rutas
import { APP_ROUTING } from "./app.routes";
import { TopnavbarComponent } from './components/common/topnavbar/topnavbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { IboxtoolsComponent } from './components/common/iboxtools/iboxtools.component';
import { ConfigurationComponent } from './components/common/configuration/configuration.component';
import { AlertComponent } from './components/common/alert/alert.component';
import { MailComponent } from './components/common/mail/mail.component';
import { SmallchatComponent } from './components/common/smallchat/smallchat.component';
import { CampoComponent } from './components/campo/campo.component';
import { MapaComponent } from './components/mapa/mapa.component';




import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import {CampoService /*,Campo*/ } from './service/campo-service/campo.service';
import {MapaService /*,Campo*/ } from './service/mapa-service/mapa.service';
import { HttpModule,Http, Response } from '@angular/http';
import { NuevoCampoComponent } from './components/campo/nuevo-campo/nuevo-campo.component';
import {NuevoCampoService} from './service/campo-service/nuevo-campo.service';
import {TipoCampoService} from './service/tipoCampo-service/tipo-campo-service.service'



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
    NuevoCampoComponent
  ],
  imports: [
BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt5d9j8H1Im0mG4N__TG7s30PenkB7cbg'
    }),
    BrowserModule,
    APP_ROUTING,
    

  ],
  providers: [CampoService, MapaService, NuevoCampoService,TipoCampoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
