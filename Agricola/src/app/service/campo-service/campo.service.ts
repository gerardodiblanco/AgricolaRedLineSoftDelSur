import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions, RequestMethod  } from '@angular/http';  
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import {CampoDTO} from '../../components/campo/campo';





@Injectable()
export class CampoService { 
camposDTO: CampoDTO[] = [];
 urlBase = "http://192.168.3.175:8086";
 urlGetCampo = "/campo/allActivos";
 urlEliminarCampo = "/campo/remove/"

  constructor(private http:Http) {

}

    getcampos(){
   this.camposDTO = [];
     let promesa = new Promise( ( resolve, reject ) => {
        
        this.http.get( this.urlBase + this.urlGetCampo )               
        .map( resp => resp.json() )               
        .subscribe( data => {                  
          console.log( data );   
          console.log( "No hay error" );               
          if( data.error ){                    
            //Aqui hay un problema    
            console.log( "hay un error" );              
          }else{                    
            this.camposDTO.push( ...data );                    
            console.log( this.camposDTO );
                     
          }                
        })                
        resolve();    
      })    
    
       
     return promesa;
 }

    eliminarCampo(idCampo): Promise<any> {
        
                   
         
                    console.log(this.urlBase+this.urlEliminarCampo + idCampo);
                    return this.http.delete(this.urlBase+this.urlEliminarCampo + idCampo)
                               .toPromise()
                               .then(response => {return response })
                               .catch(this.handleError);
                  
                    
                  }
                   
                  private handleError(error: any): Promise<any> {
                    console.error('An error occurred', error); // for demo purposes only
                    return Promise.reject(error.message || error);
                  }
    }



