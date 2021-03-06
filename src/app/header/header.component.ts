import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : any = {};
  constructor(public localStorageService : LocalStorageService, public route : Router) { }

  ngOnInit() {
    this.user = this.localStorageService.getLoginInfo();
  }

   public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  logout(){
    this.localStorageService.clear();
    this.route.navigate(['/login']);
  }
}
