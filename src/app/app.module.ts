import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';

//services 
import { SignUpService } from './services/sign-up.service';
import { SignInService } from './services/sign-in.service'; 
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { AppHttpService } from './services/app-http/app-http.service';
import { AppCanActivateService } from './services/app-can-activate/app-can-activate.service';
import { FeedService } from './services/feed/feed.service';

import {RlTagInputModule} from 'angular2-tag-input';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
// import { FeedsComponent } from './feeds/feeds.component';
// import {} from './feeds/feeds.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,RlTagInputModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HeaderComponent,
    SideBarComponent,
    // FeedsComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  },
  SignUpService,
  SignInService,
  LocalStorageService,
  AppHttpService,
  AppCanActivateService,
  FeedService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
