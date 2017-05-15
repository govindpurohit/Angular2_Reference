import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { SideBarComponent } from '../side-bar/side-bar.component';

//services
import { FeedService } from '../services/feed/feed.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public isAlerts: boolean = false;

  constructor(public router : Router, public alertService :AlertService, public renderer : Renderer){ } //

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    if(this.router.url === '/feeds'){
      this.isAlerts = true;
      this.alertService.getAlerts().subscribe(result => {
        // console.log(JSON.stringify(result));
        if(result && result.data && result.data.length > 0){
          this.alertService.setAlerts(result.data);
          this.alertService.setSingleAlert(result.data[0]);
        }
        else if(result && result.data && result.data.length == 0){
          this.router.navigate(['/noalert']);
        }
        else{
          this.router.navigate(['/login']);
        }
      },
      err => {
        console.log("Error:"+err);
      });
    }
    else{
      this.isAlerts = false;
    }
  }

  ngAfterViewInit(){
    if(this.router.url === '/feeds'){
      // this.renderer.setElementClass(document.getElementsByTagName('body'),"sidebar-hidden")
    }
    else{
      this.renderer.setElementClass(document.getElementsByClassName('app')[0],"sidebar-hidden",true);
    }
  }

}
