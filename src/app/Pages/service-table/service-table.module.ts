import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceTablePageRoutingModule } from './service-table-routing.module';

import { ServiceTablePage } from './service-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ServiceTablePageRoutingModule,

  ],
  declarations: [ServiceTablePage]
})
export class ServiceTablePageModule {}
