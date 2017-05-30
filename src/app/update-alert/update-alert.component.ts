import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../services/alert/alert.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

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

  constructor(public route : Router,public alertService : AlertService, public router : Router, public localStorage : LocalStorageService) { 
    var storedAlert = this.localStorage.getEditAlert();
    if(storedAlert === undefined || storedAlert == null){
      alert("You can't directly access this page without selecting any Alert.");
      this.router.navigate(['/feeds']);
    }
    else{
      this.alert = storedAlert;
      this.model = {
        name:this.alert.name,
        optionalKeywords:this.alert.optionalKeywords,
        requiredKeywords:this.alert.requiredKeywords,
        excludedKeywords:this.alert.excludedKeywords
      }
    }
  }

  ngOnInit() {
  }

  update(){
    if(this.model.name === undefined || this.model.name == ""){
      this.error = true;
      this.errorMsg = "Name is required.";
    }
    else if(this.model.optionalKeywords.length == 0 && this.model.requiredKeywords==0){
      this.error = true;
      this.errorMsg = "Please enter one keyword min."
    }
    else{
        this.alertService.updateAlert(this.alert._id,this.model).subscribe((data) => {
          if(!data.success || data.error){
            this.error = true;
            this.errorMsg = data.message;
          }
          else{
            this.localStorage.setNextAlert(data.data);
            this.route.navigate(['/feeds']);
          }
        });
    }
  }

  closeAlert(){
    this.error = false;
  }

  deleteAlert(){
    if(confirm("Are you sure? Do you want to delete this alert?")){
      this.alertService.deleteAlertById(this.alert._id).subscribe((res) => {
        if(res && res.error){
          alert("Can't deleted.");
        }
        else{
            this.localStorage.deleteEditAlert();
            this.localStorage.deleteNextAlert();
            this.router.navigate(['/feeds']);
        }
      });
    }
  }

  goToHome(){
    this.router.navigate(['/']);
  }

}
