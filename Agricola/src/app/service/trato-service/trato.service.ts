import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class TratoService {
    urlGetTratos = '/trato/all';
    urlEliminarTrato = '/trato/remove/';
    urlGuardarTrato = '/trato/save/';

    constructor(private http: Http) { }

    getTratos(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetTratos}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarTrato(idTratos): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarTrato}${idTratos}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarTrato}${idTratos}`)
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

    guardarTrato(trato: any): Promise<any> {
      console.log(trato);

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ 'headers': headers });

      return this.http.post(`${URL_BASE}${this.urlGuardarTrato}`, trato, options)
        .map(this.extractData)
        .toPromise()
        .catch(this.handleError);

    }
    private extractData(res: Response) {
      const body = res.text();
      return body || {};
    }

}
