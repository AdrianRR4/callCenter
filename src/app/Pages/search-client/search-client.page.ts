import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Address, Customers } from 'src/app/model/newClient.request.model';
import { ClientService } from 'src/app/service/client.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.page.html',
  styleUrls: ['./search-client.page.scss'],
})
export class SearchClientPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  client: boolean = false;
  token: string;
  formCustomerPhone: FormGroup;
  formCustomerDirection: FormGroup;
  customer: any;
  title = 'Consulta Cliente';
  type: any;


  constructor(   private router: Router,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private menu: MenuController,
    private customerService: ClientService,
    private loginService: LoginService) {


      this.formCustomerPhone = this.formBuilder.group({
        customerName: new FormControl(''),
        customerPhone: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
      });

    this.formCustomerDirection = this.formBuilder.group({
      customerCity: new FormControl('', Validators.compose([])),
      customerName: new FormControl('', Validators.compose([])),
      customerState: new FormControl('', Validators.compose([])),
      customerSuburb: new FormControl('', Validators.compose([])),
      customerExternalnum: new FormControl('', Validators.compose([])),
      customerStreet: new FormControl('', Validators.compose([])),
      customerZip: new FormControl('', Validators.compose([])),
    });
  }

  ngOnInit() {
    this.menu.enable(true);
    this.loginService.getTokenByUser().subscribe((data) => {
      this.token = data;
    });
  }


  searchPhone() {
    // eslint-disable-next-line prefer-const
    console.log('hola');
    let me = this;
    if (me.formCustomerPhone.valid) {
      // eslint-disable-next-line prefer-const
      let data = {
        name: me.formCustomerPhone.value.customerName,
        phone: me.formCustomerPhone.value.customerPhone,
      };
      this.getClient(data);
    } else {
      // eslint-disable-next-line prefer-const
      let data = {
        phone: '9991234567',
      };
      this.getClient(data);
    }
  }

  searchDirection() {
    console.log('hola');
    let me = this;
    if (this.formCustomerDirection.valid) {
      let data = {
        name: me.formCustomerPhone.value.customerName,
        colonia: me.formCustomerDirection.value.customerSuburb,
        stateName: me.formCustomerDirection.value.customerState,
        nameStreet: me.formCustomerDirection.value.customerStreet,
        city: me.formCustomerDirection.value.customerCity,
        numExterno: me.formCustomerDirection.value.customerExternalnum,
        zip: me.formCustomerDirection.value.customerZip,
      };
      this.getClient(data);
    } else {
      let data = {
        phone: '9991234567',
      };
      this.getClient(data);
    }
  }

  async presentAlert(header) {
    const alert = await this.alertController.create({
      // eslint-disable-next-line object-shorthand
      header: header,
      message: 'Desea crearlo?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            // eslint-disable-next-line prefer-const
            let newCustomer = new Customers();
            newCustomer.nombreCompleto = this.formCustomerPhone.value.customerName;
            newCustomer.telefono = this.formCustomerPhone.value.customerPhone;
            newCustomer.address = [];
            // eslint-disable-next-line prefer-const
            let address = new Address();
            address.city = this.formCustomerDirection.value.customerCity;
            address.colonia = this.formCustomerDirection.value.customerSuburb;
            address.nameStreet =
              this.formCustomerDirection.value.customerStreet;
            address.stateName = this.formCustomerDirection.value.customerState;
            address.zip = this.formCustomerDirection.value.customerZip;
            address.numExterno =
              this.formCustomerDirection.value.customerExternalnum;
            newCustomer.address.push(address);
            this.customerService.setClientToAdd(newCustomer);
            this.router.navigate(['/new-client/null']);
          },
        },
        {
          text: 'No',
          cssClass: 'secondary',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
      ],
    });
    await alert.present();
  }

  newShearch() {
    this.customer = null;
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  getClient(data) {
    // eslint-disable-next-line prefer-const
    let json = JSON.stringify(data);
    console.log('client', json);
    console.log(this.token);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.customerService.searchClient(json, this.token).subscribe((data) => {
      this.customer = data['data'];
      if (this.customer == null) {
        this.presentAlert(data['message']);
      } else {
        this.customer = data['data'][0];
        this.customerService.setClient(this.customer);
      }
      console.log(this.customer);
    });
  }


}





