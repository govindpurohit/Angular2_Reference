import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from './../local-storage/local-storage.service';

@Injectable()
export class AppCanActivateService implements CanActivate {

  constructor(protected router: Router, public appLocalStorage: LocalStorageService) { }

  canActivate() {
    let userDetails = this.appLocalStorage.getLoginInfo();
    if(!!userDetails === false){
      this.router.navigate(['/login']);
    }
    return !!userDetails;
  }
}
