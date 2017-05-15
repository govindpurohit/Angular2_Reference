import { Component, OnInit, Renderer} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public alerts : any = [];
  public nindex = 0;

  constructor(public alertService : AlertService, public render : Renderer, public router: Router) {
    this.alertService.alertSource$.subscribe(
      alerts => {
        this.alerts = alerts;
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
    console.log("alert:"+alert);
    this.alertService.setSingleAlert(alert);
    this.router.navigate(['/editalert'])
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
