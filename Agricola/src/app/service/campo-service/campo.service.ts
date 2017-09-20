import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { CampoDTO } from '../../components/campo/campo';
import { URL_BASE } from '../../config/url.sevice';



@Injectable()
export class CampoService {
  camposDTO: CampoDTO[] = [];

  urlGetCampo = "/campo/allActivos";
  urlEliminarCampo = "/campo/remove/"

  constructor(private http: Http) {

  }

  getcampos(): Promise<any> {
    console.log(`${URL_BASE}${this.urlGetCampo}`);
    return this.http.get(`${URL_BASE}${this.urlGetCampo}`)
      .toPromise()
      .then(response => { return response.json() })
      .catch(this.handleError);

  };


  eliminarCampo(idCampo): Promise<any> {

    console.log(`${URL_BASE}${this.urlEliminarCampo}${idCampo}`);
    return this.http.delete(`${URL_BASE}${this.urlEliminarCampo}${idCampo}`)
      .toPromise()
      .then(response => {
        this.getcampos();
        return response
      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



