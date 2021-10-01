import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { ClientService } from 'src/app/service/client.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.page.html',
  styleUrls: ['./service-table.page.scss'],
})
export class ServiceTablePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  searchTerm: string;
  auxi: any[];
  serviceTypes: any[] = ['Pedido', 'Fuga', 'Cilindro', 'Queja'];
  servicesStates: any[] = ['Pendiente', 'Concretado', 'En proceso de cotización', 'Cancelado'];
  services: any[] = [{ serviceId: '1234', serviceType: 'Fuga', serviceDate: Date.now(), serviceState: 'Pendiente' },
  { serviceId: '6789', serviceType: 'Fuga', serviceDate: Date.now(), serviceState: 'Pendiente' },
  { serviceId: '5432', serviceType: 'Cilindro', serviceDate: Date.now(), serviceState: 'Ejecutado' },
  { serviceId: '9876', serviceType: 'Cilindro', serviceDate: Date.now(), serviceState: 'Ejecutado' },
  { serviceId: '1289', serviceType: 'Cilindro', serviceDate: Date.now(), serviceState: 'Cancelado' },
  { serviceId: '3467', serviceType: 'Queja', serviceDate: Date.now(), serviceState: 'Atendido' },
  { serviceId: '5087', serviceType: 'Cilindro', serviceDate: Date.now(), serviceState: 'Ejecutado' }];
  public searchControl: FormControl;

  customer: any;
  constructor(private router: Router, private clientService: ClientService) {
    this.searchControl = new FormControl();
  }
  ngOnInit() {
    this.clientService.getClient().subscribe(data => {
      if (data) {
        this.customer = data;

      }
    });
    this.getClientServicies();

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        console.log(search);
        this.services = this.filterServices(search);
        // eslint-disable-next-line @typescript-eslint/quotes
        if (search === "") {
          this.services = this.auxi;
        }
      });
  }
  getClientServicies() {

    this.clientService.searchService(this.customer.id).subscribe((data: any) => {
      if (data) {
        this.services = data.data;
        console.log(data);
        this.auxi = this.services;
      } return;
    });
  }

  filterServices(searchTerm) {
    if (this.services != undefined)
      return this.services.filter(item => {
        return item.typeService.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
          || item.status.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          item.internalId.indexOf(searchTerm) > -1;
      });
  }

  createService() {
    console.log(this.customer);
    this.router.navigate(['/new-service'], { state: { data: this.customer } });
    //this.router.navigate(["incidents", this.customer]);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      for (let i = 0; i < 20; i++) {
        const service = {
          internalId: (Math.floor(1000 + Math.random() * 9000)).toString(),
          typeService: this.serviceTypes[Math.floor(Math.random() * this.serviceTypes.length)],
          dateSolic: Date.now(),
          status: this.servicesStates[Math.floor(Math.random() * this.servicesStates.length)]
        };
        console.log(this.services.length);
        this.services.push(service);
      }
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.services.length >= 50) {
        event.target.disabled = true;
      }
    }, 1000);
  }

}
