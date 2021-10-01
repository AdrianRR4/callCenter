import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EventEmitter } from '@angular/core';
import { ClientRequest } from '../model/newClient.request.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { newServiceResponse } from '../model/newService.response.model';

@Injectable({
  providedIn: 'root'
})
export class NewCustomerService {
  
  @Output() disparador =new EventEmitter <ClientRequest>();
  private _refresh$= new Subject<void>();
  url='http://potogas-sbx.iconnect.center/nsapi/synch/150';

  constructor(private http:HttpClient) { }

  
  newCustomer(newCustomer: ClientRequest, token) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set("Authorization", token);
    let myJSON = JSON.stringify(newCustomer);

    console.log("Request", myJSON,);
    return this.http.post<newServiceResponse>(this.url, newCustomer, { headers: headers }).pipe(
      tap( ()=>{
        this._refresh$.next();
      }

      )
    )
  }

}
