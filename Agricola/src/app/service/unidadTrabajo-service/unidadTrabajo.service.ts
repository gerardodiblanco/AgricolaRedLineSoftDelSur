import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class UnidadTrabajoService {
    urlGetUnidadesTrabajos = '/unidadTrabajo/all';
    urlGetUnidadTrabajo = '/unidadTrabajo/findUnidadTrabajo/';
    urlEliminarUnidadTrabajo = '/unidadTrabajo/remove/';
    urlGuardarUnidadTrabajo = '/unidadTrabajo/save/';
    urlGetSubCuartelesActivos = '/unidadTrabajo/allSubCuarteles';

    constructor(private http: Http) { }

    getUnidadesTrabajos(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetUnidadesTrabajos}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    getSubCuartelesActivos(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetSubCuartelesActivos}`)
            .toPromise()
            .then((response) => {
              
              return response.json();
             })
            .catch(this.handleError);
    }

    getUnidadTrabajo(id: any): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetUnidadTrabajo}${id}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarUnidadTrabajo(id): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarUnidadTrabajo}${id}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarUnidadTrabajo}${id}`)
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

    guardarUnidadTrabajo(unidadTrabajo: any): Promise<any> {
      console.log(unidadTrabajo);

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ 'headers': headers });

      return this.http.post(`${URL_BASE}${this.urlGuardarUnidadTrabajo}`, unidadTrabajo, options)
        .map(this.extractData)
        .toPromise()
        .catch(this.handleError);

    }
    private extractData(res: Response) {
      const body = res.text();
      return body || {};
    }

}
