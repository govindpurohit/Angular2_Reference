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
