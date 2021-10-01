import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderHomeComponent } from './header-home/header-home.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [HeaderHomeComponent, MenuComponent],
    exports: [ HeaderHomeComponent,MenuComponent ],
    imports: [
      CommonModule,
      IonicModule
    ]
  })
  // eslint-disable-next-line eol-last
  export class ComponentsModule { }