import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceTablePage } from './service-table.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceTablePageRoutingModule {}
