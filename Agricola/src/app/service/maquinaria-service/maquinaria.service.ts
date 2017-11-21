import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class MaquinariaService {
    urlGetMaquinarias = '/maquinaria/all';
    urlEliminarMaquinaria = '/maquinaria/remove/';
    urlGuardarMaquinaria = '/maquinaria/save/';

    constructor(private http: Http) { }

    getMaquinarias(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetMaquinarias}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarMaquinaria(idMaquinaria): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarMaquinaria}${idMaquinaria}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarMaquinaria}${idMaquinaria}`)
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

    guardarMaquinaria(maquinaria: any): Promise<any> {
      console.log(maquinaria);

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ 'headers': headers });

      return this.http.post(`${URL_BASE}${this.urlGuardarMaquinaria}`, maquinaria, options)
        .map(this.extractData)
        .toPromise()
        .catch(this.handleError);

    }
    private extractData(res: Response) {
      const body = res.text();
      return body || {};
    }
}
