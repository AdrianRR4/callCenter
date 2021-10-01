

export class BillingInformation{

    name:string;
    rfc:string;
    email:string;
    calle:string;
    numInterior:number;
    numExterior:number;
    codigoPostal:string;
    colonia: Colonia;
    poblacion:Poblacion;
}

export class Colonia{
    name:string;

}

export class Poblacion{

    name:string;
}