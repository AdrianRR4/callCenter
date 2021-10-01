import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/service/control.service';
import { ClientData } from '../../model/common.model';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Items, NewServiceRequest } from 'src/app/model/newService.request.model';
import { LoginService } from '../../service/login.service';
import { NewServiceService } from '../../service/new-service.service';
import { Opportunities } from '../../model/newService.request.model';
import { SearchRequest } from '../../model/consulta-cliente.request.model';
import { ClientService } from 'src/app/service/client.service';
import { Data, SearchResponse } from 'src/app/model/consulta-cliente.response.mode';
//import { SearchResponse } from '../../model/consulta-cliente.response.mode';
import { NgForm } from '@angular/forms';

import { ItemsService } from '../../service/items.service';
import { Articles   } from 'src/app/model/articles.model.response';
import { State } from 'src/app/model/state.interfaz';
import { ConceptsService } from '../../service/concepts.service';
import { Concepts } from '../../model/concepts.response.model';
import { Address } from '../../model/newClient.request.model';
import { Complain } from '../../model/complain.response.model';
import { ComplainRequest } from '../../model/complain.request.model';
import { ComplainService } from '../../service/complain.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.page.html',
  styleUrls: ['./new-service.page.scss'],
})
export class NewServicePage implements OnInit {

  title = "Registrar Servicio";

  idCustomer: any;
  token: string;
  clientdata: ClientData;
  toglebilling:boolean=false;
  add:any;

  // Variable globales lista de items
  items: Items;
  listItems: Items[] = [];
  listNewService: Opportunities[] = [];//lista de información del servicio solicitado
  newServiceRquest: Opportunities = new Opportunities(); //almacena el arreglo items
  dataNewService: Opportunities = new Opportunities();//instancia para el formulario
  dataFormComplain:ComplainRequest=new ComplainRequest();
  request: NewServiceRequest = new NewServiceRequest();
  date = new Date();
  enable: boolean = false;
  envase: boolean;

  // variables globales para busqueda
  searchForm: SearchRequest = new SearchRequest();
  searchClientData: SearchRequest;
  informationShow: SearchResponse = new SearchResponse();//mostrar la información
  customerDataSearch: Data = new Data();
  address:Address[]=[];
  //idCustumer: Opportunities = new Opportunities();
  ejemplo: any;//borrar
  infoArticle: Articles = new Articles();
  infoConcepts:Concepts=new Concepts();
  //articleData:DataArticle=new DataArticle();
  valorArticle: any;
  nuevoValor: any;
  enableShowCustomer: boolean = false;
  //objeto articulo
  enablecomplaints:boolean=false;

  orderItem = {
    tipeSearch: null,
    article: null,
    quantity: null,
    unit: null,
    envase: 1,
    type: null,
    origen: null

  }

  constructor(private CTRLsrv: ControlService,
    private menu: MenuController,
    private loginService: LoginService,
    private newServiceService: NewServiceService,
    private alertCtrl: AlertController,
    private searchClientService: ClientService,
    private toastController: ToastController,
    private itemsService: ItemsService,
    private clientService: ClientService,
    private conceptsService:ConceptsService,
    private complainService:ComplainService) { }

    
  ngOnInit() {
    this.loginService.getTokenByUser().subscribe(data => {
      this.token = data;
      console.log('informacion de data', data);
    });
    if (history.state) {
      let data = history.state
      console.log(data);
    }



    this.clientService.getClient().subscribe(data => {
      if (data) {
        // this.idCustomer = data;
        this.enableShowCustomer = true;
        this.customerDataSearch = data;
        console.log('contenido de customer', this.customerDataSearch);
      } else {
        console.log('sin id ');
      }
    });
    this.getItems();
    //  this.dataCustomer()
    this.getConcepts();
   
  }


  async toastItemDelete(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }


  async toastItemAdd(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: "primary"
    });
    toast.present();

  }

  onChange(event) {
    console.log('valor =>', event.detail.value)
    this.valorArticle = event.detail.value;
    console.log('Nuevo valor =>', this.valorArticle)
    console.log(event.target.ariaLabel);
    console.log(event);

  }

  getItems() {
    console.log("ENTRE<<<<<<<<<<<<<<<");
    this.itemsService.getItems().subscribe((response: Articles) => {
      console.log('====>', response);
      let respuesta = response;
      // this.infoArticle=response;
      this.infoArticle = response;

      console.log('respuesta ', respuesta);
    });
  }


  /*Método para traer los conceptos de la queja 
  */
  getConcepts(){
    console.log('ENRTREEEEE 2222');
    this.conceptsService.getConcepts().subscribe((response:Concepts)=>{
      console.log('respuesta ======>>>>', response);
    
    });
  }
  dataCustomer() {
    this.customerDataSearch = this.idCustomer;
    console.log('cambiando variable !!!!!!!!!!!!!!', this.customerDataSearch);
    if (this.customerDataSearch == undefined) {
      this.enableShowCustomer = false;
      console.log('sin valor');
    } else {
      console.log('contiene valor');

    } return;
  }



  /*
   * Método para realizar búsqueda
   */
  searchCient(form: NgForm) {


    if (form.invalid) {
      this.errorFromConsulta();
      console.log('Formulario invalido');
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    //this.searchClientData = new SearchRequest();
    let dataClientObj = new SearchRequest();

    dataClientObj.name = this.searchForm.name;
    dataClientObj.phone = this.searchForm.phone;
    dataClientObj.city = this.searchForm.city;
    dataClientObj.colonia = this.searchForm.colonia;
    dataClientObj.stateName = this.searchForm.stateName;
    dataClientObj.nameStreet = this.searchForm.nameStreet;
    dataClientObj.numExterno = this.searchForm.numExterno;
    dataClientObj.zip = this.searchForm.zip;
    console.log('contenido: ', dataClientObj);


    this.searchClientService.searchClientData(dataClientObj, this.token).subscribe((response: SearchResponse) => {


      if (response.isSuccessful) {

        console.log('si hay usuario')
        console.log('Repsuesta consulta', response);
        let myJSON = JSON.stringify(response);
        console.log("Request JSON consulta", myJSON);
            response.data[0].addr
        this.informationShow = response;

        
      console.log('Direccion ====>>>', this.informationShow.data[0].addr);
     this.informationShow.data[0].addr.forEach((direccion)=>{
console.log('FOREAHCH>>>>>>>',direccion);
this.add=direccion;
console.log('contenido de dirección:', this.add);

     });
     
        this.enable = true;
      } else {
        console.log('error', response.message);
        this.errorSearch();
      }
    });

    console.log('informacion de data', this.informationShow.data);
    form.reset();
    /*
    for (let a in this.informationShow){
      console.log(`${a}: ${this.informationShow[a]}`);
    }

    */this.enable = false

  
  }


  complain(formComplain:NgForm){
    if (formComplain.invalid) {
      this.errorAddItem();
      console.log('Formulario invalido');
      Object.values(formComplain.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
  }

/*
* Método queja 
*/

newComplain(form3:NgForm){

  let newComplainObj= new ComplainRequest();
  newComplainObj.date=this.dataFormComplain.date;
  let date=new Date(this.dataFormComplain.date);

  let fecha = date.getDate();
  newComplainObj.date = fecha;
  console.log('hora inicio', fecha);

  newComplainObj.concept=this.dataFormComplain.concept;
  newComplainObj.customer=32596;
  newComplainObj.details=this.dataFormComplain.details;
  newComplainObj.service=0;
  newComplainObj.complaint=this.dataFormComplain.complaint;

  console.log('contenido de Queja',newComplainObj);
  
this.complainService.complain(newComplainObj).subscribe(response=>{
console.log('respuesta Queja', response);

});

  
  
}


  /*
   * Método para agregar items
   */

  addProduct(form1: NgForm) {
    if (form1.invalid) {
      this.errorAddItem();
      console.log('Formulario invalido');
      Object.values(form1.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    console.log(this.orderItem);
    this.items = new Items();

    this.items.article = this.orderItem.article;
    this.items.quantity = this.orderItem.quantity;
    this.items.units = this.orderItem.unit;

    //this.orderItem.envase= this.envase

    this.listItems.push(this.items);

    console.log('contenido de items', this.listItems);
    console.log(this.orderItem.envase);
    //this.listItems = [];

    this.toastItemAdd('Producto agregado');
    form1.reset();
  }

  /*
   * Método para crear el Nuevo Servicio
   */

  newService(form2: NgForm) {


    /*
     * Validación formulario
    */
    if (form2.invalid) {
      this.warningNewService();
      console.log('Formulario invalido');
      Object.values(form2.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    /*
       * Instancias de clases y obtención de la informacion del formulario
       */

    this.newServiceRquest = new Opportunities();
    this.newServiceRquest.items = this.listItems;
    console.log('contenido de items', this.listItems);
    let newServicesObj = new Opportunities();

    newServicesObj.comentary = this.dataNewService.comentary;
    // manejo fechas y horas
    let fechaInicio = new Date(this.dataNewService.rangeH1);
    let horainicio = fechaInicio.toLocaleTimeString();
    newServicesObj.rangeH1 = horainicio;
    console.log('hora inicio', horainicio);
    //newServicesObj.rangeH1 = '09:20';
    let fechaFin = new Date(this.dataNewService.rangeH2);
    let horaFin = fechaFin.toLocaleTimeString();
    newServicesObj.rangeH2 = horaFin;
    console.log('hora fin', horaFin);


    if (horainicio == horaFin) {
      console.log("horas iguales, ingrese horas validas");
      this.errorTime();
      return;

    } else if (horainicio >= horaFin) {
      console.log('ingrese una hora valida');
      this.errorTime();
      return;
    }
    //newServicesObj.rangeH2 = '10:20';
    newServicesObj.typeservice = this.dataNewService.typeservice;
    newServicesObj.origen = this.dataNewService.origen;
    newServicesObj.weekDay = this.dataNewService.weekDay;

    // no se envian
    newServicesObj.operario = '1178';
    //newServicesObj.origen = '1';
    newServicesObj.route = '1';
    newServicesObj.turn = '1';
    newServicesObj.paymentMethod = this.dataNewService.paymentMethod;
    newServicesObj.dateCreate = '21/07/2021';
    newServicesObj.dateCreate = '23/07/2021';
    newServicesObj.status = '10';
    //newServicesObj.customer=this.ejemplo;
    console.log('trae id desde busqueda de cliente');

    if (this.informationShow.data != undefined) {
      console.log('el id  valor viene de new Sevice ');
      newServicesObj.customer = this.informationShow.data[0].id;
    } else if (this.customerDataSearch != undefined) {
      console.log('el valor viene de search client');
      newServicesObj.customer = this.customerDataSearch.id;
    }

    // console.log('valor customer 1', this.informationShow.data[0].id);
    console.log('valor customer 2', newServicesObj.customer);
    //newServicesObj.customer=this.idCustumer.customer;
    //console.log('contenido de ejemplo',this.ejemplo);
    console.log('contenido de customer', this.idCustomer)
    newServicesObj.reference = this.dataNewService.reference;
    newServicesObj.folio = this.dataNewService.folio;
    this.listItems.forEach(item => {
      console.log('=====>>>>>', item);
      item.article = item.article.id;
    });

    newServicesObj.items = this.listItems;

    this.listNewService.push(newServicesObj);
    console.log('contenido de listItems', this.listItems);
    console.log('contenido de listNewService', this.listNewService);
    this.request.opportunities = this.listNewService;


    /*
   * Obtención del token
   */
    this.loginService.getTokenByUser().subscribe(data => {
      this.token = data;
      console.log('informacion de data', data);
    });

    /*
     * Llamando al servicio newService
  */
    if (this.informationShow == undefined || this.customerDataSearch == undefined) {
      console.log("MANDAR PRIMER ERROR !!!!!!!!");
      this.errorSearchCustomer();
      return;
    }
    this.newServiceService.newService(this.request, this.token).subscribe(response => {
      if (response.isSuccessful) {
        console.log('respuesta', response);
        this.serviceSent();
        let myJSON = JSON.stringify(response);
        console.log("Request", myJSON);
      }
      else {

        console.log('error', response.message);
        this.errorSend();
      }
    });


    form2.resetForm();
    this.listItems = [];
    console.log('contenido de  this.listItems', this.listItems);
    this.request.opportunities = [];
    console.log('contenido de this.request.opportunities ', this.request.opportunities);
    this.listNewService = [];
    console.log('contenido de listNewService ', this.listNewService);

    this.informationShow.data[0].id = null;
    console.log('contenido de ', this.informationShow.data[0].id);
    this.customerDataSearch = null;
    console.log('contenido de customerDataSearch', this.customerDataSearch);
    let limpiar = this.informationShow.data.splice(0, this.informationShow.data.length);
    console.log(limpiar, 'elementos limpiados');
    console.log('contenido', this.informationShow);
    //console.log('contenido de informationShow', this.informationShow.data[0].id);
    //this.informationShow.data[0].id = '';
    // this.informationShow.data = [];
    // console.log('limpiando informationShow', this.informationShow.data[0].id);

  }

  /*
   * Función para borrar un item de la lista
   */
  delete(i: number) {

    this.listItems.splice(i, 1);
    //this.itemDelete();
    this.toastItemDelete('Producto borrado');
    console.log('borrado');
  }

  /**
  * Modal para mensaje de enviado
  */
  async serviceSent() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Servicio Enviado',
      subHeader: '',
      message: 'Enviado satisfactoriamente',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  /**
  * Modal para mensaje falta de campos por llenar en busqueda
  */
  async errorFromConsulta() {
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

  /**
    * Modal para mensaje error no ingreso cliente
    */
  async errorSearchCustomer() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Ingrese un cliente',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  /**
  * Modal para mensaje error al agregar Item
  */
  async errorAddItem() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Ingrese todos los campos',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  /*
  * Modal para mensaje falta de campos por llenar en Nuevo Servicio
  */
  async warningNewService() {
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
  async errorSend() {
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
  async errorSearch() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cliente no encontrado',
      subHeader: '',
      message: 'Verifique los datos ingresados',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async errorTime() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Verifique las horas ingresadas',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  /*
   * Función para mostrar menu lateral
   */
  openMenu() {
    this.menu.open('main');
  }


}


