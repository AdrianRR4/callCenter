import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthenticationResponse } from 'src/app/model/authentication.response.model';
import { UserLoginRequest } from 'src/app/model/user.login.request.model';
import { ClientService } from 'src/app/service/client.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  tokenReceived: string;
  user: UserLoginRequest;
  authenticationResponse: AuthenticationResponse;
  info: UserLoginRequest = new UserLoginRequest();

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public togle: boolean = false;
  showPassword=false;
  passwordTogleIcon='eye-outline';

  constructor(private router: Router, 
    private loginService: LoginService,
    private alertCtrl:AlertController,
    private menu:MenuController,
    private clientService:ClientService) { }

  ngOnInit() {
    this.menu.enable(false);
    this.authenticate();
  }

  authenticate() {
    this.loginService.authenticate().subscribe((response) => {
      console.log('usuario', response);
      if (
        response != undefined &&
        response.token != null &&
        response.token.startsWith('Bearer')
      ) {
        this.authenticationResponse = response;
        this.loginService.setData(this.authenticationResponse);
      }
    });
  }
   /*
   Funcion para hacer visible u ocultar la contraseña
   */
   toglePassword():void{
    console.log('hola');
    this.showPassword=!this.showPassword;

    if(this.passwordTogleIcon === 'eye-outline') {
      this.passwordTogleIcon ='eye-off-outline';
    }else{
  this.passwordTogleIcon= 'eye-outline';
    }

  }

  setToken() {
    this.loginService.setTokenByUser(this.authenticationResponse.token);
  }
   /*
   Método para la obtención del usuario y contraseña
   */
  getUserInformationForm(form:NgForm) {

    if(form.invalid )
    {
   
      this.errorAlert();
      return;
      }
//Obteniendo el token
    this.loginService.getTokenByUser().subscribe((response) => {
      this.tokenReceived = response;
    });
//Llamando al servicio login
    this.loginService
      .getUserInformation(this.info, this.tokenReceived)
      .subscribe((response) => {
        if (response.isSuccessful) {
          console.log('exitoso');
          this.router.navigate(['/search-client']);
          //this.sucessfullAlert();
        } else {
          console.log('error');
          this.errorAlert();
        }

        console.log('usuario', response);
        this.loginService.setUser(response.data);
      });
    console.log(this.info);
   
  }

   /*
   Modal mensaje de contraseña correcta 
   */
  async sucessfullAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'subtitulo',
      header: 'Contraseña correcta',
      subHeader: 'Bienvendido',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

   /*
   Modal contraseña incorrecta 
   */
  async errorAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'subtitulo',
      header: 'Contraseña incorrecta',
      subHeader: 'Error',
      message: 'Ingrese una contraseña valida',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
