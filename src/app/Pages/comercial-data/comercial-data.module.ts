import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComercialDataPageRoutingModule } from './comercial-data-routing.module';

import { ComercialDataPage } from './comercial-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComercialDataPageRoutingModule
  ],
  declarations: [ComercialDataPage]
})
export class ComercialDataPageModule {}
