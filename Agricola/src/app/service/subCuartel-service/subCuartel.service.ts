import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { URL_BASE } from '../../config/url.sevice';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class SubCuartelService {

    urlBuscarSubCuatel = "/subCuartel/getSubCuartel/";
    urlGetSubCuateles = "/subCuartel/getAllByCuartel/";
  //  urlEliminarCuartel = "/cuartel/remove/"
  // urlGuardarCuartel = "/cuartel/save/"

    constructor(private http: Http, private router: Router,
    ) {

    }
    getSubCuarteles(idCuartel): Promise<any> {
        console.log(`${URL_BASE}${this.urlGetSubCuateles}`);
        return this.http.get(`${URL_BASE}${this.urlGetSubCuateles}${idCuartel}`)
            .toPromise()
            .then(response => { return response.json() })
            .catch(this.handleError);

    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}