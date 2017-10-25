import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class VariedadService {
    urlGetVariedades = '/variedad/all';
    urlEliminarVariedad = '/variedad/remove/';

    constructor(private http: Http) { }

    getVariedades(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetVariedades}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarVariedad(idVariedad): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarVariedad}${idVariedad}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarVariedad}${idVariedad}`)
            .toPromise()
            .then((response) => {
                return response.status;
            })
            .catch(this.handleError);

    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
