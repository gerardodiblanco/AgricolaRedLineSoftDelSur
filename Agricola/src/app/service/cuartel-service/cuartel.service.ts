import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { URL_BASE } from '../../config/url.sevice';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class CuartelService {
   
    urlBuscarCuatel = "/cuartel/getCuartel/";
    urlGetCuateles = "/cuartel/getAll/";

    constructor(private http: Http, private router: Router,
     ) {

    }

    buscarCuartel(idCuartel): Promise<any> {

        if (idCuartel) {

            console.log(this.urlBuscarCuatel + idCuartel);
            return this.http.get(`${URL_BASE}${this.urlBuscarCuatel}${idCuartel}`)
                .toPromise()
                .then(response => { return response.json() })
                .catch(this.handleError);
        } else {
            return Promise.resolve({
                codigo: '', coordenadaList: [],hectarea: '', idCuartel: null,
                descripcion: ""
            });
        }

    }

    getCuarteles(idCampo): Promise<any> {
        console.log(`${URL_BASE}${this.urlGetCuateles}`);
        return this.http.get(`${URL_BASE}${this.urlGetCuateles}${idCampo}`)
          .toPromise()
          .then(response => { return response.json() })
          .catch(this.handleError);
    
      };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}