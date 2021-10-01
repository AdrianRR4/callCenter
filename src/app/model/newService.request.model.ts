
export class NewServiceRequest {
  opportunities: Opportunities[];
}

export class Opportunities {
  status: string;
  dateCreate: string;
  closeData: string;
  customer: string;
  operario: string;
  route: string;
  turn: string;
  paymentMethod: string;
  origen: string;
  typeservice: string;
  comentary: string;
  rangeH1: string;//nuevos
  rangeH2: string;
  weekDay: string;
  folio:string;
  reference:string;
  items: Items[];
}

export class Items {
  article: any;
  quantity: string;
  units: string;
}
