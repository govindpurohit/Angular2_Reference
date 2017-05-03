import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FeedsComponent } from './feeds.component';

const routes: Routes = [
  {
    path: '',
    component: FeedsComponent,
    data: {
      title: 'Feeds'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class FeedsRoutingModule { }
