import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';  

import {CampoClass} from '../../class/campo';
import { Router } from '@angular/router';




@Injectable()
export class NuevoCampoService { 
    constructor(private http:Http, private router: Router) {
        
        }


  editarCampo(campo:CampoClass){
    
        this.router.navigate(['/nuevo-campo'])
        
      }


}