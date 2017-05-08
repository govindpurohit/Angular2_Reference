import { Component, OnInit , ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FeedService } from '../services/feed/feed.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],

})
export class AlertComponent implements OnInit {

  model : any = {};
  error = false;
  errorMsg = '';
  constructor(public alertService : AlertService, public route : Router) {
   }

  ngOnInit() {
    this.model = {
      optionalKeywords:[],
      requiredKeywords:[],
      excludedKeywords:[]
    }
  }

  save(){
    if(this.model.optionalKeywords.length == 0 || this.model.requiredKeywords==0){
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
