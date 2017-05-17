import { Component, OnInit, Renderer, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../services/alert/alert.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public alerts : any = [];
  public nindex = 0;

  constructor(public alertService : AlertService, public render : Renderer, public router: Router, public localStorage : LocalStorageService) {
    
    this.alertService.alertSource$.subscribe(
      alerts => {
        this.alerts = alerts;
        var storedAlert = this.localStorage.getNextAlert();
        if(storedAlert === undefined || storedAlert == null){

        }
        else{
          let index = 0;
          var indexObj = this.alerts.find(function(item, i){
            if(item._id === storedAlert._id){
              index = i;
              return i;
            }
          });
          this.nindex = index;
        }
      }
    )
   }

  ngOnInit() {
  }

  getAlert(alert,index){
    this.nindex = index;
    this.alertService.setSingleAlert(alert);
  }

  editAlert(alert,i){
    this.localStorage.setEditAlert(alert);
    this.router.navigate(['/editalert']);
    
  }
  deleteAlert(alert,index){
    if(confirm("Are you sure? Do you want to delete this alert?")){
      this.alerts.splice(index,1);
      this.alertService.deleteAlertById(alert._id).subscribe((res) => {
        if(res && res.error){
          alert("Can't deleted.");
        }
        else{
          if(this.alerts.length == 0){
            this.router.navigate(['/noalert']);
          }
          else if(index === this.alerts.length){ // here this.alerts.length taken beacuse alert allready removed.
            this.alertService.setSingleAlert(this.alerts[0]);
            this.nindex = 0;
          }
          else {
            this.alertService.setSingleAlert(this.alerts[index]);
            this.nindex = index;
          }
        }
      });
    }
  }

}
