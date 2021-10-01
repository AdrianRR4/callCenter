
import { Injectable } from '@angular/core';
import { Observable, Subject, timer, BehaviorSubject } from 'rxjs';
import { valueclook, Client, ClientAddress, ClientData } from '../model/common.model';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  Client = new BehaviorSubject <Client>(null);
  Address = new BehaviorSubject <ClientAddress>(null);
  FullClientData = new BehaviorSubject<ClientData>(null);
  clock: Observable <Date>;
  timedata$ = new Subject<valueclook>();
  value: valueclook;
  ampm:string;
  hours:number;
  minutes:string;

  constructor() {
    this.clock = timer(0,1000).pipe(map(t => new Date()),shareReplay(1));
   }

  GetTime(): Observable<valueclook>{
    this.clock.subscribe(time=>{
      this.hours = time.getHours() % 12;
      this.hours = this.hours ? this.hours : 12;
      this.value = {
        Hour: this.hours,
        minute: (time.getMinutes() <10) ? '0' + time.getMinutes() : time.getMinutes().toString(),
        ampm: time.getHours() > 11 ? 'PM' : 'AM'
      }
      this.timedata$.next(this.value);
    });
    return this.timedata$.asObservable();
  }

  SetClient(data){
    this.Client.next(data);
  }

  GetClient(){
    return this.Client.asObservable();
  }

  SetClientAddress(data){
    this.Address.next(data);
  }

  GetClientAddress(){
    return this.Address.asObservable();
  }
  SetClientFullData(data){
    this.FullClientData.next(data);
  }

  GetClientFullData(){
    return this.FullClientData.asObservable();
  }
}
