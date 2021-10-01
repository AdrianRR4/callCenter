import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchClientPage } from './search-client.page';



const routes: Routes = [
  {
    path: '',
    component: SearchClientPage,
    children:[
      {
        path: 'service',
        loadChildren: () =>
          import('../service-table/service-table.module').then((m) => {
            return m.ServiceTablePageModule;
      }),
    },
      {
        path: 'address',
        loadChildren: ()=> import('../address/address.module').then((m)=>{
          return m.AddressPageModule;
        })
      },
      {
        path:'billing',
        loadChildren:()=>import('../billing/billing.module').then((m)=>{
          return m.BillingPageModule;
        })
      },
      {
        path:'chart',
        loadChildren:()=>import('../comercial-data/comercial-data.module').then((m)=>{
          return m.ComercialDataPageModule;
        })
      },
      {
        path:'',
        redirectTo:'/search-client/service'
      }
    ],
  }
]

 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchClientPageRoutingModule {


}
