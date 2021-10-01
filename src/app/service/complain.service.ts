import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ResletsService } from './reslets.service';
import { ComplainRequest } from '../model/complain.request.model';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  constructor(private http:HttpClient,private resletService:ResletsService) { }

  private urlComplain:string=`https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=893&deploy=1`;


  complain(complain:ComplainRequest){
    let auth = this.resletService.getAuth('POST','893');
    let headerReslets=new HttpHeaders();
    headerReslets= headerReslets.set('Content-Type','application/json; charset=utf-8').set("Authorization", auth);
    const myJSON = JSON.stringify(complain);
    return this.http.post(this.urlComplain, complain, { headers: headerReslets })

  }
}
