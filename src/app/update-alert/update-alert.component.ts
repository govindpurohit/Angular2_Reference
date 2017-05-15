import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-update-alert',
  templateUrl: './update-alert.component.html',
  styleUrls: ['./update-alert.component.scss']
})
export class UpdateAlertComponent implements OnInit {

  model : any = {};
  error = false;
  errorMsg = '';
  alert : any = {};

  constructor(public route : Router,public alertService : AlertService) { 
    this.alertService.singleAlert$.subscribe(
      alert => {
        this.alert = alert;
        console.log("update alert:"+alert);
        this.model = {
          optionalKeywords:this.alert.optionalKeywords,
          requiredKeywords:this.alert.requiredKeywords,
          excludedKeywords:this.alert.excludedKeywords
        }
      }
    )
  }

  ngOnInit() {
  }

  update(){
    if(this.model.optionalKeywords.length == 0 && this.model.requiredKeywords==0){
      this.error = true;
      this.errorMsg = "Please enter one keyword min."
    }
    else{
        this.alertService.saveAlert(this.model).subscribe((data) => {
          this.route.navigate(['/feeds']);
        });
    }
  }

  closeAlert(){
    this.error = false;
  }

}
