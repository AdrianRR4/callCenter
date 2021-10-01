import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { testClient } from '../model/test.model';
import { ResletsService } from './reslets.service';
import { SearchRequest } from '../model/consulta-cliente.request.model';
import { SearchResponse } from '../model/consulta-cliente.response.mode';
//import { testClient } from '../model/test.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  url='http://potogas-sbx.iconnect.center/nsapi/synch/140';
  client = new BehaviorSubject <any>(null);
  clientToAdd=new BehaviorSubject <any>(null);
  constructor(private http:HttpClient, private restlessAuth:ResletsService) { }

  searchClient(data:any,token){
    console.log(token)
    let headers = new HttpHeaders();
    headers=headers.set('Content-Type', 'application/json; charset=utf-8').set("Authorization", token );
    return this.http.post(this.url,data,{headers:headers})
  }

  clientlist(): Observable<HttpResponse<testClient[]>>{

   return this.http.get<testClient[]>('assets/DB/ClientDB.json', {observe: 'response'});
  }

  setClient(data){
    this.client.next(data);
  }


  searchService(id){
    let auth=this.restlessAuth.getAuth2("GET",`https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=623&deploy=1&idUser=${id}`);
    console.log(auth)
    let headers=new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set("Authorization", auth);
    
    return this.http.get(`https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=623&deploy=1&idUser=${id}`,{
      headers:headers
    })
  }

  getClient(){
    return this.client.asObservable();
  
}

searchClientData( searchClienRequest:any,  token){
  
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set("Authorization", token);
    let myJSON = JSON.stringify(searchClienRequest);

    console.log("Request desde servicio", myJSON,);
    return this.http.post <SearchResponse>(this.url, searchClienRequest, { headers: headers });
  }
  setClientToAdd(client:any){
    this.clientToAdd.next(client);
  }
  getClientToAdd(){
    return this.clientToAdd.asObservable();
  }

}


