
export class ClientRequest {
    customers: Customers[];

}
export class Customers {
    nombreCompleto:string;
    email: string;
    telefono: string;
    telefonoAlt: string;
    address: Address[];
}

export class Address {
    city: string;
    nameStreet: string;
    numExterno: string;
    numInterno: string;
    colonia: string;
    latitud: string;
    longitud: string;
    stateName: string;
    zip: string;
    defaultShipping: boolean;
    defaultBilling: boolean

}