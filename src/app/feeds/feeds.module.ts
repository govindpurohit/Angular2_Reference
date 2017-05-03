import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedsComponent } from './feeds.component';
import { FeedsRoutingModule } from './feeds-routing.module';
import { TabsModule } from 'ng2-bootstrap/tabs';

import{SideBarComponent} from '../side-bar/side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FeedsRoutingModule,
    TabsModule.forRoot()
  ],
  declarations: [FeedsComponent]
})
export class FeedsModule { }
