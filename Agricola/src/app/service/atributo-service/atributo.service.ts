import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class AtributoService {
  urlGetAtributos = '/atributo/allActivos';
urlGetAtributosConOpciones = '/atributo//allActivosConOpciones';

  urlEliminarAtributo = '/atributo/remove/';
  urlGuardarAtributo = '/atributo/save';

  constructor(private http: Http) { }

  getAtributos(): Promise<any> {
    console.log(URL_BASE + this.urlGetAtributos);
    return this.http.get(`${URL_BASE}${this.urlGetAtributos}`)
      .toPromise()
      .then((response) => {
        console.log(response);
        return response.json();

      })
      .catch(this.handleError);
  }

  getAtributosConOpciones(): Promise<any> {
    console.log(URL_BASE + this.urlGetAtributosConOpciones);
    return this.http.get(`${URL_BASE}${this.urlGetAtributosConOpciones}`)
      .toPromise()
      .then((response) => {
        console.log('RESPUESTA ATRIBUTOS EN EL SERVVICIO');
        console.log(response.json());
        return response.json();

      })
      .catch(this.handleError);
  }

  eliminarAtributo(idAtributo): Promise<any> {
    console.log(`${URL_BASE}${this.urlEliminarAtributo}${idAtributo}`);
    return this.http.delete(`${URL_BASE}${this.urlEliminarAtributo}${idAtributo}`)
      .toPromise()
      .then((response) => {
        return response.status;
      })
      .catch(this.handleError);
  }


  guardarAtributo(atributo: any): Promise<any> {
    console.log(atributo);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ 'headers': headers });

    return this.http.post(`${URL_BASE}${this.urlGuardarAtributo}`, atributo, options)
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
