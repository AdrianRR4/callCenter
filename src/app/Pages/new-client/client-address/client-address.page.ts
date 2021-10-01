import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';
import { ControlService } from 'src/app/service/control.service';
import { Address, ClientRequest } from '../../../model/newClient.request.model';
import { AlertController } from '@ionic/angular';
import { NewCustomerService } from '../../../service/new-customer.service';



@Component({
  selector: 'app-client-address',
  templateUrl: './client-address.page.html',
  styleUrls: ['./client-address.page.scss'],
})

export class ClientAddressPage implements OnInit {


dataFormAdress:Address= new Address();
customerAddressList:Address[]=[];
dataListCustomer:ClientRequest= new ClientRequest();

  constructor(
    private router:Router,
                private actiRout:ActivatedRoute,
                private CtrlSrv:ControlService,
                private _clientService:ClientService,
                private alertCtrl:AlertController,
                private newCostumerService:NewCustomerService,
                private activatedRoute:ActivatedRoute 
  ) { }

  ngOnInit() {
    this.newCostumerService.disparador.subscribe( data=>{ 
      //console.log('información de DATA', data);
      this.dataListCustomer=data;
      console.log('Lista =>',this.dataListCustomer );
console.log('hola');
    }); 
    
  }
 
  address(form:NgForm){
    if (form.invalid) {
      this.warningAddress();
       console.log('Formulario invalido');
       Object.values(form.controls).forEach(control => {
         control.markAsTouched();
       });
       return;
     }

     let dataAddressObj=new Address();

     dataAddressObj.city=this.dataFormAdress.city;
     dataAddressObj.colonia=this.dataFormAdress.colonia;
     dataAddressObj.nameStreet=this.dataFormAdress.nameStreet;
     dataAddressObj.numExterno=this.dataFormAdress.numExterno;
     dataAddressObj.numInterno=this.dataFormAdress.numInterno;
     dataAddressObj.stateName=this.dataFormAdress.stateName;
     dataAddressObj.zip=this.dataFormAdress.zip;
     // datos pintados
     dataAddressObj.latitud='';
     dataAddressObj.latitud='';

     this.customerAddressList.push(dataAddressObj);
     console.log('lista',this.customerAddressList);


  }


  async warningAddress() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Llene los campos correspondientes',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
