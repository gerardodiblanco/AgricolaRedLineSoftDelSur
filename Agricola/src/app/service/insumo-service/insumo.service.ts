import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class InsumoService {
    urlGetInsumo = '/insumo/all';
    urlEliminarInsumo = '/insumo/remove/';
    urlGuardarInsumo = '/insumo/save/';

    constructor(private http: Http) { }

    getInsumos(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetInsumo}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarInsumo(idInsumo): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarInsumo}${idInsumo}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarInsumo}${idInsumo}`)
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

    guardarInsumo(insumo: any): Promise<any> {
      console.log(insumo);

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ 'headers': headers });

      return this.http.post(`${URL_BASE}${this.urlGuardarInsumo}`, insumo, options)
        .map(this.extractData)
        .toPromise()
        .catch(this.handleError);

    }
    private extractData(res: Response) {
      const body = res.text();
      return body || {};
    }
}
