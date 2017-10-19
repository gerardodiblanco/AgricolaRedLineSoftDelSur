import {CoordenadaClass} from './coordenada';
import {DomicilioClass} from './domicilio';
import {TipoCampo} from './tipoCampo';

export class CampoClass {
    idCampo: string;
 
    codigo: number;
    hectarea: number;
    nombre: string;
    tipo: TipoCampo;
   
    cuit: string;
    coordenadaList: CoordenadaClass[];
    domicilio:DomicilioClass;
    cuartelList:any;
    }

    