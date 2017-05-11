import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { FeedsComponent } from './feeds/feeds.component';

//services
import { AppCanActivateService } from './services/app-can-activate/app-can-activate.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'feeds',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Feed'
    },
    canActivate: [AppCanActivateService],
    children: [
      {
        path: 'feeds',
        loadChildren: './feeds/feeds.module#FeedsModule'
      }
    ]
  },
  {
    path: 'alert',
    component: AlertComponent,
    canActivate: [AppCanActivateService],
    data:{
      title: 'alert'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
