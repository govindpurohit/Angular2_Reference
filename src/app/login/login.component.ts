import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignInService } from '../services/sign-in.service';
import { LocalStorageService } from './../services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  error : any;
  errorMsg: String = '';

  constructor(private signinService : SignInService, private router : Router, private appLocalStorage : LocalStorageService) { 
    let userDetails = appLocalStorage.getLoginInfo();
    if(userDetails){
      //user is logged in
      // this.router.navigate(['/feeds']);
      this.appLocalStorage.clear();
    }
  }

  ngOnInit() {
  }

  login(){
    console.log("My email:"+this.model.email);
    if(this.model.email === undefined || this.model.email == ""){
      this.error = true;
      this.errorMsg = "Please enter EmailId."
    }
    else if(this.model.password === undefined || this.model.password == ""){
      this.error = true;
      this.errorMsg = "Please enter Password."

    }
    else{
      this.signinService.postSigninInfo(this.model).subscribe(result => {
            if(!result.success){
              this.error = !result.success;
              this.errorMsg = result.message
            }
            else{
              // login was successful
              this.appLocalStorage.setLoginInfo(result);
              this.appLocalStorage.setUserDetails(result);
              this.router.navigate(['/feeds']);
            }
         },
         error => {
             console.log(error);
             this.error = error;
         });
    }
  }

  closeError(){
    this.error= false;
  }

}
