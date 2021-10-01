import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewServiceRequest, Items, Opportunities } from '../model/newService.request.model';
import { newServiceResponse } from '../model/newService.response.model';

@Injectable({
  providedIn: 'root'
})
export class NewServiceService {

  constructor(private http: HttpClient) { }

  //url = 'https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=603&deploy=1';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  url = 'http://potogas-sbx.iconnect.center/nsapi/synch/170';

  newService(newService: NewServiceRequest, token) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
    const myJSON = JSON.stringify(newService);

    console.log('Request', myJSON,);
    // eslint-disable-next-line object-shorthand
    return this.http.post<newServiceResponse>(this.url, newService, { headers: headers });
  }

}
