import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { valueclook } from 'src/app/model/common.model';

@Component({
  selector: 'app-header-pages',
  templateUrl: './header-pages.component.html',
  styleUrls: ['./header-pages.component.scss'],
})
export class HeaderPagesComponent implements OnInit {


  @Input() title: string;
  @Input() responsable:string;

  data$: Observable<valueclook>
  hours:number;
  minutes:string;
  ampm:string;
  
  constructor() { }

  ngOnInit() {
    this.data$ = this.TimeSrv.GetTime();
    this.data$.subscribe(time => {
      this.hours = time.Hour;
      this.minutes = time.minute;
      this.ampm = time.ampm;
    });
  }

}
