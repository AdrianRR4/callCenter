import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'search-client',
    loadChildren: () => import('./pages/search-client/search-client.module').then( m => m.SearchClientPageModule)
  },

  {
    path: 'client-address',
    loadChildren: () => import('./pages/new-client/client-address/client-address.module').then( m => m.ClientAddressPageModule)
  },
  {
    path: 'client-data',
    loadChildren: () => import('./pages/new-client/client-data/client-data.module').then( m => m.ClientDataPageModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./pages/new-client/invoice/invoice.module').then( m => m.InvoicePageModule)
  },
  {
    path: 'register-customer',
    loadChildren: () => import('./pages/register-customer/register-customer.module').then( m => m.RegisterCustomerPageModule)
  },
  {
    path: 'new-service',
    loadChildren: () => import('./pages/new-service/new-service.module').then( m => m.NewServicePageModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('./pages/charts/charts.module').then( m => m.ChartsPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./pages/address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'service-table',
    loadChildren: () => import('./pages/service-table/service-table.module').then( m => m.ServiceTablePageModule)
  },
  {
    path: 'billing',
    loadChildren: () => import('./pages/billing/billing.module').then( m => m.BillingPageModule)
  },
  {
    path: 'comercial-data',
    loadChildren: () => import('./pages/comercial-data/comercial-data.module').then( m => m.ComercialDataPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
