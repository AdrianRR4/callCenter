export class Client {
  name : string;
  LastNameP : string;
  LastNameM?:string;
  Phone: string;
  SecPhone?: string;
  Email?:string;
}

export class ClientData extends Client { 
  ID?: string;
 
  Address: ClientAddress[];
  invoice?:InvoiceData;
}

export class ClientAddress{
  Address: string;
  IntNumber?: string;
  ExtNumber: string;
  SecAddress: string;
  ThiAddress?: string;
  Postal: string;
  City: string;
  Zone: string;
}

export class InvoiceData{
  nombre:string;
  email:string;
  RFC:string;
  address:ClientAddress;
  businesstyoe:string;
}

export class valueclook {
    Hour: number;
    minute:string;
    ampm:string;
  }