import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class DepositoService {
    urlGetDepositos = '/deposito/all';
    urlGetDeposito = '/deposito/findDeposito/';
    urlEliminarDeposito = '/deposito/remove/';
    urlGuardarDeposito = '/deposito/save/';

    constructor(private http: Http) { }

    getDepsitos(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetDepositos}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }


    getDepsito(id: any): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetDeposito}${id}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarDeposito(id): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarDeposito}${id}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarDeposito}${id}`)
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

    guardarDeposito(deposito: any): Promise<any> {
      console.log(deposito);

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ 'headers': headers });

      return this.http.post(`${URL_BASE}${this.urlGuardarDeposito}`, deposito, options)
        .map(this.extractData)
        .toPromise()
        .catch(this.handleError);

    }
    private extractData(res: Response) {
      const body = res.text();
      return body || {};
    }

}
