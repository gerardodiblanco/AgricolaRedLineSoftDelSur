import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class LocalidadService {
    urlGetLocalidades = '/localidad/all';

    constructor(private http: Http) { }
    // busca todas las localidades
    getLocalidades(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetLocalidades}`)
            .toPromise()
            .then((response) => {
              return response.json(); })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
