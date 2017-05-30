import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { SideBarComponent } from '../side-bar/side-bar.component';

//services
import { FeedService } from '../services/feed/feed.service';
import { AlertService } from '../services/alert/alert.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { DownloadService } from '../services/download/download.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public isAlerts: boolean = false;
  public currentAlert: any = {};

  constructor(public router : Router, public alertService :AlertService, public renderer : Renderer, public localStorage : LocalStorageService, public downloadService : DownloadService){ } //

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
        if(result && result.data && result.data.length > 0){
          this.alertService.setAlerts(result.data);
          let storedAlert = this.localStorage.getNextAlert();
          if(storedAlert === undefined || storedAlert == null){
            this.currentAlert = result.data[0];
            this.alertService.setSingleAlert(result.data[0]);
          }
          else{
            this.currentAlert = storedAlert;
            this.alertService.setSingleAlert(storedAlert);
          }
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

  startDownload(){
    this.downloadService.downloadFile(this.currentAlert._id).subscribe(data => this.downloadFile(data),
                  error => console.log("Error downloading the file."),
                  () => console.log('Completed file download.'))
  }

  downloadFile(data: Response){
    var blob = new Blob([data], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }

}
