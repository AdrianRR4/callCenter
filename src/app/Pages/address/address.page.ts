import { Component, OnInit } from '@angular/core';

import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  customer: any;

  constructor(private customerService: ClientService) { }

  ngOnInit() {
    this.customerService.getClient().subscribe(data => {
      if (data) {
        this.customer = data;
        console.log(this.customer);
      }
    });
  }

}
