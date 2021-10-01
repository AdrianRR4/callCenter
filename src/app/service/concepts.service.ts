import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Concepts } from '../model/concepts.response.model';
import { ResletsService } from './reslets.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptsService {

  private url: string = 'app/site/hosting/restlet.nl?script=893&deploy=1&mode=CONCEPTS';
//                      `https://7093766-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=342&deploy=1&emp=${idEmp}`

private urlConcepts:string= 'app/site/hosting/restlet.nl?script=893&deploy=1&mode=CONCEPTS'  ;
  constructor(private http: HttpClient, private resletsService:ResletsService) { }

  /*
  getConcepts(){
    let auth=this.resletsService.getAuth2('POST','893');
   let headers= new HttpHeaders();
   headers=headers.set('Content-Type','application/json; charset=utf-8').set("Authorization", auth);
   const myJSON = JSON.stringify(Concepts);
   return this.http.get<Concepts>(this.url, { headers: headers });


  }
  */

  
  getConcepts(){
    let auth=this.resletsService.getAuth2('POST', `https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=893&deploy=1&mode=CONCEPTS`);
   let headers= new HttpHeaders();
   headers=headers.set('Content-Type','application/json; charset=utf-8').set("Authorization", auth);

   return this.http.post<Concepts>( `https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=893&deploy=1&mode=CONCEPTS`, { headers: headers });

  }
}
  

