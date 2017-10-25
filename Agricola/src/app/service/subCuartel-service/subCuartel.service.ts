import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { URL_BASE } from '../../config/url.sevice';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubCuartelService {

  urlBuscarSubCuatel = '/subCuartel/getSubCuartel/';
  urlGetSubCuateles = '/subCuartel/getAllByCuartel/';
  //  urlGetSubCuatel = "/subCuartel/getSubCuartelById/";
  urlEliminarSubCuartel = '/subCuartel/remove/';
  urlGuardarSubCuartel = '/subCuartel/save/';

  constructor(private http: Http, private router: Router,
  ) {

  }
  getSubCuarteles(idCuartel): Promise<any> {
    console.log(`${URL_BASE}${this.urlGetSubCuateles}`);
    return this.http.get(`${URL_BASE}${this.urlGetSubCuateles}${idCuartel}`)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getSubCuartel(idSubCuartel): Promise<any> {
    console.log(`${URL_BASE}${this.urlBuscarSubCuatel}`);
    return this.http.get(`${URL_BASE}${this.urlBuscarSubCuatel}${idSubCuartel}`)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  guardarSubCuartel(subCuartel): Promise<any> {

    console.log(subCuartel);
    console.log(`${URL_BASE}${this.urlGuardarSubCuartel}`);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ 'headers': headers });
    return this.http.post(`${URL_BASE}${this.urlGuardarSubCuartel}`, subCuartel, options)
      // .map(this.extractData)
      .toPromise()
      .catch(this.handleError);
  }


  eliminarSubCuartel(idSubCuartel): Promise<any> {

    console.log(`${URL_BASE}${this.urlEliminarSubCuartel}${idSubCuartel}`);
    return this.http.delete(`${URL_BASE}${this.urlEliminarSubCuartel}${idSubCuartel}`)
      .toPromise()
      .then((response) => {

        return response.status;
      })
      .catch(this.handleError);

  }
}
