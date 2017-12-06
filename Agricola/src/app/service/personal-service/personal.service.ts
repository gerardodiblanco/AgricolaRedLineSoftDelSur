import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class PersonalService {
    urlGetPersonales = '/personal/all';
    urlGetPersonal = '/personal/findDeposito/';
    urlEliminarPersonal = '/personal/remove/';
    urlGuardarPersonal = '/personal/save/';

    constructor(private http: Http) { }

    getPersonales(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetPersonales}`)
            .toPromise()
            .then((response) => { return []; // response.json();
             })
            .catch(this.handleError);
    }


    getPersonal(id: any): Promise<any> {
        return this.http.get(`${URL_BASE}${this.urlGetPersonal}${id}`)
            .toPromise()
            .then((response) => { return response.json();
             })
            .catch(this.handleError);
    }

    eliminarPersonal(id): Promise<any> {

        console.log(`${URL_BASE}${this.urlEliminarPersonal}${id}`);
        return this.http.delete(`${URL_BASE}${this.urlEliminarPersonal}${id}`)
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

    guardarPersonal(personal: any): Promise<any> {
      console.log(personal);

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ 'headers': headers });

      return this.http.post(`${URL_BASE}${this.urlGuardarPersonal}`, personal, options)
        .map(this.extractData)
        .toPromise()
        .catch(this.handleError);

    }
    private extractData(res: Response) {
      const body = res.text();
      return body || {};
    }

}
