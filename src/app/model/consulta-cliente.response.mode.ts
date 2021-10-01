export class SearchResponse {

    isSuccessful: boolean;
    message: string;
    data: Data[];
    apiErrorPost: [];
    apiErrorGet: null
}

export class Data {

    id: string;
    nombreCompleto:string;
    email: string;
    telefono: string;
    telefonoAlt: string;
    addr: Addr[];
}
export class Addr {
    streetname: string;
    numExt: string;
    colonia: string;
    state: string;
    city: string;
    zipcode: string;
    ptg_entre_addr: string;
    ptg_y_addr: string;
    defaultShipping: boolean;
    defaultBilling: boolean;
}

