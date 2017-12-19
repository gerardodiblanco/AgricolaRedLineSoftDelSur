import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class OrdenTrabajoService {
    urlGetOrdenesTrabajos = '/ordenTrabajo/all';
    urlGetOrdenTrabajo = '/ordenTrabajo/findOrdenTrabajo/';
    urlEliminarOrdenTrabajo = '/ordenTrabajo/remove/';
    urlGuardarOrdenTrabajo = '/ordenTrabajo/save/';
  //  urlGetSubCuartelesActivos = '/ordenTrabajo/allSubCuarteles';

    constructor(private http: Http) { }

    getOrdenesTrabajos(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetOrdenesTrabajos}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }
/*
    getSubCuartelesActivos(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetSubCuartelesActivos}`)
            .toPromise()
            .then((response) => {

              return response.json();
             })
            .catch(this.handleError);
    }
*/
    getOrdenTrabajo(id: any): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetOrdenTrabajo}${id}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarOrdenTrabajo(id): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarOrdenTrabajo}${id}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarOrdenTrabajo}${id}`)
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

    guardarOrdenTrabajo(ordenTrabajo: any): Promise<any> {
      console.log(ordenTrabajo);

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ 'headers': headers });

      return this.http.post(`${URL_BASE}${this.urlGuardarOrdenTrabajo}`, ordenTrabajo, options)
        .map(this.extractData)
        .toPromise()
        .catch(this.handleError);

    }
    private extractData(res: Response) {
      const body = res.text();
      return body || {};
    }

}
