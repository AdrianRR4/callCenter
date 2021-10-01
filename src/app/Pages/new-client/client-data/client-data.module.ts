import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDataPageRoutingModule } from './client-data-routing.module';

import { ClientDataPage } from './client-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientDataPageRoutingModule
  ],
  declarations: [ClientDataPage]
})
export class ClientDataPageModule {}
