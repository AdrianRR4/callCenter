import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { BehaviorSubject } from 'rxjs';
import { UserLoginRequest } from '../model/user.login.request.model';
import { UserLoginResponse } from '../model/user.login.response.model';
import { AuthenticationResponse } from '../model/authentication.response.model';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  public urlLogin = 'http://potogas-sbx.iconnect.center/nsapi/synch/30';
  public urlToken = 'http://potogas-sbx.iconnect.center/api/auth?account=&organization=&subject=&credentials=';
  tokenBerear = new BehaviorSubject<string>(null);
  user=new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  authenticate() {
    return this.http.post<AuthenticationResponse>(this.urlToken, {});
  }

  setTokenByUser(token:string) {
    this.tokenBerear.next(token);
  }

  getTokenByUser() {
    return this.tokenBerear.asObservable();
  }
  setUser(user){
    this.user.next(user);
  }

  getUser(){
    return this.user.asObservable();
  }

  getUserInformation(userLoginRequest: UserLoginRequest, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set("Authorization", token);
    console.log('entre');
    return this.http.post<UserLoginResponse>(this.urlLogin, userLoginRequest, { headers: headers });
  }
  setData(data){
    this.setTokenByUser(data.token);
    this.setUser(data.data);
  }
}



