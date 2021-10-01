import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCustomerPageRoutingModule } from './register-customer-routing.module';

import { RegisterCustomerPage } from './register-customer.page';
import { ComponentsModule } from 'src/app/components/components.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCustomerPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegisterCustomerPage]
})
export class RegisterCustomerPageModule {}
