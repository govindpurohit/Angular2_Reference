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
  // {
  //   path: 'feeds',
  //   component: FeedsComponent,
  //   data:{
  //     title: 'Feeds'
  //   },
  //   canActivate: [AppCanActivateService],
  //   children:[
  //     {
  //       path: '',
  //       loadChildren: './feeds/'
  //     }

  //   ]
  // },
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
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
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
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
