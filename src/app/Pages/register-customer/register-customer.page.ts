import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Address, ClientRequest, Customers } from 'src/app/model/newClient.request.model';
import { ClientResponse } from 'src/app/model/newClient.response.model';
import { State } from 'src/app/model/state.interfaz';
import { LoginService } from 'src/app/service/login.service';
import { NewCustomerService } from 'src/app/service/new-customer.service';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.page.html',
  styleUrls: ['./register-customer.page.scss'],
})
export class RegisterCustomerPage implements OnInit {

  title = 'Registrar cliente';

  token: string;

  dataForm: Customers = new Customers();
  personalDataList: Customers[] = [];
  listDataClient: Customers[];//
  dataClient: Customers;
  newRequestClient: ClientRequest = new ClientRequest(); ///donde se va almacenar el nuevo arreglo
  newClientResponse: ClientResponse = new ClientResponse();
  /// address
  dataFormAddress: Address = new Address();
  customerAddressList: Address[] = [];
  dataAddress: Address;
  clientRequest: ClientRequest;
  state: State[] = [];

  addressDataObj = {
    city: null,
    nameStreet: null,
    numExterno: null,
    numInterno: null,
    colonia: null,
    latitud: null,
    longitud: null,
    stateName: null,
    zip: null,
    defaultShipping: null,
    defaultBilling: null


  };



  constructor(private loginService: LoginService,
    private newCustomerService: NewCustomerService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private statesService: StateService) { }

  ngOnInit() {
    this.getStates();
  }

  /*
  Modal dirección borrada
  */


  async toastAddCustomer(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
  async toastDeleteCustomer(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
  async toastAddAddress(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
  async toastAddressDelete(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }


  getStates() {
    this.state = this.statesService.getStates();
    console.log('estados', this.state);

  }

  onChange(event) {
    //alert("selecicona " +event.target.value );
  }
  registerCustomer(form: NgForm) {


    if (form.invalid) {
      this.warninglRegister();
      console.log('Formulario invalido');
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.dataClient = new Customers();

    this.dataClient.nombreCompleto = this.dataForm.nombreCompleto;
    this.dataClient.email = this.dataForm.email;
    this.dataClient.telefono = this.dataForm.telefono;
    this.dataClient.telefonoAlt = this.dataForm.telefonoAlt;

    this.personalDataList.push(this.dataClient);

    // this.dataCustomerSave();
    console.log('Info cliente', this.personalDataList);

    // Se crea el objeto padre
    this.clientRequest = new ClientRequest();
    // Se le pasa la direccion a la posicion 0 de la informacion del customer.
    this.personalDataList[0].address = this.customerAddressList;
    // Se le pasa toda la informacion.
    this.clientRequest.customers = this.personalDataList;

    console.log('Objeto Final', this.clientRequest);

    console.log('lista limpiada', this.personalDataList);
    this.toastAddCustomer('Cliente agregado');
    form.reset();
  }

  informatinAddress(form1: NgForm) {

    if (form1.invalid) {
      this.warninglRegister();
      console.log('Formulario invalido');
      Object.values(form1.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.dataAddress = new Address();


    this.dataAddress.city = this.addressDataObj.city;

    this.dataAddress.colonia = this.addressDataObj.colonia;
    this.dataAddress.nameStreet = this.addressDataObj.nameStreet;
    this.dataAddress.numExterno = this.addressDataObj.numExterno;
    this.dataAddress.numInterno = this.addressDataObj.numInterno;
    this.dataAddress.stateName = this.addressDataObj.stateName;
    console.log('contenido de stateName ====>>>', this.addressDataObj.stateName);
    this.dataAddress.zip = this.addressDataObj.zip;
    this.dataAddress.defaultBilling = this.addressDataObj.defaultBilling;
    this.dataAddress.defaultShipping = this.addressDataObj.defaultShipping;
    // datos pintados
    this.dataAddress.latitud = '';
    this.dataAddress.longitud = '';

    this.customerAddressList.push(this.dataAddress);
    console.log('Info dirección', this.customerAddressList);

    this.newRequestClient = new ClientRequest();
    this.newRequestClient.customers = this.personalDataList;
    console.log('Contenido de : this.newRequestClient.customers', this.newRequestClient.customers);

    //this.listNewTask = [];
    this.toastAddAddress('Dirección agregada');
    form1.reset();
  }
  sendCustomer() {


    this.loginService.getTokenByUser().subscribe(data => {
      this.token = data;
      console.log('informacion de data', data);
    });


    this.newCustomerService.newCustomer(this.newRequestClient, this.token).subscribe(response => {

      console.log(response);
      if (response.isSuccessful) {
        const myJSON = JSON.stringify(response);
        console.log('Request =>', myJSON);
        this.successfulRegister();

      }
      else {
        console.log('error', response.message);
        this.someErrors();
      }
    });

    this.personalDataList = [];
    this.customerAddressList = [];
    this.newRequestClient.customers = [];
  }
  async successfulRegister() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cliente Registrado ',
      subHeader: '',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async warninglRegister() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Llene todos los campos ',
      subHeader: '',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async someErrors() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Ocurrieron algunos errores',
      subHeader: '',
      message: 'Verifique los campos solicitados',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  deleteAdress(i: number) {
    this.customerAddressList.splice(i, 1);
    //this.addressDelete();
    this.toastAddressDelete('Direccion borrada');
    console.log('borrado');
  }
  deleteClient(i: number) {
    this.personalDataList.splice(i, 1);
    //this.clientDelete();
    this.toastDeleteCustomer('Cliente borrado');
    console.log('borrado');
  }



}
