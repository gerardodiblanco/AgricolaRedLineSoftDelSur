import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http'; 
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LocalidadService{
    url = "http://192.168.3.175:8086/localidad/all";

    constructor(private http:Http) { }


//busca todas las localidades
    getLocalidades(): Promise<any> {
        return this.http.get(this.url)
                   .toPromise()
                   .then(response => {return response.json() })
                   .catch(this.handleError);
                 
      };
       
      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}