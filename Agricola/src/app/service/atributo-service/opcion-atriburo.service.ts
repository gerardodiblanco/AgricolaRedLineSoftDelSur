import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class OpcionAtributoService {
  urlGetOpcionesAtributo = '/opcion/all';
  urlEliminarOpcion = '/opcion/remove/';
  urlGuardarOpcion = '/opcion/save';

  constructor(private http: Http) { }


  getOpciones(): Promise<any> {
    return this.http.get(`${URL_BASE}${this.urlGetOpcionesAtributo}`)
      .toPromise()
      .then((response) => {
        return response.json(); })
      .catch(this.handleError);
  }

  eliminarOpcion(idOpcion): Promise<any> {
    console.log(`${URL_BASE}${this.eliminarOpcion}${idOpcion}`);
    return this.http.delete(`${URL_BASE}${this.eliminarOpcion}${idOpcion}`)
      .toPromise()
      .then((response) => {
        return response.status;
      })
      .catch(this.handleError);
  }


  guardarOpcion(opcion: any): Promise<any> {
    console.log(opcion);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ 'headers': headers });
    return this.http.post(`${URL_BASE}${this.urlGuardarOpcion}`, opcion, options)
      .map(this.extractData)
      .toPromise()
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    const body = res.text();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
