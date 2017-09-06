import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';  
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import {CampoDTO} from '../../components/campo/campo';





@Injectable()
export class CampoService { 
camposDTO: CampoDTO[] = [];

  constructor(private http:Http) {

}

    getcampos(){
   this.camposDTO = [];
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
            this.camposDTO.push( ...data );                    
            console.log( this.camposDTO );
                     
          }                
        })                
        resolve();    
      })    
    
       
     return promesa;
 }


}

