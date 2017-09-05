import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';  
import 'rxjs/add/operator/map';
import {CampoClass} from '../../class/campo';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import 'rxjs/add/operator/toPromise';


@Injectable()
export class NuevoCampoService { 
      campo: CampoClass = new CampoClass();
       url = "http://192.168.3.175:8086/campo/nuevo";
    constructor(private http:Http, private router: Router) {
        
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