import { Component, OnInit , ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],

})
export class AlertComponent implements OnInit {

  model : any = {};
  error = false;
  errorMsg = '';
  constructor() {
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
        console.log("got keywords:"+this.model.optionalKeywords);
        console.log("got keywords:"+this.model.requiredKeywords);
        console.log("got keywords:"+this.model.excludedKeywords);
    }
  }

  closeAlert(){
    this.error = false;
  }

}
