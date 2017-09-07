import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';  
import 'rxjs/add/operator/map';
import {CampoClass} from '../../class/campo';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import 'rxjs/add/operator/toPromise';


@Injectable()
export class NuevoCampoService { 
      campo: CampoClass;
       url = "http://192.168.3.175:8086/campo/nuevo";
       urlBuscarCampo = "http://192.168.3.175:8086/campo/";

    constructor(private http:Http, private router: Router) {
        
        }

        buscarCampo(idCampo): Promise<CampoClass> {
            console.log(this.urlBuscarCampo + idCampo);
            return this.http.get(this.urlBuscarCampo + idCampo)
                       .toPromise()
                       .then(response => response.json() as CampoClass )
                       .catch(this.handleError);
                     
          }
           
          private handleError(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
          }


  editarCampo(campo:CampoClass){
    this.campo = campo;
        this.router.navigate(['/nuevo-campo'])
        
      }
    
        guardarCampo(campo:CampoClass) {
            console.log(campo);

            let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions( { headers: headers } );
                return this.http.post(this.url, campo, options)
                           .map(this.extractData)
                           .toPromise()
                           .catch(this.handleErrorObservable);
      }
      private extractData(res: Response) {
        let body = res.json();
            return body.data || {};
        }
        private handleErrorObservable (error: Response | any) {
            console.error(error.message || error);
            return Observable.throw(error.message || error);
            }

}

export interface ICampo {
    idCampo: string;
 
    codigo: number;
    hectarea: number;
    nombre: string;
    tipo: TipoCampo;
   
    cuit: string;
    coordenadaList: CoordenadaClass[];
    domicilio:DomicilioClass;
    cuartelList:any;
    }
    export interface CoordenadaClass{
        id: string;
        latitud: number;
        longitud: number;
        nroOrden: number;
    }

    export interface DomicilioClass{
        idDomicilio:string;
        calle: string;
        dto: number;
        numero: number;
        piso: string;
        otro: string;
        localidad: LocalidadClass;
    }

    
export interface LocalidadClass{
    idLocalidad:string;
    codPostal: number;
    nombreLocalidad: string;
}

export interface TipoCampo{
    idTipo: string;
    codigo: number;
    nombre: string;
}