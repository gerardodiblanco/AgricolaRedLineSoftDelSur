import { Injectable } from '@angular/core';

import { RestBaseService } from '../tools/rest.tools';
import { Http, Response, Headers } from '@angular/http';  
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class CampoService { 
campos: Campo[] = [];

  constructor(private http:Http) {

}

    getcampos(){
   this.campos = [];
     let promesa = new Promise( ( resolve, reject ) => {
        let url = "http://192.168.3.175:8086/campo/all"; 
        this.http.get( url )               
        .map( resp => resp.json() )               
        .subscribe( data => {                  
          console.log( data );   
          console.log( "No hay error" );               
          if( data.error ){                    
            //Aqui hay un problema    
            console.log( "hay un error" );              
          }else{                    
            this.campos.push( ...data );                    
            console.log( this.campos );
                     
          }                
        })                
        resolve();    
      })    
    
       
     return promesa;
 }


}

export interface Campo {

  codigo: number;
  hectarea: number;
  nombre: string;
  coordenadas: Coordenada[];

  }

export interface Coordenada {
      latitud: number;
      longitud: number;
      nroOrden: number;
}