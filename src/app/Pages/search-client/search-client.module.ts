import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchClientPageRoutingModule } from './search-client-routing.module';

import { SearchClientPage } from './search-client.page';
import { ComponentsModule } from 'src/app/components/components.model';

import { ChartsPageRoutingModule } from '../charts/charts-routing.module';
import { ChartsPageModule } from '../charts/charts.module';
import { ChartsPage } from '../charts/charts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchClientPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchClientPage,ChartsPage]
})
export class SearchClientPageModule {}
