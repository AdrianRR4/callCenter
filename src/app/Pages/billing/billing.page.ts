import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {

  customer:any;

  constructor(private customerService:ClientService) { }
 
  ngOnInit() {

    this.customerService.getClient().subscribe(data=>{
      if(data){
        this.customer=data;
      }
    });
  }

}
