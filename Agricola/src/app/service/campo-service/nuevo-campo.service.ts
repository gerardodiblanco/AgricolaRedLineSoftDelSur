import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';  
import 'rxjs/add/operator/map';
import {CampoClass} from '../../class/campo';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import 'rxjs/add/operator/toPromise';


@Injectable()
export class NuevoCampoService { 
      campo: any;
       url = "http://192.168.3.175:8086/campo/nuevo";
       urlBuscarCampo = "http://192.168.3.175:8086/campo/";

    constructor(private http:Http, private router: Router) {
        
        }

        buscarCampo(idCampo): Promise<CampoClass> {
            console.log(this.urlBuscarCampo + idCampo);
            return this.http.get(this.urlBuscarCampo + idCampo)
                       .toPromise()
                       .then(response => {return response.json() })
                       .catch(this.handleError);
                     
          }
           
          private handleError(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
          }


  
    
        guardarCampo(campo:any) {
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

