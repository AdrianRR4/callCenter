import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComercialDataPage } from './comercial-data.page';

const routes: Routes = [
  {
    path: '',
    component: ComercialDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComercialDataPageRoutingModule {}
