import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';  
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import {CampoClass} from '../../class/campo';



@Injectable()
export class CampoService { 
campos: CampoClass[] = [];

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

