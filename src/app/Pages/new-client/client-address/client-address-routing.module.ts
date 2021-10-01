import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientAddressPage } from './client-address.page';

const routes: Routes = [
  {
    path: '',
    component: ClientAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientAddressPageRoutingModule {}
