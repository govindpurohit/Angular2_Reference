import { Injectable } from '@angular/core';
import { LocalStorageEnums } from './localStorageEnums'

@Injectable()
export class LocalStorageService {

  constructor() { }

  clear(){
    localStorage.clear();
  }

  getUserDetails(){
    return JSON.parse(localStorage.getItem(LocalStorageEnums.userInfo));
  }

  setUserDetails(userInfo){
    return localStorage.setItem(LocalStorageEnums.userInfo, JSON.stringify(userInfo));
  }

  setLoginInfo(loginInfo){
    return localStorage.setItem(LocalStorageEnums.loginInfo, JSON.stringify(loginInfo));
  }

  getLoginInfo(){
    return JSON.parse(localStorage.getItem(LocalStorageEnums.loginInfo));
  }

  getSessionId(){
    let userDetails = this.getUserDetails();
    if(userDetails && userDetails.user && userDetails.user.secret_token){
      return 'Bearer ' + userDetails.user.secret_token;
    }
  }

}
