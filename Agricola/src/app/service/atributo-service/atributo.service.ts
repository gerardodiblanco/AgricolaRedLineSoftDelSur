import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URL_BASE } from '../../config/url.sevice';

@Injectable()
export class AtributoService {
    urlGetAtributos = "/atributo/all";
    urlEliminarAtributo = "/atributo/remove/";
    urlGuardarAtributo = "/atributo/save";

    constructor(private http: Http) { }

    getAtributos(): Promise<any> {
        return this.http.get(`${URL_BASE}${this.getAtributos}`)
            .toPromise()
            .then(response => { return response.json() })
            .catch(this.handleError);
    };

    eliminarAtributo(idAtributo): Promise<any> {
        console.log(`${URL_BASE}${this.eliminarAtributo}${idAtributo}`);
        return this.http.delete(`${URL_BASE}${this.eliminarAtributo}${idAtributo}`)
            .toPromise()
            .then(response => {
                return response.status;
            })
            .catch(this.handleError);
    }


    guardarAtributo(atributo: any):Promise<any> {
        console.log(atributo);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return  this.http.post(`${URL_BASE}${this.guardarAtributo}`, atributo, options)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        let body = res.text();
        return body || {};
    }



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
