import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';

import { AlertController, IonicModule, IonicRouteStrategy, MenuController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './service/login.service';
import { ComponentsModule } from './components/components.model';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule, ComponentsModule] ,
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private loginService: LoginService,
    private router: Router) {

}

async closeAlert() {
  console.log('hola');
  this.menuCtrl.close('first');
  const closeAlert = await this.alertCtrl.create({
    header: 'Confirmación',
    message: '¿Seguro que quiere salir de la aplicación?',
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
          this.router.navigate(['/login']);

        }
      }
    ]
  });

  await closeAlert.present();
  console.log('se cierra');
}

}
