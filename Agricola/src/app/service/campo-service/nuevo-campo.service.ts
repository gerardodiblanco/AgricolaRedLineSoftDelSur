import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { CampoClass } from '../../class/campo';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { URL_BASE } from '../../config/url.sevice';
import 'rxjs/add/operator/toPromise';
import { CampoService } from './campo.service';


@Injectable()
export class NuevoCampoService {
    campo: any;
    urlSave = "/campo/save";
    urlBuscarCampo = "/campo/";

    constructor(private http: Http, private router: Router,
        private _campoService: CampoService) {

    }

    buscarCampo(idCampo): Promise<any> {

        if (idCampo) {

            console.log(this.urlBuscarCampo + idCampo);
            return this.http.get(`${URL_BASE}${this.urlBuscarCampo}${idCampo}`)
                .toPromise()
                .then(response => { return response.json() })
                .catch(this.handleError);
        } else {
            return Promise.resolve({
                calle: '', codigo: '', coordenadaList: [], cuartelList: [], cuit: "", hectarea: '', idCampo: null, localidad: "",
                nombre: "", numeroDomicilio: '', tipo: ""
            });
        }

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }




    guardarCampo(campo: any) {
        console.log(campo);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${URL_BASE}${this.urlSave}`, campo, options)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleErrorObservable);


        return;
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

}

