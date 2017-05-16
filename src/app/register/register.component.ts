import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  error : any;
  errorMsg: String = '';

  constructor(private signupService :SignUpService,private router : Router) { }

  ngOnInit() {
  }

  register(){
    if(this.model.firstName === undefined || this.model.firstName == ""){
      this.error = true;
      this.errorMsg = "Firstname is required.";
    }
    else if(this.model.lastName === undefined || this.model.lastName == ""){
      this.error = true;
      this.errorMsg = "Lastname is required.";
    }
    else if(this.model.email === undefined || this.model.email == ""){
      this.error = true;
      this.errorMsg = "Email is required.";
    }
    else if(this.model.password === undefined || this.model.password == ""){
      this.error = true;
      this.errorMsg = "Password is required.";
    }
    else{
      this.signupService.postSignupInfo(this.model).subscribe(result => {
            if(!result.success){
              this.error = !result.success;
              this.errorMsg = result.message
            }
            else{
              this.router.navigate(['/login']);
            }
         },
         error => {
             console.log(error);
             this.error = error;
         });
    }
  }

  closeError(){
    this.error = false;
  }

}
