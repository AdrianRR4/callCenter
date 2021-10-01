import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menuCtrl: MenuController,
    private route: Router,
    private alertCtrl: AlertController,
    private loginService: LoginService

  ) { }

  ngOnInit() {}


  async singOut(){
    this.menuCtrl.close('main-menu');

    const closeAlert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Desea salir ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si, salir',
          cssClass: 'danger',
          handler: () => {
            
            this.loginService.setUser(null);
            this.route.navigate(['/login']);
            this.menuCtrl.enable(false);
          }
        }
      ]
    });

    await closeAlert.present();
    console.log('cerrar');
  
  }

  searchClient() {
    this.route.navigate(['/search-client']);
    this.menuCtrl.close('first');
  }

  registerCustome() {
    this.route.navigate(['/register-customer']);
    this.menuCtrl.close('first');
  }
  newService() {
    this.route.navigate(['/new-service']);
    this.menuCtrl.close('first');
  }

}
