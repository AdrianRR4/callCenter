import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientAddressPageRoutingModule } from './client-address-routing.module';

import { ClientAddressPage } from './client-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientAddressPageRoutingModule
  ],
  declarations: [ClientAddressPage]
})
export class ClientAddressPageModule {}
