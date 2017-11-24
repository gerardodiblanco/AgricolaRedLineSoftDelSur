import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class TareaService {
    urlGetTareas = '/tarea/all';
    urlGetTarea = '/tarea/findTarea/';
    urlEliminarTarea = '/tarea/remove/';
    urlGuardarTarea = '/tarea/save/';

    constructor(private http: Http) { }

    getTareas(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetTareas}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }


    getTarea(id: any): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetTarea}${id}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarTarea(idTarea): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarTarea}${idTarea}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarTarea}${idTarea}`)
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

    guardarTarea(tarea: any): Promise<any> {
      console.log(tarea);

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ 'headers': headers });

      return this.http.post(`${URL_BASE}${this.urlGuardarTarea}`, tarea, options)
        .map(this.extractData)
        .toPromise()
        .catch(this.handleError);

    }
    private extractData(res: Response) {
      const body = res.text();
      return body || {};
    }

}
