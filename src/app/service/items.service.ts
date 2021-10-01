import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Articles } from '../model/articles.model.response';
import { ResletsService } from './reslets.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  private url: string = 'app/site/hosting/restlet.nl?script=622&deploy=1';
 
  constructor(private http: HttpClient, private resletsService:ResletsService ) { }

/*
  getItems(){
    let auth=this.resletsService.getAuth2("GET",`https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=622&deploy=1`);
    console.log(auth)
    let headers=new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set("Authorization", auth);
    
    return this.http.get(`https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=622&deploy=1`,{
      headers:headers
    })
  }

*/
getItems(){

  let auth=this.resletsService.getAuth('GET','622');
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').set("Authorization", auth);

  return this.http.get<Articles>(this.url, { headers: headers });
}

}
