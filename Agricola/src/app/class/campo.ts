import {CoordenadaClass} from './coordenada';
import {DomicilioClass} from './domicilio';

export class CampoClass {
    idCampo: string;
    altitud:number;
    codigo: number;
    hectarea: number;
    nombre: string;
    tipo: any;
   
    cuit: string;
    coordenadaList: CoordenadaClass[];
    domicilio:DomicilioClass;
    cuartelList:any;
    }