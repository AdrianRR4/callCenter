import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDataPage } from './client-data.page';

const routes: Routes = [
  {
    path: '',
    component: ClientDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDataPageRoutingModule {}
